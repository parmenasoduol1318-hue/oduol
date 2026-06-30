from __future__ import annotations

from typing import Any, Optional

from openai import AsyncOpenAI

from app.core.config import settings


class OpenAIClient:
    """
    Central OpenAI wrapper for SwiftReply.

    Supports:
    - Chat completion
    - Vision (image input)
    - Audio/voice processing (transcription or multimodal voice workflows)
    """

    def __init__(self) -> None:
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def chat(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.7,
        model: str = "gpt-4o-mini",
    ) -> str:
        messages: list[dict[str, str]] = []

        if system_prompt:
            messages.append(
                {"role": "system", "content": system_prompt}
            )

        messages.append(
            {"role": "user", "content": prompt}
        )

        response = await self.client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
        )

        return response.choices[0].message.content or ""

    async def vision(
        self,
        prompt: str,
        image: bytes,
        system_prompt: Optional[str] = None,
        temperature: float = 0.2,
        model: str = "gpt-4o-mini",
    ) -> str:
        import base64

        base64_image = base64.b64encode(image).decode("utf-8")

        messages: list[dict[str, Any]] = []

        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})

        messages.append(
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{base64_image}"
                        },
                    },
                ],
            }
        )

        response = await self.client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
        )

        return response.choices[0].message.content or ""

    async def voice(
        self,
        prompt: str,
        audio: bytes,
        system_prompt: Optional[str] = None,
        temperature: float = 0.2,
        model: str = "gpt-4o-mini-audio-preview",
    ) -> str:
        """
        Audio-capable model wrapper (transcription + reasoning).
        """

        import base64

        base64_audio = base64.b64encode(audio).decode("utf-8")

        messages: list[dict[str, Any]] = []

        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})

        messages.append(
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "input_audio",
                        "input_audio": {
                            "data": base64_audio,
                            "format": "wav",
                        },
                    },
                ],
            }
        )

        response = await self.client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=temperature,
        )

        return response.choices[0].message.content or ""