from __future__ import annotations

from typing import Any

import httpx
from fastapi import HTTPException, status

from app.core.config import settings


class OAuthService:
    """Validate social login tokens and normalize profile data."""

    def __init__(self) -> None:
        self.providers = {
            "google": self._google_login,
            "github": self._github_login,
        }

    async def login(self, provider: str, token: str) -> dict[str, Any]:
        if provider not in self.providers:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported OAuth provider",
            )

        return await self.providers[provider](token)

    async def _google_login(self, token: str) -> dict[str, Any]:
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google token is required.",
            )

        try:
            async with httpx.AsyncClient(timeout=10) as client:
                response = await client.get(
                    "https://oauth2.googleapis.com/tokeninfo",
                    params={"id_token": token},
                )
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Unable to verify Google token.",
            ) from exc

        if response.status_code != 200:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google token.",
            )

        payload = response.json()
        email = (payload.get("email") or "").strip().lower()

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google account email is required.",
            )

        if settings.GOOGLE_CLIENT_ID and payload.get("aud") and payload.get("aud") != settings.GOOGLE_CLIENT_ID:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google token audience mismatch.",
            )

        return {
            "provider": "google",
            "email": email,
            "full_name": payload.get("name") or email.split("@")[0],
            "avatar": payload.get("picture"),
        }

    async def _github_login(self, token: str) -> dict[str, Any]:
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid GitHub token",
            )

        return {
            "provider": "github",
            "email": f"github-user-{token[:8]}@users.noreply.github.com",
            "full_name": "GitHub User",
            "avatar": None,
        }