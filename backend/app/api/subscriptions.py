from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.payment import (
    SubscriptionCreate,
    SubscriptionUpdate,
    SubscriptionResponse,
)

from app.services.payment_service import PaymentService

router = APIRouter()


# ==========================================================
# Create Subscription
# ==========================================================

@router.post(
    "/",
    response_model=SubscriptionResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_subscription(
    payload: SubscriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.create_subscription(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Get Current Subscription
# ==========================================================

@router.get(
    "/me",
    response_model=SubscriptionResponse,
)
async def get_my_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    subscription = await PaymentService.get_user_subscription(
        db=db,
        user=current_user,
    )

    if subscription is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No active subscription found.",
        )

    return subscription


# ==========================================================
# Subscription History
# ==========================================================

@router.get(
    "/history",
    response_model=list[SubscriptionResponse],
)
async def subscription_history(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.subscription_history(
        db=db,
        user=current_user,
        page=page,
        page_size=page_size,
    )


# ==========================================================
# Upgrade Subscription
# ==========================================================

@router.put(
    "/upgrade",
    response_model=SubscriptionResponse,
)
async def upgrade_subscription(
    payload: SubscriptionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    subscription = await PaymentService.upgrade_subscription(
        db=db,
        user=current_user,
        payload=payload,
    )

    if subscription is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found.",
        )

    return subscription


# ==========================================================
# Cancel Subscription
# ==========================================================

@router.delete("/cancel")
async def cancel_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cancelled = await PaymentService.cancel_subscription(
        db=db,
        user=current_user,
    )

    if not cancelled:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Subscription not found.",
        )

    return {
        "success": True,
        "message": "Subscription cancelled successfully.",
    }


# ==========================================================
# Renew Subscription
# ==========================================================

@router.post("/renew")
async def renew_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.renew_subscription(
        db=db,
        user=current_user,
    )


# ==========================================================
# Check Subscription Status
# ==========================================================

@router.get("/status")
async def subscription_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.subscription_status(
        db=db,
        user=current_user,
    )
    