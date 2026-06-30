from fastapi import APIRouter, Depends, File, Form, UploadFile, Query
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.ai import (
    AIImageRequest,
    AIImageResponse,
)

from app.services.image_service import ImageService

router = APIRouter()


# ==========================================================
# Generate Image
# ==========================================================

@router.post(
    "/generate",
    response_model=AIImageResponse,
    status_code=201,
)
async def generate_image(
    payload: AIImageRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.generate_image(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Edit Image
# ==========================================================

@router.post("/edit")
async def edit_image(
    image: UploadFile = File(...),
    prompt: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.edit_image(
        db=db,
        user=current_user,
        image=image,
        prompt=prompt,
    )


# ==========================================================
# Upscale Image
# ==========================================================

@router.post("/upscale")
async def upscale_image(
    image: UploadFile = File(...),
    scale: int = Form(default=2),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.upscale_image(
        db=db,
        user=current_user,
        image=image,
        scale=scale,
    )


# ==========================================================
# Remove Background
# ==========================================================

@router.post("/remove-background")
async def remove_background(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.remove_background(
        db=db,
        user=current_user,
        image=image,
    )


# ==========================================================
# Image OCR
# ==========================================================

@router.post("/ocr")
async def image_ocr(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.extract_text(
        db=db,
        user=current_user,
        image=image,
    )


# ==========================================================
# Image Description
# ==========================================================

@router.post("/describe")
async def describe_image(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.describe_image(
        db=db,
        user=current_user,
        image=image,
    )


# ==========================================================
# Save Generated Image
# ==========================================================

@router.post("/save")
async def save_generated_image(
    image_url: str = Form(...),
    prompt: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.save_image(
        db=db,
        user=current_user,
        image_url=image_url,
        prompt=prompt,
    )


# ==========================================================
# User Image History
# ==========================================================

@router.get("/history")
async def image_history(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.get_history(
        db=db,
        user=current_user,
        page=page,
        page_size=page_size,
    )


# ==========================================================
# Delete Image
# ==========================================================

@router.delete("/{image_id}")
async def delete_image(
    image_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await ImageService.delete_image(
        db=db,
        user=current_user,
        image_id=image_id,
    )