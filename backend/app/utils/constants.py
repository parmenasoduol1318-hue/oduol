from __future__ import annotations


class Roles:
    """
    System-wide user roles.
    """
    USER = "user"
    ADMIN = "admin"
    SYSTEM = "system"


class ChatRoles:
    """
    Roles used inside chat messages.
    """
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class PaymentStatus:
    """
    Payment lifecycle states.
    """
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"


class SubscriptionPlans:
    """
    Available subscription plans.
    """
    FREE = "free"
    PRO = "pro"
    ENTERPRISE = "enterprise"


class NotificationTypes:
    """
    Notification severity/types.
    """
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    SUCCESS = "success"


class AIModels:
    """
    Default AI models used across the system.
    """
    CHAT_MODEL = "gpt-4o-mini"
    EMBEDDING_MODEL = "text-embedding-3-small"


class Limits:
    """
    System constraints and quotas.
    """
    MAX_UPLOAD_SIZE_MB = 20
    MAX_CHAT_HISTORY = 100

    RATE_LIMIT_REQUESTS = 60
    RATE_LIMIT_WINDOW_SECONDS = 60