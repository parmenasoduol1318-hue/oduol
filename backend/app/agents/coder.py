from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class CoderAgent:
    """
    Coder Agent

    Responsibilities
    ----------------
    • Generate production-ready code
    • Debug code
    • Refactor code
    • Explain code
    • Build APIs
    • Database design
    • Architecture suggestions
    • Code review
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        context: dict[str, Any] | None = None,
        language: str = "python",
        temperature: float = 0.3,
    ) -> str:
        final_prompt = f"Language: {language}\n\n{prompt}"

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.chat(
            prompt=final_prompt,
            system_prompt=SYSTEM_PROMPTS["coder"],
            temperature=temperature,
        )

    async def generate_api(
        self,
        requirement: str,
    ) -> str:
        return await self.run(
            f"""
Create a production-ready FastAPI endpoint.

Requirement:
{requirement}

Include:
- Router
- Schemas
- Service layer
- Error handling
- Validation
"""
        )

    async def debug_code(
        self,
        code: str,
        error: str,
    ) -> str:
        return await self.run(
            f"""
Debug the following code.

Code:
{code}

Error:
{error}

Provide:
- Root cause
- Fix
- Improved version
"""
        )

    async def refactor(
        self,
        code: str,
    ) -> str:
        return await self.run(
            f"""
Refactor this code for production use.

Code:
{code}

Improve:
- Readability
- Performance
- Structure
- Best practices
"""
        )

    async def explain(
        self,
        code: str,
    ) -> str:
        return await self.run(
            f"""
Explain this code clearly.

Code:
{code}
"""
        )

    async def design_system(
        self,
        idea: str,
    ) -> str:
        return await self.run(
            f"""
Design a scalable system architecture.

Idea:
{idea}

Include:
- Architecture diagram (text)
- Components
- Database design
- APIs
- Scaling strategy
"""
        )

    async def database_schema(
        self,
        requirement: str,
    ) -> str:
        return await self.run(
            f"""
Design a database schema.

Requirement:
{requirement}

Include:
- Tables
- Fields
- Relationships
- Indexes
"""
        )

    async def review_code(
        self,
        code: str,
    ) -> str:
        return await self.run(
            f"""
Perform a professional code review.

Code:
{code}

Check:
- Bugs
- Security issues
- Performance
- Best practices
"""
        )