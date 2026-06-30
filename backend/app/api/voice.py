from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.services.voice_service import VoiceService

router = APIRouter()


# ==========================================================
# Speech To Text
# ==========================================================

@router.post("/speech-to-text")
async def speech_to_text(
    audio: UploadFile = File(...),
    language: str = Form(default="auto"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.speech_to_text(
        db=db,
        user=current_user,
        audio=audio,
        language=language,
    )


# ==========================================================
# Text To Speech
# ==========================================================

@router.post("/text-to-speech")
async def text_to_speech(
    text: str = Form(...),
    voice: str = Form(default="alloy"),
    speed: float = Form(default=1.0),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.text_to_speech(
        db=db,
        user=current_user,
        text=text,
        voice=voice,
        speed=speed,
    )


# ==========================================================
# Voice Conversation
# ==========================================================

@router.post("/conversation")
async def voice_conversation(
    audio: UploadFile = File(...),
    conversation_id: int | None = Form(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.voice_conversation(
        db=db,
        user=current_user,
        audio=audio,
        conversation_id=conversation_id,
    )


# ==========================================================
# Clone Voice
# ==========================================================

@router.post("/clone")
async def clone_voice(
    sample: UploadFile = File(...),
    voice_name: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.clone_voice(
        db=db,
        user=current_user,
        sample=sample,
        voice_name=voice_name,
    )


# ==========================================================
# List Voices
# ==========================================================

@router.get("/voices")
async def get_available_voices(
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.available_voices()


# ==========================================================
# Delete Custom Voice
# ==========================================================

@router.delete("/voices/{voice_id}")
async def delete_voice(
    voice_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.delete_voice(
        db=db,
        user=current_user,
        voice_id=voice_id,
    )


# ==========================================================
# Voice Settings
# ==========================================================

@router.get("/settings")
async def get_voice_settings(
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.get_settings(
        current_user.id,
    )


@router.put("/settings")
async def update_voice_settings(
    settings: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await VoiceService.update_settings(
        db=db,
        user=current_user,
        settings=settings,
    )