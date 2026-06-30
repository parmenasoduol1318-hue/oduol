from __future__ import annotations

from typing import Any

from app.agents.copilot import CopilotAgent
from app.ai.tools import AITools


class AIWorkflows:
    """
    High-level AI workflows that combine multiple agents/tools.
    """

    def __init__(self) -> None:
        self.copilot = CopilotAgent()
        self.tools = AITools()

    # =========================================================
    # Chat Workflow
    # =========================================================

    async def chat(
        self,
        message: str,
        context: dict[str, Any] | None = None,
    ) -> str:
        prompt = self.tools.build_chat_prompt(message, context)
        return await self.copilot.chat(prompt)

    # =========================================================
    # Smart Reply Workflow
    # =========================================================

    async def smart_reply(self, message: str) -> str:
        intent_prompt = f"""
Analyze this message and respond appropriately:

Message:
{message}

Return a helpful, concise reply.
"""
        return await self.copilot.chat(intent_prompt)

    # =========================================================
    # Writing Workflow
    # =========================================================

    async def write_content(
        self,
        topic: str,
        style: str = "blog",
    ) -> str:
        if style == "blog":
            return await self.copilot.write(topic)

        if style == "email":
            return await self.copilot.write_email(
                subject="Generated Email",
                purpose=topic,
            )

        return await self.copilot.write(topic)

    # =========================================================
    # Coding Workflow
    # =========================================================

    async def build_feature(self, requirement: str) -> str:
        prompt = self.tools.build_code_prompt(requirement)
        return await self.copilot.code(prompt)

    async def debug(self, code: str, error: str) -> str:
        return await self.copilot.code(f"Debug:\n{code}\n\nError:\n{error}")

    # =========================================================
    # Research Workflow
    # =========================================================

    async def research(self, topic: str) -> str:
        return await self.copilot.research(topic)

    # =========================================================
    # Planning Workflow
    # =========================================================

    async def plan(self, goal: str) -> str:
        return await self.copilot.plan(goal)

    # =========================================================
    # Vision Workflow
    # =========================================================

    async def analyze_image(self, prompt: str, image: bytes) -> str:
        return await self.copilot.analyze_image(prompt, image)

    # =========================================================
    # Voice Workflow
    # =========================================================

    async def process_voice(self, prompt: str, audio: bytes) -> str:
        return await self.copilot.voice_chat(prompt, audio)