from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class PlannerAgent:
    """
    Planner Agent

    Responsibilities
    ----------------
    • Goal planning
    • Daily schedules
    • Study plans
    • Project roadmaps
    • Business strategies
    • Travel itineraries
    • Task prioritization
    • Milestone generation
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        context: dict[str, Any] | None = None,
        temperature: float = 0.4,
    ) -> str:
        """
        Execute planning task.
        """

        final_prompt = prompt

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.chat(
            prompt=final_prompt,
            system_prompt=SYSTEM_PROMPTS["planner"],
            temperature=temperature,
        )

    async def create_project_plan(
        self,
        project: str,
    ) -> str:
        return await self.run(
            f"""
Create a detailed software project roadmap.

Project:
{project}

Include:

- Objectives
- Milestones
- Features
- Timeline
- Risks
- Resources
- Deliverables
"""
        )

    async def create_study_plan(
        self,
        subject: str,
        duration: str,
    ) -> str:
        return await self.run(
            f"""
Create a complete study plan.

Subject:
{subject}

Duration:
{duration}

Include:

- Daily timetable
- Weekly goals
- Revision
- Practice
- Assessments
"""
        )

    async def daily_schedule(
        self,
        goals: str,
    ) -> str:
        return await self.run(
            f"""
Create an optimized daily schedule.

Goals:

{goals}
"""
        )

    async def weekly_schedule(
        self,
        goals: str,
    ) -> str:
        return await self.run(
            f"""
Generate a productive weekly plan.

Goals:

{goals}
"""
        )

    async def business_plan(
        self,
        business: str,
    ) -> str:
        return await self.run(
            f"""
Create a professional business strategy.

Business:

{business}
"""
        )

    async def travel_plan(
        self,
        destination: str,
        days: int,
    ) -> str:
        return await self.run(
            f"""
Plan a {days}-day trip.

Destination:

{destination}
"""
        )

    async def prioritize_tasks(
        self,
        tasks: list[str],
    ) -> str:
        formatted = "\n".join(
            f"- {task}" for task in tasks
        )

        return await self.run(
            f"""
Prioritize the following tasks.

{formatted}

Explain why.
"""
        )

    async def roadmap(
        self,
        objective: str,
    ) -> str:
        return await self.run(
            f"""
Create a milestone roadmap.

Objective:

{objective}
"""
        )