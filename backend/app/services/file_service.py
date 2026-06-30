from pathlib import Path
import shutil
from uuid import uuid4

from fastapi import HTTPException, UploadFile


class FileService:
    """
    Handles file uploads and deletions.
    """

    UPLOAD_DIR = Path("uploads")

    @classmethod
    def _ensure_upload_dir(cls):
        cls.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    @classmethod
    async def save_file(cls, file: UploadFile) -> dict:
        cls._ensure_upload_dir()

        extension = Path(file.filename).suffix
        filename = f"{uuid4().hex}{extension}"

        destination = cls.UPLOAD_DIR / filename

        with destination.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "filename": filename,
            "original_filename": file.filename,
            "content_type": file.content_type,
            "path": str(destination),
        }

    @classmethod
    def delete_file(cls, filename: str) -> bool:
        file_path = cls.UPLOAD_DIR / filename

        if not file_path.exists():
            raise HTTPException(
                status_code=404,
                detail="File not found.",
            )

        file_path.unlink()

        return True

    @classmethod
    def file_exists(cls, filename: str) -> bool:
        return (cls.UPLOAD_DIR / filename).exists()

    @classmethod
    def get_file_path(cls, filename: str) -> Path:
        return cls.UPLOAD_DIR / filename