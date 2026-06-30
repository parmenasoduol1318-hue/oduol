from __future__ import annotations

from datetime import datetime
from typing import Any

from sqlalchemy.orm import Session

from app.models.memory import Memory


class MemoryManager:
    """
    Simple memory layer for storing and retrieving user context.
    """

    def create_memory(
        self,
        db: Session,
        user_id: int,
        content: str,
        meta: dict[str, Any] | None = None,
    ) -> Memory:
        memory = Memory(
            user_id=user_id,
            content=content,
            meta=meta or {},
            created_at=datetime.utcnow(),
        )

        db.add(memory)
        db.commit()
        db.refresh(memory)
        return memory

    def get_user_memories(
        self,
        db: Session,
        user_id: int,
        limit: int = 50,
    ) -> list[Memory]:
        return (
            db.query(Memory)
            .filter(Memory.user_id == user_id)
            .order_by(Memory.created_at.desc())
            .limit(limit)
            .all()
        )

    def delete_memory(
        self,
        db: Session,
        memory_id: int,
        user_id: int,
    ) -> bool:
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

    def search_memory(
        self,
        db: Session,
        user_id: int,
        query: str,
        limit: int = 20,
    ) -> list[Memory]:
        return (
            db.query(Memory)
            .filter(
                Memory.user_id == user_id,
                Memory.content.ilike(f"%{query}%"),
            )
            .order_by(Memory.created_at.desc())
            .limit(limit)
            .all()
        )
        