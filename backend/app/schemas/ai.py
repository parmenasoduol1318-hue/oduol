from datetime import datetime
from typing import Any

from pydantic import BaseModel


# =========================================================
# AI Chat
# =========================================================

class AIChatRequest(BaseModel):
    prompt: str
    chat_id: int | None = None
    temperature: float = 0.7


class AIChatResponse(BaseModel):
    response: str
    chat_id: int | None = None
    metadata: dict[str, Any] | None = None


# =========================================================
# AI Image
# =========================================================

class AIImageRequest(BaseModel):
    prompt: str
    size: str = "1024x1024"


class AIImageResponse(BaseModel):
    image_url: str


# =========================================================
# Rewrite
# =========================================================

class AIRewriteRequest(BaseModel):
    text: str
    tone: str = "professional"


# =========================================================
# Translate
# =========================================================

class AITranslateRequest(BaseModel):
    text: str
    target_language: str


# =========================================================
# Summarize
# =========================================================

class AISummarizeRequest(BaseModel):
    text: str


# =========================================================
# Research
# =========================================================

class AIResearchRequest(BaseModel):
    query: str


# =========================================================
# Code
# =========================================================

class AICodeRequest(BaseModel):
    prompt: str
    language: str | None = None


# =========================================================
# Memory
# =========================================================

class MemoryCreate(BaseModel):
    content: str
    metadata: dict[str, Any] | None = None


class MemoryUpdate(BaseModel):
    content: str | None = None
    metadata: dict[str, Any] | None = None


class MemoryResponse(BaseModel):
    id: int
    user_id: int
    content: str
    metadata: dict[str, Any] | None = None
    created_at: datetime
    updated_at: datetime | None = None

    class Config:
        from_attributes = True