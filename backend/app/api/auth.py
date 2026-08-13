from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.auth.oauth import OAuthService
from app.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.auth import (
    LoginRequest,
    Token,
)

from app.schemas.user import (
    UserCreate,
    UserResponse,
)

from app.services.auth_service import AuthService

router = APIRouter()


class OAuthLoginRequest(BaseModel):
    provider: str
    token: str


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return AuthService.register(db, user)


@router.post(
    "/login",
    response_model=Token,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    result = AuthService.login(db, credentials)

    return Token(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=result["user"],
    )


@router.post(
    "/social-login",
    response_model=Token,
)
async def social_login(
    payload: OAuthLoginRequest,
    db: Session = Depends(get_db),
):
    if payload.provider.lower() not in {"google", "github"}:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported auth provider.",
        )

    provider_data = await OAuthService().login(payload.provider.lower(), payload.token)
    result = AuthService.login_with_oauth(
        db=db,
        email=provider_data["email"],
        full_name=provider_data.get("full_name"),
        provider=payload.provider.lower(),
    )

    return Token(
        access_token=result["access_token"],
        refresh_token=result["refresh_token"],
        token_type=result["token_type"],
        user=result["user"],
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
def me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.post("/logout")
def logout():
    return {"success": True}
