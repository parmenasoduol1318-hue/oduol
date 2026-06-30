from __future__ import annotations

from typing import Any

from app.agents.coder import CoderAgent
from app.agents.planner import PlannerAgent
from app.agents.researcher import ResearcherAgent
from app.agents.scheduler import SchedulerAgent
from app.agents.vision import VisionAgent
from app.agents.voice import VoiceAgent
from app.agents.writer import WriterAgent

from app.ai.openai_client import OpenAIClient


class CopilotAgent:
    """
    Main AI Orchestrator.

    Routes requests to the appropriate specialized agent while also
    supporting direct conversations with the language model.
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

        self.writer = WriterAgent()
        self.coder = CoderAgent()
        self.planner = PlannerAgent()
        self.researcher = ResearcherAgent()
        self.scheduler = SchedulerAgent()
        self.vision = VisionAgent()
        self.voice = VoiceAgent()

    # =====================================================
    # General Chat
    # =====================================================

    async def chat(
        self,
        prompt: str,
        system_prompt: str | None = None,
        temperature: float = 0.7,
    ) -> str:
        return await self.client.chat(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=temperature,
        )

    # =====================================================
    # Agent Router
    # =====================================================

    async def execute(
        self,
        agent: str,
        prompt: str,
        **kwargs: Any,
    ):
        agent = agent.lower()

        if agent == "writer":
            return await self.writer.run(prompt, **kwargs)

        if agent == "coder":
            return await self.coder.run(prompt, **kwargs)

        if agent == "planner":
            return await self.planner.run(prompt, **kwargs)

        if agent == "researcher":
            return await self.researcher.run(prompt, **kwargs)

        if agent == "scheduler":
            return await self.scheduler.run(prompt, **kwargs)

        if agent == "vision":
            return await self.vision.run(prompt, **kwargs)

        if agent == "voice":
            return await self.voice.run(prompt, **kwargs)

        return await self.chat(prompt)

    # =====================================================
    # Convenience Methods
    # =====================================================

    async def write(self, prompt: str):
        return await self.writer.run(prompt)

    async def code(self, prompt: str):
        return await self.coder.run(prompt)

    async def plan(self, prompt: str):
        return await self.planner.run(prompt)

    async def research(self, prompt: str):
        return await self.researcher.run(prompt)

    async def schedule(self, prompt: str):
        return await self.scheduler.run(prompt)

    async def analyze_image(self, prompt: str, image: bytes | None = None):
        return await self.vision.run(prompt, image=image)

    async def voice_chat(self, prompt: str, audio: bytes | None = None):
        return await self.voice.run(prompt, audio=audio)