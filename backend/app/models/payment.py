from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.sql import func

from app.db.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)

    amount = Column(Float, nullable=False)
    currency = Column(String, default="USD")

    provider = Column(String, nullable=False)  # mpesa | paypal

    transaction_id = Column(String, unique=True, index=True, nullable=True)

    status = Column(String, default="pending")  # pending | completed | failed

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )