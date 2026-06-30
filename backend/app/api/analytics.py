from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.services.analytics_service import AnalyticsService

router = APIRouter()


# ==========================================================
# User Dashboard
# ==========================================================

@router.get("/dashboard")
async def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.dashboard(
        db=db,
        user=current_user,
    )


# ==========================================================
# User Analytics
# ==========================================================

@router.get("/me")
async def my_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.user_analytics(
        db=db,
        user=current_user,
    )


# ==========================================================
# Usage Statistics
# ==========================================================

@router.get("/usage")
async def usage_statistics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.usage_statistics(
        db=db,
        user=current_user,
        days=days,
    )


# ==========================================================
# AI Analytics
# ==========================================================

@router.get("/ai")
async def ai_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.ai_analytics(
        db=db,
        user=current_user,
        days=days,
    )


# ==========================================================
# Message Analytics
# ==========================================================

@router.get("/messages")
async def message_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.message_analytics(
        db=db,
        user=current_user,
        days=days,
    )


# ==========================================================
# Voice Analytics
# ==========================================================

@router.get("/voice")
async def voice_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.voice_analytics(
        db=db,
        user=current_user,
        days=days,
    )


# ==========================================================
# Image Analytics
# ==========================================================

@router.get("/images")
async def image_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.image_analytics(
        db=db,
        user=current_user,
        days=days,
    )


# ==========================================================
# Subscription Analytics
# ==========================================================

@router.get("/subscription")
async def subscription_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.subscription_analytics(
        db=db,
        user=current_user,
    )


# ==========================================================
# Payment Analytics
# ==========================================================

@router.get("/payments")
async def payment_analytics(
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.payment_analytics(
        db=db,
        user=current_user,
        days=days,
    )


# ==========================================================
# Overall Summary
# ==========================================================

@router.get("/summary")
async def summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await AnalyticsService.summary(
        db=db,
        user=current_user,
    )