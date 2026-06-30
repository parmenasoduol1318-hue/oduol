from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.chat import Chat
from app.models.message import Message


class ChatService:
    """
    Handles chat creation, retrieval, and messaging logic.
    """

    # =========================================================
    # Chat Operations
    # =========================================================

    def create_chat(self, db: Session, user_id: int, title: str | None = None) -> Chat:
        chat = Chat(user_id=user_id, title=title)
        db.add(chat)
        db.commit()
        db.refresh(chat)
        return chat

    def get_user_chats(self, db: Session, user_id: int) -> list[Chat]:
        return (
            db.query(Chat)
            .filter(Chat.user_id == user_id)
            .order_by(Chat.created_at.desc())
            .all()
        )

    def get_chat(self, db: Session, chat_id: int, user_id: int) -> Chat | None:
        return (
            db.query(Chat)
            .filter(Chat.id == chat_id, Chat.user_id == user_id)
            .first()
        )

    # =========================================================
    # Message Operations
    # =========================================================

    def add_message(
        self,
        db: Session,
        chat_id: int,
        user_id: int,
        role: str,
        content: str,
    ) -> Message:
        message = Message(
            chat_id=chat_id,
            user_id=user_id,
            role=role,
            content=content,
        )
        db.add(message)
        db.commit()
        db.refresh(message)
        return message

    def get_chat_messages(self, db: Session, chat_id: int) -> list[Message]:
        return (
            db.query(Message)
            .filter(Message.chat_id == chat_id)
            .order_by(Message.created_at.asc())
            .all()
        )

    def delete_chat(self, db: Session, chat_id: int, user_id: int) -> bool:
        chat = (
            db.query(Chat)
            .filter(Chat.id == chat_id, Chat.user_id == user_id)
            .first()
        )

        if not chat:
            return False

        db.delete(chat)
        db.commit()
        return True