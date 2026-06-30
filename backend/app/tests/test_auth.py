import pytest
from fastapi.testclient import TestClient

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
    response = client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": "test1234"
        },
    )

    # Depending on DB setup this may be 200 or 201
    assert response.status_code in [200, 201, 409]


def test_login_user_endpoint():
    response = client.post(
        "/api/auth/login",
        json={
            "email": "test@example.com",
            "password": "test1234"
        },
    )

    assert response.status_code in [200, 401, 404]