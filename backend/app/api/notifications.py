from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import (
    get_db,
    get_current_user,
)

from app.models.user import User
from app.schemas.notification import (
    NotificationCreate,
    NotificationUpdate,
    NotificationResponse,
)
from app.services.notification_service import NotificationService

router = APIRouter()


# ==========================================================
# Create Notification (Admin/System)
# ==========================================================

@router.post(
    "/",
    response_model=NotificationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_notification(
    payload: NotificationCreate,
    db: Session = Depends(get_db),
):
    return await NotificationService.create_notification(
        db=db,
        payload=payload,
    )


# ==========================================================
# Get My Notifications
# ==========================================================

@router.get(
    "/",
    response_model=list[NotificationResponse],
)
async def get_notifications(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    unread_only: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await NotificationService.get_notifications(
        db=db,
        user=current_user,
        page=page,
        page_size=page_size,
        unread_only=unread_only,
    )


# ==========================================================
# Get Notification
# ==========================================================

@router.get(
    "/{notification_id}",
    response_model=NotificationResponse,
)
async def get_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    notification = await NotificationService.get_notification(
        db=db,
        user=current_user,
        notification_id=notification_id,
    )

    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found.",
        )

    return notification


# ==========================================================
# Mark As Read
# ==========================================================

@router.patch("/{notification_id}/read")
async def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await NotificationService.mark_as_read(
        db=db,
        user=current_user,
        notification_id=notification_id,
    )


# ==========================================================
# Mark All As Read
# ==========================================================

@router.patch("/read/all")
async def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await NotificationService.mark_all_as_read(
        db=db,
        user=current_user,
    )


# ==========================================================
# Update Notification
# ==========================================================

@router.put(
    "/{notification_id}",
    response_model=NotificationResponse,
)
async def update_notification(
    notification_id: int,
    payload: NotificationUpdate,
    db: Session = Depends(get_db),
):
    notification = await NotificationService.update_notification(
        db=db,
        notification_id=notification_id,
        payload=payload,
    )

    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found.",
        )

    return notification


# ==========================================================
# Delete Notification
# ==========================================================

@router.delete("/{notification_id}")
async def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = await NotificationService.delete_notification(
        db=db,
        user=current_user,
        notification_id=notification_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found.",
        )

    return {
        "success": True,
        "message": "Notification deleted successfully.",
    }


# ==========================================================
# Delete All Notifications
# ==========================================================

@router.delete("/")
async def delete_all_notifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await NotificationService.delete_all_notifications(
        db=db,
        user=current_user,
    )