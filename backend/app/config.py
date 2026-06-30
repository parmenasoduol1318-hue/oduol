from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings
from pydantic_settings import SettingsConfigDict


class Settings(BaseSettings):
    """
    SwiftReply Backend Configuration
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # ==========================================================
    # APPLICATION
    # ==========================================================

    APP_NAME: str = "SwiftReply API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    API_PREFIX: str = "/api"
    PROJECT_NAME: str = "SwiftReply"

    # ==========================================================
    # SECURITY
    # ==========================================================

    SECRET_KEY: str

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # ==========================================================
    # DATABASE
    # ==========================================================

    DATABASE_URL: str

    DATABASE_POOL_SIZE: int = 20

    DATABASE_MAX_OVERFLOW: int = 40

    DATABASE_POOL_TIMEOUT: int = 30

    DATABASE_POOL_RECYCLE: int = 1800

    # ==========================================================
    # OPENAI
    # ==========================================================

    OPENAI_API_KEY: str = ""

    OPENAI_MODEL: str = "gpt-5.5"

    OPENAI_IMAGE_MODEL: str = "gpt-image-1"

    OPENAI_EMBEDDING_MODEL: str = "text-embedding-3-large"

    # ==========================================================
    # PAYPAL
    # ==========================================================

    PAYPAL_CLIENT_ID: str = ""

    PAYPAL_CLIENT_SECRET: str = ""

    PAYPAL_MODE: str = "sandbox"

    # ==========================================================
    # MPESA
    # ==========================================================

    MPESA_CONSUMER_KEY: str = ""

    MPESA_CONSUMER_SECRET: str = ""

    MPESA_SHORTCODE: str = ""

    MPESA_PASSKEY: str = ""

    MPESA_CALLBACK_URL: str = ""

    # ==========================================================
    # FIREBASE
    # ==========================================================

    FIREBASE_CREDENTIALS: str = ""

    # ==========================================================
    # EMAIL
    # ==========================================================

    RESEND_API_KEY: str = ""

    EMAIL_FROM: str = "noreply@swiftreply.ai"

    # ==========================================================
    # CLOUDINARY
    # ==========================================================

    CLOUDINARY_CLOUD_NAME: str = ""

    CLOUDINARY_API_KEY: str = ""

    CLOUDINARY_API_SECRET: str = ""

    # ==========================================================
    # REDIS
    # ==========================================================

    REDIS_URL: str = "redis://localhost:6379"

    # ==========================================================
    # FILE STORAGE
    # ==========================================================

    MAX_UPLOAD_SIZE: int = 104857600

    STORAGE_PATH: str = "storage"

    GENERATED_PATH: str = "storage/generated"

    TEMP_PATH: str = "storage/temp"

    UPLOADS_PATH: str = "storage/uploads"

    # ==========================================================
    # RATE LIMITING
    # ==========================================================

    DEFAULT_RATE_LIMIT: int = 100

    AI_RATE_LIMIT: int = 50

    IMAGE_RATE_LIMIT: int = 20

    VOICE_RATE_LIMIT: int = 20

    # ==========================================================
    # SUBSCRIPTIONS
    # ==========================================================

    FREE_DAILY_MESSAGES: int = 15

    FREE_DAILY_IMAGES: int = 3

    FREE_DAILY_VOICE_MINUTES: int = 5

    PRO_NAME: str = "SwiftReply Pro"

    PRO_PRICE_USD: float = 9.99

    # ==========================================================
    # LOGGING
    # ==========================================================

    LOG_LEVEL: str = "INFO"

    LOG_FILE: str = "swiftreply.log"

    # ==========================================================
    # CORS
    # ==========================================================

    BACKEND_CORS_ORIGINS: list[str] = Field(
        default_factory=lambda: [
            "*"
        ]
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()