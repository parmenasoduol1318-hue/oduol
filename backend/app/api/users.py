from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.dependencies import (
    get_db,
    get_current_user,
    get_current_admin,
)

from app.models.user import User

from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse,
)

from app.services.auth_service import AuthService

router = APIRouter()


# ==========================================================
# Get Current User
# ==========================================================

@router.get(
    "/me",
    response_model=UserResponse,
)
def get_my_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user


# ==========================================================
# Update Current User
# ==========================================================

@router.put(
    "/me",
    response_model=UserResponse,
)
def update_my_profile(
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return AuthService.update_user(
        db=db,
        user=current_user,
        payload=payload,
    )


# ==========================================================
# Delete Current User
# ==========================================================

@router.delete(
    "/me",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_my_account(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    AuthService.delete_user(
        db=db,
        user=current_user,
    )


# ==========================================================
# Get User By ID (Admin)
# ==========================================================

@router.get(
    "/{user_id}",
    response_model=UserResponse,
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    return user


# ==========================================================
# Get All Users (Admin)
# ==========================================================

@router.get(
    "/",
    response_model=List[UserResponse],
)
def get_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return (
        db.query(User)
        .offset(skip)
        .limit(limit)
        .all()
    )


# ==========================================================
# Create User (Admin)
# ==========================================================

@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    return AuthService.register(
        db=db,
        user=payload,
    )


# ==========================================================
# Update User (Admin)
# ==========================================================

@router.put(
    "/{user_id}",
    response_model=UserResponse,
)
def update_user(
    user_id: int,
    payload: UserUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    return AuthService.update_user(
        db=db,
        user=user,
        payload=payload,
    )


# ==========================================================
# Delete User (Admin)
# ==========================================================

@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )

    AuthService.delete_user(
        db=db,
        user=user,
    )