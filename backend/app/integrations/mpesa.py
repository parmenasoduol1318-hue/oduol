from __future__ import annotations

import base64
import requests
from datetime import datetime

from app.core.config import settings


class MpesaClient:
    """
    M-Pesa STK Push integration (Safaricom Daraja API).
    """

    AUTH_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    STK_PUSH_URL = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

    def _get_access_token(self) -> str:
        response = requests.get(
            self.AUTH_URL,
            auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET),
        )
        response.raise_for_status()
        return response.json()["access_token"]

    def stk_push(
        self,
        phone: str,
        amount: int,
        account_reference: str,
        callback_url: str,
        transaction_desc: str = "SwiftReply Payment",
    ) -> dict:
        access_token = self._get_access_token()

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

        password_str = (
            settings.MPESA_SHORTCODE
            + settings.MPESA_PASSKEY
            + timestamp
        )

        password = base64.b64encode(password_str.encode()).decode()

        payload = {
            "BusinessShortCode": settings.MPESA_SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone,
            "PartyB": settings.MPESA_SHORTCODE,
            "PhoneNumber": phone,
            "CallBackURL": callback_url,
            "AccountReference": account_reference,
            "TransactionDesc": transaction_desc,
        }

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        }

        response = requests.post(self.STK_PUSH_URL, json=payload, headers=headers)
        response.raise_for_status()

        return response.json()