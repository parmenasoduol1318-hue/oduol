from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.user import User

from app.schemas.payment import (
    PaymentCreate,
    PaymentVerify,
    PaymentResponse,
)

from app.services.payment_service import PaymentService

router = APIRouter()


# ==========================================================
# Create Payment
# ==========================================================

@router.post(
    "/",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_payment(
    payload: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.create_payment(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Verify Payment
# ==========================================================

@router.post("/verify")
async def verify_payment(
    payload: PaymentVerify,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.verify_payment(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# MPesa Callback
# ==========================================================

@router.post("/mpesa/callback")
async def mpesa_callback(
    payload: dict,
    db: Session = Depends(get_db),
):
    return await PaymentService.mpesa_callback(
        db=db,
        payload=payload,
    )


# ==========================================================
# PayPal Webhook
# ==========================================================

@router.post("/paypal/webhook")
async def paypal_webhook(
    payload: dict,
    db: Session = Depends(get_db),
):
    return await PaymentService.paypal_webhook(
        db=db,
        payload=payload,
    )


# ==========================================================
# Payment History
# ==========================================================

@router.get(
    "/history",
    response_model=list[PaymentResponse],
)
async def payment_history(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.payment_history(
        db=db,
        user=current_user,
        page=page,
        page_size=page_size,
    )


# ==========================================================
# Payment Details
# ==========================================================

@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
)
async def payment_details(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    payment = await PaymentService.get_payment(
        db=db,
        user=current_user,
        payment_id=payment_id,
    )

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found.",
        )

    return payment


# ==========================================================
# Refund Payment
# ==========================================================

@router.post("/{payment_id}/refund")
async def refund_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    refunded = await PaymentService.refund_payment(
        db=db,
        user=current_user,
        payment_id=payment_id,
    )

    if refunded is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found.",
        )

    return refunded


# ==========================================================
# Payment Status
# ==========================================================

@router.get("/{payment_id}/status")
async def payment_status(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PaymentService.payment_status(
        db=db,
        user=current_user,
        payment_id=payment_id,
    )