from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router

from app.middleware.auth import auth_middleware
from app.middleware.logging import logging_middleware
from app.middleware.rate_limit import RateLimitMiddleware
from app.middleware.errors import ErrorHandlingMiddleware

from app.db.database import init_db

from app.utils.logger import logger


# ==========================================================
# Lifespan
# ==========================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("====================================")
    logger.info(f"Starting {settings.APP_NAME}")
    logger.info("Initializing database...")

    try:
        init_db()
        logger.info("Database initialized.")
    except Exception as e:
        logger.exception(f"Database initialization failed: {e}")

    logger.info("Application started successfully.")
    logger.info("====================================")

    yield

    logger.info("====================================")
    logger.info(f"Stopping {settings.APP_NAME}")
    logger.info("Shutdown complete.")
    logger.info("====================================")


# ==========================================================
# FastAPI App
# ==========================================================

app = FastAPI(
    title=settings.APP_NAME,
    description="SwiftReply AI Backend",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.DEBUG else settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# Rate Limiting
# ==========================================================

rate_limiter = RateLimitMiddleware(
    max_requests=settings.RATE_LIMIT_REQUESTS,
    window_seconds=settings.RATE_LIMIT_WINDOW,
)

app.middleware("http")(rate_limiter)


# ==========================================================
# Logging Middleware
# ==========================================================

app.middleware("http")(logging_middleware)


# ==========================================================
# Authentication Middleware
# ==========================================================

app.middleware("http")(auth_middleware)


# ==========================================================
# Error Handling Middleware
# ==========================================================

app.middleware("http")(ErrorHandlingMiddleware())


# ==========================================================
# Root Endpoint
# ==========================================================

@app.get("/", tags=["Root"])
async def root():
    return {
        "name": settings.APP_NAME,
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


# ==========================================================
# API
# ==========================================================

app.include_router(api_router)


# ==========================================================
# Startup Complete
# ==========================================================

logger.info(f"{settings.APP_NAME} configured successfully.")