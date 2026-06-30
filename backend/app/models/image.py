from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.db.database import Base


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    url = Column(Text, nullable=False)
    prompt = Column(Text, nullable=True)

    provider = Column(String, default="openai")

    created_at = Column(DateTime(timezone=True), server_default=func.now())