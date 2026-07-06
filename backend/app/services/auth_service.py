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
    def register(db: Session, user: UserCreate):

        if db.query(User).filter(User.email == user.email).first():
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

        db_user = (
            db.query(User)
            .filter(User.email == user.email)
            .first()
        )

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

        if not verify_password(
            user.password,
            db_user.hashed_password,
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password",
            )

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