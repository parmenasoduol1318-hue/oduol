from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class SchedulerAgent:
    """
    Scheduler Agent

    Responsibilities
    ----------------
    • Daily schedules
    • Calendar planning
    • Task time allocation
    • Productivity optimization
    • Reminders structure
    • Event planning
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        context: dict[str, Any] | None = None,
        temperature: float = 0.4,
    ) -> str:
        final_prompt = prompt

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.chat(
            prompt=final_prompt,
            system_prompt=SYSTEM_PROMPTS["scheduler"],
            temperature=temperature,
        )

    async def daily_schedule(
        self,
        goals: str,
        wake_time: str = "07:00",
        sleep_time: str = "22:00",
    ) -> str:
        return await self.run(
            f"""
Create an optimized daily schedule.

Wake time: {wake_time}
Sleep time: {sleep_time}

Goals:
{goals}

Include:
- Time blocks
- Breaks
- Productivity optimization
- Priority tasks
"""
        )

    async def weekly_schedule(
        self,
        goals: str,
    ) -> str:
        return await self.run(
            f"""
Create a structured weekly schedule.

Goals:
{goals}

Include:
- Daily breakdown
- Focus areas
- Rest periods
- Milestones
"""
        )

    async def event_plan(
        self,
        event: str,
        attendees: int | None = None,
    ) -> str:
        return await self.run(
            f"""
Plan an event.

Event:
{event}

Attendees:
{attendees if attendees else "Not specified"}

Include:
- Timeline
- Tasks
- Resources
- Budget considerations
"""
        )

    async def task_optimizer(
        self,
        tasks: list[str],
    ) -> str:
        formatted = "\n".join(f"- {t}" for t in tasks)

        return await self.run(
            f"""
Optimize and prioritize tasks.

Tasks:
{formatted}

Include:
- Priority order
- Time estimates
- Dependencies
- Suggested schedule
"""
        )

    async def reminder_plan(
        self,
        activities: str,
    ) -> str:
        return await self.run(
            f"""
Create a reminder and alert schedule.

Activities:
{activities}

Include:
- Reminder times
- Frequency
- Importance levels
"""
        )

    async def productivity_plan(
        self,
        goal: str,
    ) -> str:
        return await self.run(
            f"""
Create a productivity optimization plan.

Goal:
{goal}

Include:
- Focus strategies
- Time management
- Tools
- Habits
"""
        )