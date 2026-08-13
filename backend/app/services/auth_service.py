import secrets

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
)


class AuthService:

    @staticmethod
    def _create_tokens(db_user: User):
        return {
            "access_token": create_access_token(
                {
                    "sub": str(db_user.id),
                    "email": db_user.email,
                }
            ),
            "refresh_token": create_refresh_token(
                {
                    "sub": str(db_user.id),
                }
            ),
            "token_type": "bearer",
            "user": db_user,
        }

    @staticmethod
    def register(db: Session, user: UserCreate):
        if not user.password:
            raise HTTPException(
                status_code=400,
                detail="Password is required for email registration.",
            )

        existing = db.query(User).filter(User.email == user.email).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Email already exists",
            )

        if db.query(User).filter(User.username == user.username).first():
            raise HTTPException(
                status_code=400,
                detail="Username already exists",
            )

        new_user = User(
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            hashed_password=hash_password(user.password),
            auth_provider="email",
            is_active=True,
            is_verified=False,
            is_admin=False,
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return new_user

    @staticmethod
    def login(db: Session, user: UserLogin):
        db_user = db.query(User).filter(User.email == user.email).first()

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        if db_user.auth_provider != "email":
            raise HTTPException(
                status_code=401,
                detail="This account uses social login. Please sign in with Google.",
            )

        if not db_user.hashed_password or not verify_password(
            user.password,
            db_user.hashed_password,
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        return AuthService._create_tokens(db_user)

    @staticmethod
    def login_with_oauth(db: Session, email: str, full_name: str | None, provider: str):
        normalized_email = email.strip().lower()
        db_user = db.query(User).filter(User.email == normalized_email).first()

        if db_user is None:
            base_username = (full_name or normalized_email.split("@")[0]).replace(" ", "").lower()
            username = base_username
            counter = 1
            while db.query(User).filter(User.username == username).first():
                username = f"{base_username}{counter}"
                counter += 1

            db_user = User(
                email=normalized_email,
                username=username,
                full_name=full_name or username,
                auth_provider=provider,
                hashed_password=hash_password(secrets.token_urlsafe(24)),
                is_active=True,
                is_verified=True,
                is_admin=False,
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        if db_user.auth_provider not in {"email", provider}:
            db_user.auth_provider = provider
            db.commit()

        return AuthService._create_tokens(db_user)

    @staticmethod
    def refresh_token(db: Session, user_id: int):
        user = db.query(User).filter(User.id == user_id).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found.")
        return AuthService._create_tokens(user)