from sqlalchemy.orm import Session

from app.models.chat import Chat
from app.models.user import User
from app.schemas.chat import ChatCreate, ChatUpdate


class ChatService:
    """
    Chat business logic.
    """

    # ==========================================================
    # Create Chat
    # ==========================================================

    @staticmethod
    def create_chat(
        db: Session,
        owner: User,
        payload: ChatCreate,
    ) -> Chat:
        chat = Chat(
            user_id=owner.id,
            title=payload.title or "New Chat",
        )

        db.add(chat)
        db.commit()
        db.refresh(chat)

        return chat

    # ==========================================================
    # Get User Chats
    # ==========================================================

    @staticmethod
    def get_user_chats(
        db: Session,
        owner: User,
        skip: int = 0,
        limit: int = 20,
    ):
        return (
            db.query(Chat)
            .filter(Chat.user_id == owner.id)
            .order_by(Chat.updated_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    # ==========================================================
    # Get One Chat
    # ==========================================================

    @staticmethod
    def get_chat(
        db: Session,
        chat_id: int,
        owner: User,
    ):
        return (
            db.query(Chat)
            .filter(
                Chat.id == chat_id,
                Chat.user_id == owner.id,
            )
            .first()
        )

    # ==========================================================
    # Update Chat
    # ==========================================================

    @staticmethod
    def update_chat(
        db: Session,
        chat_id: int,
        owner: User,
        payload: ChatUpdate,
    ):
        chat = (
            db.query(Chat)
            .filter(
                Chat.id == chat_id,
                Chat.user_id == owner.id,
            )
            .first()
        )

        if chat is None:
            return None

        if payload.title is not None:
            chat.title = payload.title

        db.commit()
        db.refresh(chat)

        return chat

    # ==========================================================
    # Delete Chat
    # ==========================================================

    @staticmethod
    def delete_chat(
        db: Session,
        chat_id: int,
        owner: User,
    ) -> bool:
        chat = (
            db.query(Chat)
            .filter(
                Chat.id == chat_id,
                Chat.user_id == owner.id,
            )
            .first()
        )

        if chat is None:
            return False

        db.delete(chat)
        db.commit()

        return True

    # ==========================================================
    # Archive Chat
    # ==========================================================

    @staticmethod
    def archive_chat(
        db: Session,
        chat_id: int,
        owner: User,
    ):
        # Archive not implemented yet.
        # Returning the chat keeps the router working.
        return ChatService.get_chat(
            db=db,
            chat_id=chat_id,
            owner=owner,
        )

    # ==========================================================
    # Unarchive Chat
    # ==========================================================

    @staticmethod
    def unarchive_chat(
        db: Session,
        chat_id: int,
        owner: User,
    ):
        # Unarchive not implemented yet.
        return ChatService.get_chat(
            db=db,
            chat_id=chat_id,
            owner=owner,
        )