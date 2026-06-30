from __future__ import annotations

from sqlalchemy.orm import Session

from app.ai.workflows import AIWorkflows
from app.models.image import Image


class ImageService:
    """
    Handles image generation and image analysis workflows.
    """

    def __init__(self) -> None:
        self.workflows = AIWorkflows()

    # =========================================================
    # Image Analysis
    # =========================================================

    async def analyze_image(
        self,
        prompt: str,
        image: bytes,
    ) -> str:
        return await self.workflows.analyze_image(prompt, image)

    # =========================================================
    # Image Generation Record
    # =========================================================

    def save_image(
        self,
        db: Session,
        user_id: int,
        url: str,
        prompt: str | None = None,
        provider: str = "openai",
    ) -> Image:
        image = Image(
            user_id=user_id,
            url=url,
            prompt=prompt,
            provider=provider,
        )

        db.add(image)
        db.commit()
        db.refresh(image)
        return image

    def get_user_images(self, db: Session, user_id: int) -> list[Image]:
        return (
            db.query(Image)
            .filter(Image.user_id == user_id)
            .order_by(Image.created_at.desc())
            .all()
        )