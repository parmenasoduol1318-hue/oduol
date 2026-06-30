from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class ResearcherAgent:
    """
    Research Agent

    Responsibilities
    ----------------
    • Research topics
    • Summarize articles
    • Compare products/services
    • Literature reviews
    • Fact gathering
    • Report generation
    • SWOT analysis
    • Market research
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        context: dict[str, Any] | None = None,
        temperature: float = 0.2,
    ) -> str:
        final_prompt = prompt

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.chat(
            prompt=final_prompt,
            system_prompt=SYSTEM_PROMPTS["researcher"],
            temperature=temperature,
        )

    async def research_topic(
        self,
        topic: str,
        depth: str = "comprehensive",
    ) -> str:
        return await self.run(
            f"""
Conduct a {depth} research report on:

{topic}

Include:

- Executive Summary
- Background
- Current State
- Key Findings
- Opportunities
- Challenges
- Future Outlook
- References
"""
        )

    async def summarize_article(
        self,
        article: str,
    ) -> str:
        return await self.run(
            f"""
Summarize the following article.

{article}

Provide:

- Executive summary
- Key points
- Important statistics
- Actionable insights
"""
        )

    async def compare(
        self,
        item_a: str,
        item_b: str,
    ) -> str:
        return await self.run(
            f"""
Compare the following.

A:
{item_a}

B:
{item_b}

Compare:

- Features
- Advantages
- Disadvantages
- Cost
- Performance
- Best use cases
- Recommendation
"""
        )

    async def market_research(
        self,
        business: str,
    ) -> str:
        return await self.run(
            f"""
Perform market research for:

{business}

Include:

- Market size
- Competitors
- Opportunities
- Risks
- Trends
- Recommendations
"""
        )

    async def swot_analysis(
        self,
        subject: str,
    ) -> str:
        return await self.run(
            f"""
Perform a SWOT analysis for:

{subject}
"""
        )

    async def literature_review(
        self,
        topic: str,
    ) -> str:
        return await self.run(
            f"""
Create a literature review on:

{topic}

Include:

- Existing research
- Gaps
- Conclusions
"""
        )

    async def fact_check(
        self,
        statement: str,
    ) -> str:
        return await self.run(
            f"""
Fact-check the following statement.

Statement:

{statement}

Provide:

- Accuracy assessment
- Evidence
- Confidence level
- Conclusion
"""
        )

    async def generate_report(
        self,
        subject: str,
    ) -> str:
        return await self.run(
            f"""
Generate a professional report on:

{subject}

Include:

- Title
- Executive summary
- Findings
- Analysis
- Recommendations
- Conclusion
"""
        )
        