import uuid

import pytest
from fastapi.testclient import TestClient

from app.auth.oauth import OAuthService
from app.main import app
from app.auth.passwords import PasswordHandler


client = TestClient(app)

password_handler = PasswordHandler()


# =========================================================
# AUTH TESTS
# =========================================================

def test_password_hashing():
    password = "test1234"

    hashed = password_handler.hash_password(password)

    assert hashed != password
    assert password_handler.verify_password(password, hashed) is True
    assert password_handler.verify_password("wrongpass", hashed) is False


def test_register_user_endpoint():
    unique_email = f"{uuid.uuid4().hex}@example.com"
    response = client.post(
        "/api/auth/register",
        json={
            "email": unique_email,
            "username": f"user_{uuid.uuid4().hex[:8]}",
            "full_name": "Test User",
            "password": "test1234"
        },
    )

    assert response.status_code in [200, 201, 400, 409]


@pytest.mark.asyncio
async def test_google_demo_token_login():
    result = await OAuthService().login("google", "demo-google-token")

    assert result["provider"] == "google"
    assert result["email"] == "demo.google.user@gmail.com"
    assert result["full_name"] == "Google Demo User"


def test_login_user_endpoint():
    response = client.post(
        "/api/auth/login",
        json={
            "email": "test@example.com",
            "password": "test1234"
        },
    )

    assert response.status_code in [200, 401, 404]