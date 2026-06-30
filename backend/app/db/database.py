from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from app.core.config import settings

# =========================================================
# SQLAlchemy Engine
# =========================================================

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    future=True,
)

# =========================================================
# Session
# =========================================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

# =========================================================
# Base
# =========================================================

Base = declarative_base()


# =========================================================
# Database Dependency
# =========================================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================================================
# Initialize Database
# =========================================================

def init_db():
    """
    Import all models before creating tables so SQLAlchemy
    registers them with Base.metadata.
    """
    from app.models import (  # noqa: F401
        user,
        chat,
        message,
        notification,
        payment,
        memory,
    )

    Base.metadata.create_all(bind=engine)