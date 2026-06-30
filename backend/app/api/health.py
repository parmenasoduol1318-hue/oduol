from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.dependencies import get_db

router = APIRouter()


# ==========================================================
# Root Endpoint
# ==========================================================

@router.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
        "message": "Welcome to the SwiftReply API",
        "docs": "/docs",
        "redoc": "/redoc",
        "timestamp": datetime.utcnow().isoformat(),
    }


# ==========================================================
# Health Check
# ==========================================================

@router.get("/health")
async def health():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": "development" if settings.DEBUG else "production",
        "timestamp": datetime.utcnow().isoformat(),
    }


# ==========================================================
# Readiness Check
# ==========================================================

@router.get("/health/ready")
async def readiness(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))

        return {
            "status": "ready",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat(),
        }

    except Exception as e:
        return {
            "status": "not_ready",
            "database": "disconnected",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat(),
        }


# ==========================================================
# Liveness Check
# ==========================================================

@router.get("/health/live")
async def liveness():
    return {
        "status": "alive",
        "timestamp": datetime.utcnow().isoformat(),
    }


# ==========================================================
# Version Information
# ==========================================================

@router.get("/version")
async def version():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "python": "3.12",
        "framework": "FastAPI",
        "api": "v1",
    }


# ==========================================================
# Configuration Status
# ==========================================================

@router.get("/config")
async def config_status():
    return {
        "debug": settings.DEBUG,
        "host": settings.HOST,
        "port": settings.PORT,
        "database": bool(settings.DATABASE_URL),
        "openai": bool(settings.OPENAI_API_KEY),
        "paypal": bool(settings.PAYPAL_CLIENT_ID),
        "mpesa": bool(settings.MPESA_CONSUMER_KEY),
        "firebase": bool(settings.FIREBASE_CREDENTIALS),
        "redis": bool(settings.REDIS_URL),
    }


# ==========================================================
# Ping
# ==========================================================

@router.get("/ping")
async def ping():
    return {
        "message": "PONG",
        "timestamp": datetime.utcnow().isoformat(),
    }