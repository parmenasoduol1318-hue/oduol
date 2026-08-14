from sqlalchemy.orm import Session, selectinload

from app.models.chat import Chat
from app.models.message import Message
from app.models.user import User
from app.schemas.chat import ChatCreate, ChatUpdate
from app.schemas.message import MessageCreate, MessageUpdate


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
            .options(selectinload(Chat.messages))
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
            .options(selectinload(Chat.messages))
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

    @staticmethod
    def add_message(
        db: Session,
        chat_id: int,
        user_id: int,
        role: str,
        content: str,
    ) -> Message:
        chat = (
            db.query(Chat)
            .filter(Chat.id == chat_id)
            .first()
        )

        if chat is None:
            raise ValueError("Chat not found")

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

    # ==========================================================
    # Send Message
    # ==========================================================

    @staticmethod
    async def send_message(
        db: Session,
        user: User,
        payload: MessageCreate,
    ):
        chat = (
            db.query(Chat)
            .filter(Chat.id == payload.chat_id, Chat.user_id == user.id)
            .first()
        )

        if chat is None:
            return None

        user_message = ChatService.add_message(
            db=db,
            chat_id=payload.chat_id,
            user_id=user.id,
            role="user",
            content=payload.content,
        )

        from app.services.ai_service import ai_service

        reply = await ai_service.smart_reply(payload.content)

        assistant_message = ChatService.add_message(
            db=db,
            chat_id=payload.chat_id,
            user_id=user.id,
            role="assistant",
            content=reply,
        )

        return assistant_message

    @staticmethod
    def get_chat_messages(
        db: Session,
        chat_id: int,
        user: User,
        skip: int = 0,
        limit: int = 50,
    ):
        chat = (
            db.query(Chat)
            .filter(Chat.id == chat_id, Chat.user_id == user.id)
            .first()
        )

        if chat is None:
            return []

        return (
            db.query(Message)
            .filter(Message.chat_id == chat_id)
            .order_by(Message.created_at.asc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_message(
        db: Session,
        message_id: int,
        user: User,
    ):
        return (
            db.query(Message)
            .join(Chat)
            .filter(
                Message.id == message_id,
                Chat.user_id == user.id,
            )
            .first()
        )

    @staticmethod
    def update_message(
        db: Session,
        message_id: int,
        payload: MessageUpdate,
        user: User,
    ):
        message = ChatService.get_message(
            db=db,
            message_id=message_id,
            user=user,
        )

        if message is None:
            return None

        message.content = payload.content
        db.commit()
        db.refresh(message)

        return message

    @staticmethod
    def delete_message(
        db: Session,
        message_id: int,
        user: User,
    ) -> bool:
        message = ChatService.get_message(
            db=db,
            message_id=message_id,
            user=user,
        )

        if message is None:
            return False

        db.delete(message)
        db.commit()

        return True

    @staticmethod
    async def regenerate_ai_reply(
        db: Session,
        message_id: int,
        user: User,
    ):
        message = ChatService.get_message(
            db=db,
            message_id=message_id,
            user=user,
        )

        if message is None:
            return None

        from app.services.ai_service import ai_service

        reply = await ai_service.smart_reply(message.content)

        message.role = "assistant"
        message.content = reply
        db.commit()
        db.refresh(message)

        return message

    @staticmethod
    def toggle_favorite(
        db: Session,
        message_id: int,
        user: User,
    ):
        message = ChatService.get_message(
            db=db,
            message_id=message_id,
            user=user,
        )

        if message is None:
            return None

        return message

    # ==========================================================
    # Archive Chat
    # ==========================================================

    @staticmethod
    def archive_chat(
        db: Session,
        chat_id: int,
        owner: User,
    ):
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
        return ChatService.get_chat(
            db=db,
            chat_id=chat_id,
            owner=owner,
        )