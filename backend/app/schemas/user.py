from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# =========================================================
# User Base
# =========================================================

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=50)
    full_name: str | None = None


# =========================================================
# Create User
# =========================================================

class UserCreate(UserBase):
    password: str = Field(min_length=6)


# =========================================================
# Login User
# =========================================================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# =========================================================
# Update User
# =========================================================

class UserUpdate(BaseModel):
    email: EmailStr | None = None
    username: str | None = Field(default=None, min_length=3, max_length=50)
    full_name: str | None = None
    password: str | None = Field(default=None, min_length=6)


# =========================================================
# User Response
# =========================================================

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    is_admin: bool
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)