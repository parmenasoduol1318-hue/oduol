from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.notification import Notification


class NotificationService:
    """
    Handles user notifications.
    """

    # =========================================================
    # Create Notification
    # =========================================================

    def create_notification(
        self,
        db: Session,
        user_id: int,
        title: str,
        message: str,
        type: str = "info",
    ) -> Notification:
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=type,
            is_read=False,
        )

        db.add(notification)
        db.commit()
        db.refresh(notification)
        return notification

    # =========================================================
    # Get Notifications
    # =========================================================

    def get_user_notifications(
        self,
        db: Session,
        user_id: int,
    ) -> list[Notification]:
        return (
            db.query(Notification)
            .filter(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
            .all()
        )

    # =========================================================
    # Mark as Read
    # =========================================================

    def mark_as_read(
        self,
        db: Session,
        notification_id: int,
        user_id: int,
    ) -> Notification | None:
        notification = (
            db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_id == user_id,
            )
            .first()
        )

        if not notification:
            return None

        notification.is_read = True
        db.commit()
        db.refresh(notification)

        return notification