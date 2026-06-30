from __future__ import annotations

from typing import Any

from sqlalchemy.orm import Session

from app.models.memory import Memory
from app.ai.embeddings import EmbeddingsService


class VectorStore:
    """
    Simple vector store built on top of Postgres (no pgvector required yet).
    Stores embeddings inside Memory table (meta field).
    """

    def __init__(self) -> None:
        self.embedder = EmbeddingsService()

    async def add_memory(
        self,
        db: Session,
        user_id: int,
        content: str,
        meta: dict[str, Any] | None = None,
    ) -> Memory:
        embedding = await self.embedder.embed_text(content)

        memory = Memory(
            user_id=user_id,
            content=content,
            meta={
                "embedding": embedding,
                **(meta or {}),
            },
        )

        db.add(memory)
        db.commit()
        db.refresh(memory)
        return memory

    async def semantic_search(
        self,
        db: Session,
        user_id: int,
        query: str,
        limit: int = 10,
    ) -> list[Memory]:
        query_embedding = await self.embedder.embed_text(query)

        memories = (
            db.query(Memory)
            .filter(Memory.user_id == user_id)
            .all()
        )

        scored = []

        for m in memories:
            emb = (m.meta or {}).get("embedding")
            if not emb:
                continue

            score = self.embedder.cosine_similarity(query_embedding, emb)
            scored.append((score, m))

        scored.sort(key=lambda x: x[0], reverse=True)

        return [m for _, m in scored[:limit]]