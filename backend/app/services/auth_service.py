from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    generate_token,
)


class AuthService:

    @staticmethod
    def register(db: Session, user: UserCreate):

        email_exists = (
            db.query(User)
            .filter(User.email == user.email)
            .first()
        )

        if email_exists:
            raise HTTPException(
                status_code=400,
                detail="Email already exists",
            )

        username_exists = (
            db.query(User)
            .filter(User.username == user.username)
            .first()
        )

        if username_exists:
            raise HTTPException(
                status_code=400,
                detail="Username already exists",
            )

        verification_token = generate_token()

        new_user = User(
            email=user.email,
            username=user.username,
            full_name=user.full_name,
            hashed_password=hash_password(user.password),
            avatar=None,
            language="en",
            timezone="UTC",
            theme="system",
            provider="email",
            is_active=True,
            is_verified=False,
            is_admin=False,
            is_pro=False,
            verification_token=verification_token,
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

        if db_user is None:
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

        access_token = create_access_token(
            {
                "sub": str(db_user.id),
                "email": db_user.email,
            }
        )

        refresh_token = create_refresh_token(
            {
                "sub": str(db_user.id),
            }
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": db_user,
        }

    @staticmethod
    def verify_email(
        db: Session,
        token: str,
    ):

        user = (
            db.query(User)
            .filter(User.verification_token == token)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="Invalid verification token",
            )

        user.is_verified = True
        user.verification_token = None

        db.commit()

        return {
            "message": "Email verified successfully"
        }

    @staticmethod
    def forgot_password(
        db: Session,
        email: str,
    ):

        user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )

        if user is None:
            return {
                "message": "If the account exists, a reset email has been sent."
            }

        token = generate_token()

        user.reset_password_token = token

        db.commit()

        return {
            "message": "Password reset token generated.",
            "token": token,
        }

    @staticmethod
    def reset_password(
        db: Session,
        token: str,
        password: str,
    ):

        user = (
            db.query(User)
            .filter(User.reset_password_token == token)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="Invalid reset token",
            )

        user.hashed_password = hash_password(password)
        user.reset_password_token = None

        db.commit()

        return {
            "message": "Password changed successfully"
        }

    @staticmethod
    def get_user(
        db: Session,
        user_id: int,
    ):

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        return user

    @staticmethod
    def update_profile(
        db: Session,
        user_id: int,
        full_name: str | None = None,
        language: str | None = None,
        timezone: str | None = None,
        theme: str | None = None,
    ):

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        if full_name is not None:
            user.full_name = full_name

        if language is not None:
            user.language = language

        if timezone is not None:
            user.timezone = timezone

        if theme is not None:
            user.theme = theme

        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def change_password(
        db: Session,
        user_id: int,
        old_password: str,
        new_password: str,
    ):

        user = (
            db.query(User)
            .filter(User.id == user_id)
            .first()
        )

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found",
            )

        if not verify_password(
            old_password,
            user.hashed_password,
        ):
            raise HTTPException(
                status_code=400,
                detail="Old password is incorrect",
            )

        user.hashed_password = hash_password(new_password)

        db.commit()

        return {
            "message": "Password updated successfully"
        }