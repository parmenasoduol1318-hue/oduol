from __future__ import annotations

from sqlalchemy.orm import Session

from app.ai.workflows import AIWorkflows
from app.services.chat_service import ChatService


class AIService:
    """
    SwiftReply AI Service

    Bridges:
    - API
    - AI Workflows
    - Chat Storage
    """

    def __init__(self):
        self.workflows = AIWorkflows()
        self.chat_service = ChatService()

    # =========================================================
    # Compatibility wrappers for legacy tests and older callers
    # =========================================================

    async def smart_reply(self, message: str):
        return await self.workflows.chat(message)

    async def write(self, topic: str, style: str = "blog"):
        return await self.workflows.write_content(topic, style)

    async def plan(self, goal: str):
        return await self.workflows.plan(goal)

    # =========================================================
    # Chat
    # =========================================================

    async def chat(
        self,
        db: Session,
        user,
        payload,
    ):
        """
        Main chat endpoint.
        """

        # Store user message
        self.chat_service.add_message(
            db=db,
            chat_id=payload.chat_id,
            user_id=user.id,
            role="user",
            content=payload.prompt,
        )

        # AI response
        response = await self.workflows.chat(
            payload.prompt
        )

        # Store assistant response
        self.chat_service.add_message(
            db=db,
            chat_id=payload.chat_id,
            user_id=user.id,
            role="assistant",
            content=response,
        )

        return {
            "response": response,
            "chat_id": payload.chat_id,
        }

    # =========================================================
    # Rewrite
    # =========================================================

    async def rewrite(
        self,
        user,
        payload,
    ):
        result = await self.workflows.rewrite(
            payload.text,
        )

        return {
            "result": result,
        }

    # =========================================================
    # Translate
    # =========================================================

    async def translate(
        self,
        user,
        payload,
    ):
        result = await self.workflows.translate(
            text=payload.text,
            target_language=payload.target_language,
        )

        return {
            "result": result,
        }

    # =========================================================
    # Summarize
    # =========================================================

    async def summarize(
        self,
        user,
        payload,
    ):
        result = await self.workflows.summarize(
            payload.text,
        )

        return {
            "result": result,
        }

    # =========================================================
    # Research
    # =========================================================

    async def research(
        self,
        user,
        payload,
    ):
        result = await self.workflows.research(
            payload.topic,
        )

        return {
            "result": result,
        }

    # =========================================================
    # Code Assistant
    # =========================================================

    async def code(
        self,
        user,
        payload,
    ):
        result = await self.workflows.build_feature(
            payload.prompt,
        )

        return {
            "result": result,
        }

    # =========================================================
    # Image Generation
    # =========================================================

    async def generate_image(
        self,
        user,
        payload,
    ):
        image = await self.workflows.generate_image(
            prompt=payload.prompt,
        )

        return {
            "image": image,
        }

    # =========================================================
    # Vision
    # =========================================================

    async def analyze_image(
        self,
        user,
        image,
    ):
        data = await image.read()

        result = await self.workflows.analyze_image(
            prompt="Describe this image.",
            image=data,
        )

        return {
            "result": result,
        }

    # =========================================================
    # Speech To Text
    # =========================================================

    async def speech_to_text(
        self,
        user,
        audio,
    ):
        data = await audio.read()

        result = await self.workflows.process_voice(
            prompt="Transcribe this audio.",
            audio=data,
        )

        return {
            "text": result,
        }

    # =========================================================
    # Text To Speech
    # =========================================================

    async def text_to_speech(
        self,
        user,
        text,
        voice="alloy",
    ):
        result = await self.workflows.text_to_speech(
            text=text,
            voice=voice,
        )

        return {
            "audio": result,
        }

    # =========================================================
    # Embeddings
    # =========================================================

    async def create_embeddings(
        self,
        user,
        text,
    ):
        embeddings = await self.workflows.embeddings(
            text,
        )

        return {
            "embeddings": embeddings,
        }

    # =========================================================
    # Prompt Suggestions
    # =========================================================

    async def prompt_suggestions(
        self,
        user,
    ):
        return {
            "suggestions": [
                "Write a blog about AI",
                "Summarize this document",
                "Translate to Swahili",
                "Generate Python code",
                "Explain this image",
                "Create a business plan",
                "Research this topic",
            ]
        }


# =========================================================
# Singleton Instance
# =========================================================

ai_service = AIService()