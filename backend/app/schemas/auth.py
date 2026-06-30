
from pydantic import BaseModel, EmailStr


# =========================================================
# Login Request
# =========================================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# =========================================================
# Token Response
# =========================================================

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


# =========================================================
# Refresh Token Request
# =========================================================

class RefreshTokenRequest(BaseModel):
    refresh_token: str


# =========================================================
# Decoded Token Payload
# =========================================================

class TokenPayload(BaseModel):
    user_id: int | None = None
    email: str | None = None
    role: str | None = None
    exp: int | None = None

