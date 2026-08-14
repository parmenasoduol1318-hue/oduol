from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


# =========================================================
# Base
# =========================================================

class MessageBase(BaseModel):
    content: str = Field(..., min_length=1)


# =========================================================
# Create
# =========================================================

class MessageCreate(MessageBase):
    chat_id: int


# =========================================================
# Update
# =========================================================

class MessageUpdate(BaseModel):
    content: str = Field(..., min_length=1)


# =========================================================
# Response
# =========================================================

class MessageResponse(MessageBase):
    id: int
    chat_id: int
    user_id: int
    role: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)