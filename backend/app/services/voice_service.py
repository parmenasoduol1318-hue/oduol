from __future__ import annotations

from sqlalchemy.orm import Session

from app.ai.workflows import AIWorkflows
from app.models.message import Message


class VoiceService:
    """
    Handles voice processing + chat integration.
    """

    def __init__(self) -> None:
        self.workflows = AIWorkflows()

    async def transcribe_audio(self, audio: bytes) -> str:
        return await self.workflows.process_voice(
            prompt="Transcribe this audio accurately.",
            audio=audio,
        )

    async def voice_chat(
        self,
        db: Session,
        user_id: int,
        chat_id: int,
        audio: bytes,
    ) -> str:
        """
        Full voice-to-chat pipeline:
        audio -> text -> AI response -> store messages
        """

        # Step 1: Transcribe
        user_text = await self.workflows.process_voice(
            prompt="Transcribe this user voice input.",
            audio=audio,
        )

        # Step 2: Store user message
        db.add(
            Message(
                chat_id=chat_id,
                user_id=user_id,
                role="user",
                content=user_text,
            )
        )
        db.commit()

        # Step 3: AI response
        response = await self.workflows.chat(user_text)

        # Step 4: Store assistant message
        db.add(
            Message(
                chat_id=chat_id,
                user_id=user_id,
                role="assistant",
                content=response,
            )
        )
        db.commit()

        return response

    async def summarize_voice(self, audio: bytes) -> str:
        return await self.workflows.process_voice(
            prompt="Summarize this audio content.",
            audio=audio,
        )