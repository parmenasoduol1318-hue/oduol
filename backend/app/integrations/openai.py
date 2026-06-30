from __future__ import annotations

from openai import OpenAI

from app.core.config import settings


class OpenAIClient:
    """
    Wrapper around OpenAI SDK for chat, vision, embeddings, etc.
    """

    def __init__(self) -> None:
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)

    # =========================================================
    # Chat Completion
    # =========================================================

    def chat(self, prompt: str, model: str = "gpt-4o-mini") -> str:
        response = self.client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are SwiftReply AI assistant."},
                {"role": "user", "content": prompt},
            ],
        )

        return response.choices[0].message.content or ""

    # =========================================================
    # Vision
    # =========================================================

    def vision(self, prompt: str, image_url: str, model: str = "gpt-4o-mini") -> str:
        response = self.client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": image_url}},
                    ],
                }
            ],
        )

        return response.choices[0].message.content or ""

    # =========================================================
    # Embeddings
    # =========================================================

    def embed(self, text: str, model: str = "text-embedding-3-small") -> list[float]:
        response = self.client.embeddings.create(
            model=model,
            input=text,
        )

        return response.data[0].embedding