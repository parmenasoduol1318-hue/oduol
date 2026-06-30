from __future__ import annotations

from typing import Any

from app.ai.openai_client import OpenAIClient
from app.ai.prompts import SYSTEM_PROMPTS


class VisionAgent:
    """
    Vision Agent

    Responsibilities
    ----------------
    • Image understanding
    • OCR (text extraction from images)
    • Object description
    • Diagram interpretation
    • UI analysis
    • Visual Q&A
    """

    def __init__(self) -> None:
        self.client = OpenAIClient()

    async def run(
        self,
        prompt: str,
        image: bytes | None = None,
        context: dict[str, Any] | None = None,
        temperature: float = 0.2,
    ) -> str:
        """
        Analyze image + prompt.
        """
        final_prompt = prompt

        if context:
            final_prompt += f"\n\nContext:\n{context}"

        return await self.client.vision(
            prompt=final_prompt,
            image=image,
            system_prompt=SYSTEM_PROMPTS["vision"],
            temperature=temperature,
        )

    async def describe_image(self, prompt: str, image: bytes) -> str:
        return await self.run(
            prompt=f"Describe this image in detail: {prompt}",
            image=image,
        )

    async def extract_text(self, image: bytes) -> str:
        return await self.run(
            prompt="Extract all readable text from this image accurately.",
            image=image,
        )

    async def analyze_ui(self, image: bytes) -> str:
        return await self.run(
            prompt="Analyze this UI design and explain structure, layout, and usability.",
            image=image,
        )

    async def solve_visual_problem(self, prompt: str, image: bytes) -> str:
        return await self.run(
            prompt=f"Solve the problem shown in the image: {prompt}",
            image=image,
        )

    async def compare_images(
        self,
        image_a: bytes,
        image_b: bytes,
    ) -> str:
        return await self.run(
            prompt="Compare these two images in detail.",
            image=image_a,
            context={"second_image": "attached separately"},
        )