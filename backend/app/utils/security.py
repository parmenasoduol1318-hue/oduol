from __future__ import annotations

import hashlib
import secrets
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Security:
    """
    Security utilities for hashing, tokens, and encryption helpers.
    """

    # =========================================================
    # Password Hashing
    # =========================================================

    def hash_password(self, password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    # =========================================================
    # API Tokens
    # =========================================================

    def generate_token(self, length: int = 32) -> str:
        return secrets.token_urlsafe(length)

    # =========================================================
    # Simple Hashing
    # =========================================================

    def sha256(self, data: str) -> str:
        return hashlib.sha256(data.encode()).hexdigest()

    # =========================================================
    # API Key Validation
    # =========================================================

    def validate_api_key(self, api_key: str) -> bool:
        """
        Basic API key validation against configured key.
        """
        if not settings.API_KEY:
            return False
        return secrets.compare_digest(api_key, settings.API_KEY)