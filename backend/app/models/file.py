from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.db.database import Base


class File(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    filename = Column(String, nullable=False)
    original_name = Column(String, nullable=True)

    file_url = Column(Text, nullable=False)

    file_type = Column(String, nullable=True)  # pdf, image, doc, etc
    size = Column(Integer, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())