from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import (
    get_db,
    get_current_user,
)

from app.models.chat import Chat
from app.models.user import User

from app.schemas.chat import (
    ChatCreate,
    ChatUpdate,
    ChatResponse,
)

from app.services.chat_service import ChatService

router = APIRouter()


# ==========================================================
# Create Chat
# ==========================================================

@router.post(
    "/",
    response_model=ChatResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_chat(
    payload: ChatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ChatService.create_chat(
        db=db,
        owner=current_user,
        payload=payload,
    )


# ==========================================================
# Get My Chats
# ==========================================================

@router.get(
    "/",
    response_model=List[ChatResponse],
)
def get_my_chats(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ChatService.get_user_chats(
        db=db,
        owner=current_user,
        skip=skip,
        limit=limit,
    )


# ==========================================================
# Get Chat
# ==========================================================

@router.get(
    "/{chat_id}",
    response_model=ChatResponse,
)
def get_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chat = ChatService.get_chat(
        db=db,
        chat_id=chat_id,
        owner=current_user,
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    return chat


# ==========================================================
# Update Chat
# ==========================================================

@router.put(
    "/{chat_id}",
    response_model=ChatResponse,
)
def update_chat(
    chat_id: int,
    payload: ChatUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chat = ChatService.update_chat(
        db=db,
        chat_id=chat_id,
        owner=current_user,
        payload=payload,
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    return chat


# ==========================================================
# Delete Chat
# ==========================================================

@router.delete(
    "/{chat_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = ChatService.delete_chat(
        db=db,
        chat_id=chat_id,
        owner=current_user,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    return


# ==========================================================
# Archive Chat
# ==========================================================

@router.patch(
    "/{chat_id}/archive",
    response_model=ChatResponse,
)
def archive_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chat = ChatService.archive_chat(
        db=db,
        chat_id=chat_id,
        owner=current_user,
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    return chat


# ==========================================================
# Unarchive Chat
# ==========================================================

@router.patch(
    "/{chat_id}/unarchive",
    response_model=ChatResponse,
)
def unarchive_chat(
    chat_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    chat = ChatService.unarchive_chat(
        db=db,
        chat_id=chat_id,
        owner=current_user,
    )

    if chat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    return chat