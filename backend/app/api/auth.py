from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.auth import (
    LoginRequest,
    Token,
    RefreshTokenRequest,
)
from app.schemas.user import (
    UserCreate,
    UserResponse,
)
from app.services.auth_service import AuthService
from app.auth.jwt import (
    create_access_token,
    create_refresh_token,
    verify_refresh_token,
)
from app.core.config import settings

router = APIRouter()


# ==========================================================
# Register
# ==========================================================

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return AuthService.register(db, user)


# ==========================================================
# Login
# ==========================================================
@router.post(
    "/login",
    response_model=Token,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):

    result = AuthService.login(
        db=db,
        user=credentials,
    )

    return Token(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
    )

# ==========================================================
# Refresh Token
# ==========================================================

@router.post(
    "/refresh",
    response_model=Token,
)
def refresh_token(
    request: RefreshTokenRequest,
    db: Session = Depends(get_db),
):

    payload = verify_refresh_token(request.refresh_token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token.",
        )

    user_id = payload.get("sub")

    user = db.query(User).filter(User.id == int(user_id)).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        ),
    )

    refresh_token = create_refresh_token(
        data={"sub": str(user.id)},
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
    )


# ==========================================================
# Current User
# ==========================================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


# ==========================================================
# Logout
# ==========================================================

@router.post("/logout")
def logout():

    return {
        "success": True,
        "message": "Logged out successfully.",
    }