from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.message import MessageResponse


# ==========================================================
# Base
# ==========================================================

class ChatBase(BaseModel):
    title: str | None = Field(
        default=None,
        max_length=255,
    )


# ==========================================================
# Create
# ==========================================================

class ChatCreate(ChatBase):
    pass


# ==========================================================
# Update
# ==========================================================

class ChatUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        max_length=255,
    )


# ==========================================================
# Response
# ==========================================================

class ChatResponse(ChatBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    last_message: str | None = None
    messages: list[MessageResponse] = []

    model_config = ConfigDict(
        from_attributes=True,
    )