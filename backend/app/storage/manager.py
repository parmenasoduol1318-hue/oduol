from __future__ import annotations

import os
import uuid


class StorageManager:
    """
    Handles local file storage paths and cleanup.
    """

    BASE_DIR = "app/storage"

    def ensure_dirs(self) -> None:
        for folder in ["uploads", "generated", "temp"]:
            os.makedirs(os.path.join(self.BASE_DIR, folder), exist_ok=True)

    def generate_path(self, folder: str, filename: str) -> str:
        unique_name = f"{uuid.uuid4()}_{filename}"
        return os.path.join(self.BASE_DIR, folder, unique_name)