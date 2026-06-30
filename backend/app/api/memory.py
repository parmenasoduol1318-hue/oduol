from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import (
    get_db,
    get_current_user,
)

from app.models.user import User

from app.schemas.ai import (
    MemoryCreate,
    MemoryUpdate,
    MemoryResponse,
)

from app.services.memory_service import MemoryService

router = APIRouter()


# ==========================================================
# Create Memory
# ==========================================================

@router.post(
    "/",
    response_model=MemoryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_memory(
    payload: MemoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await MemoryService.create_memory(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Get All Memories
# ==========================================================

@router.get(
    "/",
    response_model=list[MemoryResponse],
)
async def get_memories(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await MemoryService.get_memories(
        db=db,
        user=current_user,
        page=page,
        page_size=page_size,
    )


# ==========================================================
# Search Memories
# ==========================================================

@router.get("/search")
async def search_memories(
    q: str,
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await MemoryService.search_memories(
        db=db,
        user=current_user,
        query=q,
        limit=limit,
    )


# ==========================================================
# Get Memory
# ==========================================================

@router.get(
    "/{memory_id}",
    response_model=MemoryResponse,
)
async def get_memory(
    memory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    memory = await MemoryService.get_memory(
        db=db,
        user=current_user,
        memory_id=memory_id,
    )

    if memory is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found.",
        )

    return memory


# ==========================================================
# Update Memory
# ==========================================================

@router.put(
    "/{memory_id}",
    response_model=MemoryResponse,
)
async def update_memory(
    memory_id: int,
    payload: MemoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    memory = await MemoryService.update_memory(
        db=db,
        user=current_user,
        memory_id=memory_id,
        payload=payload,
    )

    if memory is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found.",
        )

    return memory


# ==========================================================
# Delete Memory
# ==========================================================

@router.delete("/{memory_id}")
async def delete_memory(
    memory_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    deleted = await MemoryService.delete_memory(
        db=db,
        user=current_user,
        memory_id=memory_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memory not found.",
        )

    return {
        "success": True,
        "message": "Memory deleted successfully.",
    }


# ==========================================================
# Clear All Memories
# ==========================================================

@router.delete("/")
async def clear_memories(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await MemoryService.clear_memories(
        db=db,
        user=current_user,
    )
    