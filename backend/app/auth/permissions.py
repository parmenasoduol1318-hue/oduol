
from __future__ import annotations

from typing import Callable

from fastapi import Depends, HTTPException, status

from app.auth.jwt import JWTHandler

jwt_handler = JWTHandler()


def get_current_user(token: str = Depends(lambda: None)) -> dict:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    payload = jwt_handler.decode_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )

    return payload


def require_role(role: str) -> Callable:
    def wrapper(user=Depends(get_current_user)):
        if getattr(user, "role", None) != role and user.get("role") != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Forbidden",
            )
        return user

    return wrapper


def require_active_user(user):
    """
    Ensure the user account is active.
    Works with both SQLAlchemy models and dictionaries.
    """
    is_active = (
        getattr(user, "is_active", None)
        if not isinstance(user, dict)
        else user.get("is_active", True)
    )

    if not is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Inactive account",
        )

    return user


def require_admin(user):
    """
    Ensure the user has the admin role.
    """
    role = (
        getattr(user, "role", None)
        if not isinstance(user, dict)
        else user.get("role")
    )

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Administrator access required",
        )

    return user


def admin_required():
    return require_role("admin")
