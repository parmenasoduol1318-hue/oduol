from __future__ import annotations

import re


class Validators:
    """
    Input validation utilities.
    """

    EMAIL_REGEX = re.compile(r"^[\w\.-]+@[\w\.-]+\.\w+$")
    USERNAME_REGEX = re.compile(r"^[a-zA-Z0-9_]{3,30}$")

    # =========================================================
    # Email
    # =========================================================

    def is_valid_email(self, email: str) -> bool:
        return bool(self.EMAIL_REGEX.match(email))

    # =========================================================
    # Username
    # =========================================================

    def is_valid_username(self, username: str) -> bool:
        return bool(self.USERNAME_REGEX.match(username))

    # =========================================================
    # Password Strength
    # =========================================================

    def is_strong_password(self, password: str) -> bool:
        """
        Basic password strength rules:
        - At least 6 characters
        - Contains letters and numbers
        """
        if len(password) < 6:
            return False

        has_letter = any(c.isalpha() for c in password)
        has_number = any(c.isdigit() for c in password)

        return has_letter and has_number

    # =========================================================
    # Phone (basic)
    # =========================================================

    def is_valid_phone(self, phone: str) -> bool:
        return phone.isdigit() and 9 <= len(phone) <= 15