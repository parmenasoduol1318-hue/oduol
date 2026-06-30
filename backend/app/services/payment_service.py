from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.payment import Payment


class PaymentService:
    """
    Handles payment records for M-Pesa and PayPal.
    """

    # =========================================================
    # Create Payment
    # =========================================================

    def create_payment(
        self,
        db: Session,
        user_id: int,
        amount: float,
        currency: str,
        provider: str,
        transaction_id: str | None = None,
        status: str = "pending",
    ) -> Payment:
        payment = Payment(
            user_id=user_id,
            amount=amount,
            currency=currency,
            provider=provider,
            transaction_id=transaction_id,
            status=status,
        )

        db.add(payment)
        db.commit()
        db.refresh(payment)
        return payment

    # =========================================================
    # Get User Payments
    # =========================================================

    def get_user_payments(self, db: Session, user_id: int) -> list[Payment]:
        return (
            db.query(Payment)
            .filter(Payment.user_id == user_id)
            .order_by(Payment.created_at.desc())
            .all()
        )

    # =========================================================
    # Update Payment Status
    # =========================================================

    def update_status(
        self,
        db: Session,
        payment_id: int,
        status: str,
    ) -> Payment | None:
        payment = db.query(Payment).filter(Payment.id == payment_id).first()

        if not payment:
            return None

        payment.status = status
        db.commit()
        db.refresh(payment)

        return payment