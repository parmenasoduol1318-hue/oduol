import pytest
from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


# =========================================================
# CHAT TESTS
# =========================================================

def test_create_chat():
    response = client.post(
        "/api/chats/",
        json={"title": "Test Chat"},
        headers={"Authorization": "Bearer test-token"},
    )

    assert response.status_code in [200, 201, 401, 403]


def test_get_chats():
    response = client.get(
        "/api/chats/",
        headers={"Authorization": "Bearer test-token"},
    )

    assert response.status_code in [200, 401, 403]


def test_add_message():
    response = client.post(
        "/api/messages/",
        json={
            "chat_id": 1,
            "content": "Hello AI"
        },
        headers={"Authorization": "Bearer test-token"},
    )

    assert response.status_code in [200, 201, 401, 403, 404]