from __future__ import annotations

import uuid
from datetime import datetime, timezone
from typing import Any


class Helpers:
    """
    General helper utilities for the application.
    """

    # =========================================================
    # IDs
    # =========================================================

    def generate_uuid(self) -> str:
        return str(uuid.uuid4())

    # =========================================================
    # Time
    # =========================================================

    def now_utc(self) -> datetime:
        return datetime.now(timezone.utc)

    def timestamp(self) -> int:
        return int(datetime.now(timezone.utc).timestamp())

    # =========================================================
    # Dict Utilities
    # =========================================================

    def safe_get(self, data: dict[str, Any], key: str, default: Any = None) -> Any:
        return data.get(key, default)

    def merge_dicts(self, a: dict[str, Any], b: dict[str, Any]) -> dict[str, Any]:
        return {**a, **b}

    # =========================================================
    # String Utilities
    # =========================================================

    def slugify(self, text: str) -> str:
        return (
            text.lower()
            .strip()
            .replace(" ", "-")
            .replace("_", "-")
        )

    def truncate(self, text: str, length: int = 100) -> str:
        return text if len(text) <= length else text[:length] + "..."

    # =========================================================
    # List Utilities
    # =========================================================

    def unique_list(self, items: list[Any]) -> list[Any]:
        return list(dict.fromkeys(items))