from typing import Annotated

from fastapi import Depends
from fastapi import HTTPException
from fastapi import Security
from fastapi.security import HTTPAuthorizationCredentials
from fastapi.security import HTTPBearer
from jose import JWTError
from jose import jwt
from sqlalchemy.orm import Session

from app.auth.permissions import (
    require_active_user,
    require_admin,
)

from app.core.config import settings

from app.db.database import SessionLocal

from app.models.user import User


# ==========================================================
# Database Dependency
# ==========================================================

def get_db():
    """
    Creates a database session for each request
    and automatically closes it afterwards.
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


DBSession = Annotated[Session, Depends(get_db)]


# ==========================================================
# JWT Security
# ==========================================================

security = HTTPBearer(auto_error=True)


# ==========================================================
# Current User
# ==========================================================

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
    db: Session = Depends(get_db),
) -> User:

    token = credentials.credentials

    credentials_exception = HTTPException(
        status_code=401,
        detail="Invalid or expired access token.",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = (
        db.query(User)
        .filter(User.id == int(user_id))
        .first()
    )

    if user is None:
        raise credentials_exception

    return user


CurrentUser = Annotated[
    User,
    Depends(get_current_user),
]


# ==========================================================
# Active User
# ==========================================================

def get_current_active_user(
    current_user: CurrentUser,
) -> User:

    return require_active_user(current_user)


CurrentActiveUser = Annotated[
    User,
    Depends(get_current_active_user),
]


# ==========================================================
# Admin User
# ==========================================================

def get_current_admin(
    current_user: CurrentUser,
) -> User:

    return require_admin(current_user)


CurrentAdmin = Annotated[
    User,
    Depends(get_current_admin),
]