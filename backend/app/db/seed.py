from sqlalchemy.orm import Session

from app.auth.passwords import PasswordHandler
from app.models.user import User


password_handler = PasswordHandler()


def seed_database(db: Session) -> None:
    """
    Seed initial admin user and base data.
    """

    admin_email = "admin@swiftreply.com"

    existing_admin = (
        db.query(User)
        .filter(User.email == admin_email)
        .first()
    )

    if existing_admin:
        return

    admin = User(
        email=admin_email,
        username="admin",
        full_name="System Administrator",
        hashed_password=password_handler.hash_password("admin123"),
        is_active=True,
        is_verified=True,
        is_admin=True,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)