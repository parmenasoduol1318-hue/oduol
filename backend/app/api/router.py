
from fastapi import APIRouter

# ============================
# Import API Routers
# ============================

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.chats import router as chats_router
from app.api.messages import router as messages_router
from app.api.ai import router as ai_router
from app.api.voice import router as voice_router
from app.api.images import router as images_router
from app.api.files import router as files_router
from app.api.memory import router as memory_router
from app.api.notifications import router as notifications_router
from app.api.subscriptions import router as subscriptions_router
from app.api.payments import router as payments_router
from app.api.analytics import router as analytics_router
from app.api.health import router as health_router

# ============================
# Main API Router
# ============================

api_router = APIRouter(prefix="/api")

# Authentication
api_router.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"],
)

# Users
api_router.include_router(
    users_router,
    prefix="/users",
    tags=["Users"],
)

# Chats
api_router.include_router(
    chats_router,
    prefix="/chats",
    tags=["Chats"],
)

# Messages
api_router.include_router(
    messages_router,
    prefix="/messages",
    tags=["Messages"],
)

# AI
api_router.include_router(
    ai_router,
    prefix="/ai",
    tags=["Artificial Intelligence"],
)

# Voice
api_router.include_router(
    voice_router,
    prefix="/voice",
    tags=["Voice"],
)

# Images
api_router.include_router(
    images_router,
    prefix="/images",
    tags=["Images"],
)

# Files
api_router.include_router(
    files_router,
    prefix="/files",
    tags=["Files"],
)

# Memory
api_router.include_router(
    memory_router,
    prefix="/memory",
    tags=["Memory"],
)

# Notifications
api_router.include_router(
    notifications_router,
    prefix="/notifications",
    tags=["Notifications"],
)

# Subscriptions
api_router.include_router(
    subscriptions_router,
    prefix="/subscriptions",
    tags=["Subscriptions"],
)

# Payments
api_router.include_router(
    payments_router,
    prefix="/payments",
    tags=["Payments"],
)

# Analytics
api_router.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"],
)

# Health
api_router.include_router(
    health_router,
    tags=["Health"],
)

