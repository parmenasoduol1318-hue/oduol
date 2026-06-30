from datetime import datetime
from pydantic import BaseModel


# =========================================================
# Payment Schemas
# =========================================================

class PaymentCreate(BaseModel):
    amount: float
    currency: str = "USD"
    provider: str


class PaymentVerify(BaseModel):
    transaction_id: str


class PaymentResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    currency: str
    provider: str
    transaction_id: str | None = None
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# Subscription Schemas
# =========================================================

class SubscriptionCreate(BaseModel):
    plan: str
    provider: str


class SubscriptionUpdate(BaseModel):
    plan: str | None = None
    provider: str | None = None


class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan: str
    provider: str
    status: str
    started_at: datetime | None = None
    expires_at: datetime | None = None

    class Config:
        from_attributes = True