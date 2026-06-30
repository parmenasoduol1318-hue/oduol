from __future__ import annotations

import json
from typing import Any

from firebase_admin import credentials, initialize_app, messaging

from app.core.config import settings


class FirebaseClient:
    """
    Firebase integration for push notifications.
    """

    def __init__(self) -> None:
        if not getattr(self, "_initialized", False):
            cred = credentials.Certificate(
                json.loads(settings.FIREBASE_CREDENTIALS)
            )
            initialize_app(cred)
            self._initialized = True

    # =========================================================
    # Send Push Notification
    # =========================================================

    def send_push(
        self,
        token: str,
        title: str,
        body: str,
        data: dict[str, Any] | None = None,
    ) -> str:
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data or {},
            token=token,
        )

        response = messaging.send(message)
        return response