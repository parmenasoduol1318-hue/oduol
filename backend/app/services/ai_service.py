from __future__ import annotations

from sqlalchemy.orm import Session

from app.ai.workflows import AIWorkflows
from app.services.chat_service import ChatService


class AIService:
    """
    Main AI service layer that connects:
    - AI workflows
    - Chat system
    - Memory (future extension)
    """

    def __init__(self) -> None:
        self.workflows = AIWorkflows()
        self.chat_service = ChatService()

    # =========================================================
    # Chat AI
    # =========================================================

    async def chat(
        self,
        db: Session,
        user_id: int,
        chat_id: int,
        message: str,
    ) -> str:
        """
        Send message to AI and store response in chat.
        """

        # Save user message
        self.chat_service.add_message(
            db=db,
            chat_id=chat_id,
            user_id=user_id,
            role="user",
            content=message,
        )

        # Generate AI response
        response = await self.workflows.chat(message)

        # Save assistant response
        self.chat_service.add_message(
            db=db,
            chat_id=chat_id,
            user_id=user_id,
            role="assistant",
            content=response,
        )

        return response

    # =========================================================
    # Smart reply
    # =========================================================

    async def smart_reply(self, message: str) -> str:
        return await self.workflows.smart_reply(message)

    # =========================================================
    # Writing
    # =========================================================

    async def write(self, topic: str) -> str:
        return await self.workflows.write_content(topic)

    # =========================================================
    # Coding
    # =========================================================

    async def build_feature(self, requirement: str) -> str:
        return await self.workflows.build_feature(requirement)

    async def debug(self, code: str, error: str) -> str:
        return await self.workflows.debug(code, error)

    # =========================================================
    # Research
    # =========================================================

    async def research(self, topic: str) -> str:
        return await self.workflows.research(topic)

    # =========================================================
    # Planning
    # =========================================================

    async def plan(self, goal: str) -> str:
        return await self.workflows.plan(goal)

    # =========================================================
    # Vision
    # =========================================================

    async def analyze_image(self, prompt: str, image: bytes) -> str:
        return await self.workflows.analyze_image(prompt, image)

    # =========================================================
    # Voice
    # =========================================================

    async def process_voice(self, prompt: str, audio: bytes) -> str:
        return await self.workflows.process_voice(prompt, audio)