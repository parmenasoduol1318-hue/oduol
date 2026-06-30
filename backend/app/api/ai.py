from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.ai import (
    AIChatRequest,
    AIChatResponse,
    AIImageRequest,
    AIImageResponse,
    AIRewriteRequest,
    AITranslateRequest,
    AISummarizeRequest,
    AIResearchRequest,
    AICodeRequest,
)

from app.services.ai_service import ai_service

router = APIRouter()


# ==========================================================
# Chat
# ==========================================================

@router.post(
    "/chat",
    response_model=AIChatResponse,
)
async def chat(
    payload: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ai_service.chat(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Rewrite
# ==========================================================

@router.post("/rewrite")
async def rewrite(
    payload: AIRewriteRequest,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.rewrite(
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Translate
# ==========================================================

@router.post("/translate")
async def translate(
    payload: AITranslateRequest,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.translate(
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Summarize
# ==========================================================

@router.post("/summarize")
async def summarize(
    payload: AISummarizeRequest,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.summarize(
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Research
# ==========================================================

@router.post("/research")
async def research(
    payload: AIResearchRequest,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.research(
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Code
# ==========================================================

@router.post("/code")
async def code(
    payload: AICodeRequest,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.code(
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Image Generation
# ==========================================================

@router.post(
    "/image",
    response_model=AIImageResponse,
)
async def image(
    payload: AIImageRequest,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.generate_image(
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Vision
# ==========================================================

@router.post("/vision")
async def vision(
    image: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    return await ai_service.analyze_image(
        user=current_user,
        image=image,
    )


# ==========================================================
# Speech To Text
# ==========================================================

@router.post("/speech-to-text")
async def speech_to_text(
    audio: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    return await ai_service.speech_to_text(
        user=current_user,
        audio=audio,
    )


# ==========================================================
# Text To Speech
# ==========================================================

@router.post("/text-to-speech")
async def text_to_speech(
    text: str,
    voice: str = "alloy",
    current_user: User = Depends(get_current_user),
):
    return await ai_service.text_to_speech(
        user=current_user,
        text=text,
        voice=voice,
    )


# ==========================================================
# Embeddings
# ==========================================================

@router.post("/embeddings")
async def embeddings(
    text: str,
    current_user: User = Depends(get_current_user),
):
    return await ai_service.create_embeddings(
        user=current_user,
        text=text,
    )


# ==========================================================
# Prompt Suggestions
# ==========================================================

@router.get("/prompts")
async def prompts(
    current_user: User = Depends(get_current_user),
):
    return await ai_service.prompt_suggestions(
        user=current_user,
    )