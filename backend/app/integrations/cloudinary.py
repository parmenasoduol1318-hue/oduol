from __future__ import annotations

import cloudinary
import cloudinary.uploader

from app.core.config import settings


class CloudinaryClient:
    """
    Cloudinary integration for image/file uploads.
    """

    def __init__(self) -> None:
        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
            secure=True,
        )

    # =========================================================
    # Upload Image/File
    # =========================================================

    def upload_file(
        self,
        file_path: str,
        folder: str = "swiftreply",
        resource_type: str = "auto",
    ) -> dict:
        return cloudinary.uploader.upload(
            file_path,
            folder=folder,
            resource_type=resource_type,
        )

    # =========================================================
    # Delete File
    # =========================================================

    def delete_file(self, public_id: str) -> dict:
        return cloudinary.uploader.destroy(public_id)