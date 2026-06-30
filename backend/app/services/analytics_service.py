from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.user import User
from app.models.chat import Chat
from app.models.message import Message
from app.models.payment import Payment
from app.models.subscription import Subscription


class AnalyticsService:
    """
    Basic analytics for SwiftReply system usage.
    """

    # =========================================================
    # User Stats
    # =========================================================

    def get_user_stats(self, db: Session, user_id: int) -> dict:
        total_chats = db.query(Chat).filter(Chat.user_id == user_id).count()

        total_messages = db.query(Message).filter(Message.user_id == user_id).count()

        total_payments = db.query(Payment).filter(Payment.user_id == user_id).count()

        subscription = (
            db.query(Subscription)
            .filter(Subscription.user_id == user_id)
            .first()
        )

        return {
            "total_chats": total_chats,
            "total_messages": total_messages,
            "total_payments": total_payments,
            "subscription": subscription.plan if subscription else "free",
        }

    # =========================================================
    # System Stats (Admin)
    # =========================================================

    def get_system_stats(self, db: Session) -> dict:
        return {
            "total_users": db.query(User).count(),
            "total_chats": db.query(Chat).count(),
            "total_messages": db.query(Message).count(),
            "total_payments": db.query(Payment).count(),
        }