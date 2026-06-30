from __future__ import annotations

import resend

from app.core.config import settings


class ResendClient:
    """
    Email service integration using Resend.
    """

    def __init__(self) -> None:
        resend.api_key = settings.RESEND_API_KEY

    def send_email(
        self,
        to_email: str,
        subject: str,
        html: str,
        from_email: str = "SwiftReply <noreply@swiftreply.com>",
    ) -> dict:
        params = {
            "from": from_email,
            "to": [to_email],
            "subject": subject,
            "html": html,
        }

        return resend.Emails.send(params)