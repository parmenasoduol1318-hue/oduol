from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.memory import Memory
from app.ai.embeddings import EmbeddingsService


class MemoryService:
    """
    Handles long-term memory storage and retrieval.
    """

    def __init__(self) -> None:
        self.embedder = EmbeddingsService()

    # =========================================================
    # Save Memory
    # =========================================================

    async def save_memory(
        self,
        db: Session,
        user_id: int,
        content: str,
        meta: dict | None = None,
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

    # =========================================================
    # Get User Memories
    # =========================================================

    def get_user_memories(self, db: Session, user_id: int) -> list[Memory]:
        return (
            db.query(Memory)
            .filter(Memory.user_id == user_id)
            .order_by(Memory.created_at.desc())
            .all()
        )

    # =========================================================
    # Delete Memory
    # =========================================================

    def delete_memory(self, db: Session, memory_id: int, user_id: int) -> bool:
        memory = (
            db.query(Memory)
            .filter(Memory.id == memory_id, Memory.user_id == user_id)
            .first()
        )

        if not memory:
            return False

        db.delete(memory)
        db.commit()
        return True