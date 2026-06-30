from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class WriterAgent:
    """
    SwiftReply Writer Agent

    Responsibilities
    ----------------
    • Articles
    • Blog posts
    • Emails
    • Essays
    • Reports
    • Social media content
    • Marketing copy
    • Documentation
    • Proofreading
    • Rewriting
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        context: dict[str, Any] | None = None,
        temperature: float = 0.7,
    ) -> str:
        """
        Execute a writing task.
        """
        final_prompt = prompt

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.chat(
            prompt=final_prompt,
            system_prompt=SYSTEM_PROMPTS["writer"],
            temperature=temperature,
        )

    async def write_article(
        self,
        topic: str,
        words: int = 1500,
    ) -> str:
        return await self.run(
            f"""
Write a professional article.

Topic:
{topic}

Requirements

- Around {words} words
- SEO optimized
- Clear headings
- Introduction
- Body
- Conclusion
- Professional language
"""
        )

    async def write_blog(
        self,
        topic: str,
        words: int = 1500,
    ) -> str:
        return await self.run(
            f"""
Write a blog post.

Topic:
{topic}

Requirements

- Around {words} words
- Friendly tone
- SEO optimized
- Engaging title
- Subheadings
- Conclusion
"""
        )

    async def write_email(
        self,
        subject: str,
        purpose: str,
    ) -> str:
        return await self.run(
            f"""
Write a professional email.

Subject:
{subject}

Purpose:
{purpose}
"""
        )

    async def rewrite(
        self,
        text: str,
        style: str = "professional",
    ) -> str:
        return await self.run(
            f"""
Rewrite the following text.

Style:
{style}

Text:
{text}
"""
        )

    async def summarize(
        self,
        text: str,
    ) -> str:
        return await self.run(
            f"""
Summarize the following text.

{text}
"""
        )

    async def proofread(
        self,
        text: str,
    ) -> str:
        return await self.run(
            f"""
Proofread the following text.

Correct:

- Grammar
- Spelling
- Punctuation
- Clarity
- Readability

Text:

{text}
"""
        )

    async def translate(
        self,
        text: str,
        language: str,
    ) -> str:
        return await self.run(
            f"""
Translate the following text into {language}.

{text}
"""
        )

    async def social_post(
        self,
        topic: str,
        platform: str,
    ) -> str:
        return await self.run(
            f"""
Write a {platform} post.

Topic:

{topic}

Requirements

- High engagement
- Professional
- Include hashtags where appropriate
"""
        )

    async def documentation(
        self,
        topic: str,
    ) -> str:
        return await self.run(
            f"""
Write technical documentation.

Topic:

{topic}

Include

- Overview
- Features
- Installation
- Usage
- Examples
- Troubleshooting
"""
        )

    async def marketing_copy(
        self,
        product: str,
    ) -> str:
        return await self.run(
            f"""
Write persuasive marketing copy.

Product:

{product}

Include

- Headline
- Benefits
- Features
- Call to action
"""
        )