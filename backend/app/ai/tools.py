from __future__ import annotations

from typing import Any


class AITools:
    """
    Lightweight tool registry for agent actions.

    This will later connect:
    - database queries
    - external APIs
    - internal services
    """

    # =========================================================
    # Text Utilities
    # =========================================================

    def clean_text(self, text: str) -> str:
        return text.strip()

    def word_count(self, text: str) -> int:
        return len(text.split())

    def truncate(self, text: str, max_words: int = 200) -> str:
        words = text.split()
        return " ".join(words[:max_words])

    # =========================================================
    # Intent Helpers
    # =========================================================

    def detect_language_hint(self, text: str) -> str:
        if any(word in text.lower() for word in ["hola", "bonjour", "ciao"]):
            return "non-en"
        return "en"

    def is_question(self, text: str) -> bool:
        return "?" in text

    # =========================================================
    # Prompt Builders
    # =========================================================

    def build_chat_prompt(
        self,
        message: str,
        context: dict[str, Any] | None = None,
    ) -> str:
        prompt = message

        if context:
            prompt += f"\n\nContext:\n{context}"

        return prompt

    def build_summary_prompt(self, text: str) -> str:
        return f"Summarize the following text:\n\n{text}"

    def build_code_prompt(self, requirement: str) -> str:
        return f"Write production-ready code for:\n\n{requirement}"

    # =========================================================
    # Validation Helpers
    # =========================================================

    def validate_required(self, data: dict[str, Any], fields: list[str]) -> bool:
        return all(field in data and data[field] for field in fields)

    def sanitize_input(self, text: str) -> str:
        return text.replace("<", "").replace(">", "")

    # =========================================================
    # Formatting Helpers
    # =========================================================

    def format_list(self, items: list[str]) -> str:
        return "\n".join(f"- {item}" for item in items)

    def format_key_value(self, data: dict[str, Any]) -> str:
        return "\n".join(f"{k}: {v}" for k, v in data.items())