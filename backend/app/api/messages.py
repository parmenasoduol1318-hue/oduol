from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import (
    get_db,
    get_current_user,
)

from app.models.user import User

from app.schemas.message import (
    MessageCreate,
    MessageUpdate,
    MessageResponse,
)

from app.services.chat_service import ChatService

router = APIRouter()


# ==========================================================
# Send Message
# ==========================================================

@router.post(
    "/",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
async def send_message(
    payload: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await ChatService.send_message(
        db=db,
        user=current_user,
        payload=payload,
    )

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat not found.",
        )

    return result


# ==========================================================
# Get Messages In Chat
# ==========================================================

@router.get(
    "/chat/{chat_id}",
    response_model=List[MessageResponse],
)
def get_chat_messages(
    chat_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=500),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ChatService.get_chat_messages(
        db=db,
        chat_id=chat_id,
        user=current_user,
        skip=skip,
        limit=limit,
    )


# ==========================================================
# Get Single Message
# ==========================================================

@router.get(
    "/{message_id}",
    response_model=MessageResponse,
)
def get_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    message = ChatService.get_message(
        db=db,
        message_id=message_id,
        user=current_user,
    )

    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found.",
        )

    return message


# ==========================================================
# Update Message
# ==========================================================

@router.put(
    "/{message_id}",
    response_model=MessageResponse,
)
def update_message(
    message_id: int,
    payload: MessageUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    message = ChatService.update_message(
        db=db,
        message_id=message_id,
        payload=payload,
        user=current_user,
    )

    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found.",
        )

    return message


# ==========================================================
# Delete Message
# ==========================================================

@router.delete(
    "/{message_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = ChatService.delete_message(
        db=db,
        message_id=message_id,
        user=current_user,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found.",
        )

    return


# ==========================================================
# Regenerate AI Reply
# ==========================================================

@router.post(
    "/{message_id}/regenerate",
)
async def regenerate_ai_reply(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await ChatService.regenerate_ai_reply(
        db=db,
        message_id=message_id,
        user=current_user,
    )

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found.",
        )

    return result


# ==========================================================
# Star / Favorite Message
# ==========================================================

@router.patch(
    "/{message_id}/favorite",
)
def favorite_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ChatService.toggle_favorite(
        db=db,
        message_id=message_id,
        user=current_user,
    )