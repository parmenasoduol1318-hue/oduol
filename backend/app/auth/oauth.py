from __future__ import annotations

from typing import Any

from fastapi import HTTPException, status


class OAuthService:
    """
    OAuth placeholder service.

    This is a scaffold for future:
    - Google OAuth
    - GitHub OAuth
    - Apple OAuth
    """

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
        # Placeholder logic (replace with real Google verification)
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Google token",
            )

        return {
            "provider": "google",
            "user_id": "google_user",
            "email": "user@google.com",
        }

    async def _github_login(self, token: str) -> dict[str, Any]:
        # Placeholder logic (replace with real GitHub verification)
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid GitHub token",
            )

        return {
            "provider": "github",
            "user_id": "github_user",
            "email": "user@github.com",
        }