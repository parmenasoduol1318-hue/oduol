from pydantic import BaseModel, EmailStr
from app.schemas.user import UserResponse


# =========================================================
# Login Request
# =========================================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# =========================================================
# Register Request
# =========================================================

class RegisterRequest(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    password: str


# =========================================================
# Login Response
# =========================================================

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


# =========================================================
# Refresh Token
# =========================================================

class RefreshTokenRequest(BaseModel):
    refresh_token: str


# =========================================================
# Token Payload
# =========================================================

class TokenPayload(BaseModel):
    sub: str | None = None
    email: str | None = None
    exp: int | None = None