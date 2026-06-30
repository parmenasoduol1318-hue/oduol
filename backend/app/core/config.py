from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # =========================================================
    # Application
    # =========================================================
    APP_NAME: str = "SwiftReply API"
    APP_VERSION: str = "2.0.0"
    DEBUG: bool = True

    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # =========================================================
    # Database
    # =========================================================
    DATABASE_URL: str

    # =========================================================
    # JWT
    # =========================================================
    SECRET_KEY: str
    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # =========================================================
    # Rate Limiting
    # =========================================================
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_WINDOW: int = 60

    # =========================================================
    # CORS
    # =========================================================
    BACKEND_CORS_ORIGINS: list[str] = [
        "*",
    ]

    # =========================================================
    # OpenAI
    # =========================================================
    OPENAI_API_KEY: str = ""

    # =========================================================
    # PayPal
    # =========================================================
    PAYPAL_CLIENT_ID: str = ""
    PAYPAL_CLIENT_SECRET: str = ""

    # =========================================================
    # MPesa
    # =========================================================
    MPESA_CONSUMER_KEY: str = ""
    MPESA_CONSUMER_SECRET: str = ""
    MPESA_SHORTCODE: str = ""
    MPESA_PASSKEY: str = ""

    # =========================================================
    # Firebase
    # =========================================================
    FIREBASE_CREDENTIALS: str = ""

    # =========================================================
    # Redis
    # =========================================================
    REDIS_URL: str = "redis://localhost:6379"

    # =========================================================
    # Settings
    # =========================================================
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=True,
    )


settings = Settings()