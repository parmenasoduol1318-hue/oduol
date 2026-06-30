from __future__ import annotations

from typing import List

from app.ai.openai_client import OpenAIClient


class EmbeddingsService:
    """
    Handles text embeddings for semantic search and memory retrieval.
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def embed_text(self, text: str) -> List[float]:
        """
        Convert text into vector embedding.
        """
        response = await self.client.client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
        )

        return response.data[0].embedding

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """
        Batch embedding for multiple texts.
        """
        response = await self.client.client.embeddings.create(
            model="text-embedding-3-small",
            input=texts,
        )

        return [item.embedding for item in response.data]

    def cosine_similarity(self, a: List[float], b: List[float]) -> float:
        """
        Compute cosine similarity between two vectors.
        """
        dot = sum(x * y for x, y in zip(a, b))
        mag_a = sum(x * x for x in a) ** 0.5
        mag_b = sum(y * y for y in b) ** 0.5

        if mag_a == 0 or mag_b == 0:
            return 0.0

        return dot / (mag_a * mag_b)