from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from jose import jwt, JWTError

from app.core.config import settings


class JWTHandler:
    """
    JWT authentication handler.
    """

    def create_access_token(
        self,
        data: dict[str, Any],
        expires_minutes: int | None = None,
    ) -> str:
        to_encode = data.copy()

        expire = datetime.now(timezone.utc) + timedelta(
            minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

        to_encode.update({"exp": expire})

        return jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

    def create_refresh_token(
        self,
        data: dict[str, Any],
    ) -> str:
        expire = datetime.now(timezone.utc) + timedelta(days=7)

        to_encode = data.copy()
        to_encode.update({"exp": expire, "type": "refresh"})

        return jwt.encode(
            to_encode,
            settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )

    def decode_token(self, token: str) -> dict[str, Any] | None:
        try:
            return jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.ALGORITHM],
            )
        except JWTError:
            return None

    def verify_token(self, token: str) -> bool:
        return self.decode_token(token) is not None

    def get_user_id(self, token: str) -> int | None:
        payload = self.decode_token(token)
        if not payload:
            return None
        return payload.get("user_id")


    
# ==========================================================
# Compatibility Helpers
# ==========================================================

_jwt_handler = JWTHandler()


def create_access_token(
    data: dict,
    expires_delta=None,
):
    minutes = None

    if expires_delta is not None:
        minutes = int(expires_delta.total_seconds() / 60)

    return _jwt_handler.create_access_token(
        data=data,
        expires_minutes=minutes,
    )


def create_refresh_token(
    data: dict,
):
    return _jwt_handler.create_refresh_token(data)


def verify_refresh_token(
    token: str,
):
    payload = _jwt_handler.decode_token(token)

    if payload is None:
        return None

    if payload.get("type") != "refresh":
        return None

    return payload


def decode_token(
    token: str,
):
    return _jwt_handler.decode_token(token)


def verify_token(
    token: str,
):
    return _jwt_handler.verify_token(token)

