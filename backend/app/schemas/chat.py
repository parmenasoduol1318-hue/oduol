from datetime import datetime

from pydantic import BaseModel, Field


# =========================================================
# Base
# =========================================================

class ChatBase(BaseModel):
    title: str | None = Field(default=None, max_length=255)


# =========================================================
# Create
# =========================================================

class ChatCreate(ChatBase):
    pass


# =========================================================
# Update
# =========================================================

class ChatUpdate(BaseModel):
    title: str | None = Field(default=None, max_length=255)


# =========================================================
# Response
# =========================================================

class ChatResponse(ChatBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True