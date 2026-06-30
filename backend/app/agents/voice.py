from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class VoiceAgent:
    """
    Voice Agent

    Responsibilities
    ----------------
    • Speech-to-text
    • Text-to-speech
    • Voice commands processing
    • Audio transcription
    • Voice-based assistant interactions
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        audio: bytes | None = None,
        context: dict[str, Any] | None = None,
        temperature: float = 0.2,
    ) -> str:
        final_prompt = prompt

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.voice(
            prompt=final_prompt,
            audio=audio,
            system_prompt=SYSTEM_PROMPTS["voice"],
            temperature=temperature,
        )

    async def transcribe(self, audio: bytes) -> str:
        return await self.run(
            prompt="Transcribe this audio accurately.",
            audio=audio,
        )

    async def voice_command(self, audio: bytes) -> str:
        return await self.run(
            prompt="Interpret this voice command and return structured intent.",
            audio=audio,
        )

    async def chat_from_voice(self, audio: bytes) -> str:
        return await self.run(
            prompt="Respond conversationally to this voice input.",
            audio=audio,
        )

    async def summarize_voice(self, audio: bytes) -> str:
        return await self.run(
            prompt="Summarize the content of this audio.",
            audio=audio,
        )