import pytest
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock, patch

from app.services.ai_service import AIService


@pytest.mark.asyncio
async def test_ai_chat_contract():
    ai_service = AIService()
    mock_db = Mock()
    mock_user = SimpleNamespace(id=42)
    payload = SimpleNamespace(prompt="Hello there", chat_id=7)

    with patch.object(ai_service.chat_service, "add_message") as mock_add_message, \
         patch.object(ai_service.workflows, "chat", new_callable=AsyncMock) as mock_workflow_chat:
        mock_workflow_chat.return_value = "Hi from AI"

        response = await ai_service.chat(
            db=mock_db,
            user=mock_user,
            payload=payload,
        )

        assert response["response"] == "Hi from AI"
        assert response["chat_id"] == 7
        assert mock_add_message.call_count == 2
        mock_workflow_chat.assert_awaited_once_with("Hello there")


@pytest.mark.asyncio
async def test_ai_chat():
    ai_service = AIService()

    with patch("app.ai.workflows.AIWorkflows.chat", new_callable=AsyncMock) as mock_chat:
        mock_chat.return_value = "Hello from AI"

        response = await ai_service.smart_reply("Hello")

        assert response == "Hello from AI"
        mock_chat.assert_called_once()


@pytest.mark.asyncio
async def test_ai_write():
    ai_service = AIService()

    with patch("app.ai.workflows.AIWorkflows.write_content", new_callable=AsyncMock) as mock_write:
        mock_write.return_value = "Generated article"

        response = await ai_service.write("AI in education")

        assert response == "Generated article"
        mock_write.assert_called_once()


@pytest.mark.asyncio
async def test_ai_plan():
    ai_service = AIService()

    with patch("app.ai.workflows.AIWorkflows.plan", new_callable=AsyncMock) as mock_plan:
        mock_plan.return_value = "Step 1: Research, Step 2: Build"

        response = await ai_service.plan("Build startup")

        assert response == "Step 1: Research, Step 2: Build"
        mock_plan.assert_called_once()