from __future__ import annotations

import time
from collections import defaultdict
from fastapi import Request, HTTPException, status


class RateLimitMiddleware:
    """
    Simple in-memory rate limiter (per IP).
    Production upgrade: Redis-based limiter.
    """

    def __init__(self, max_requests: int = 60, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: dict[str, list[float]] = defaultdict(list)

    async def __call__(self, request: Request, call_next):
        client_ip = request.client.host if request.client else "unknown"
        now = time.time()

        # Remove old timestamps
        window_start = now - self.window_seconds
        self.requests[client_ip] = [
            t for t in self.requests[client_ip] if t > window_start
        ]

        # Check limit
        if len(self.requests[client_ip]) >= self.max_requests:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded. Try again later.",
            )

        # Add request timestamp
        self.requests[client_ip].append(now)

        response = await call_next(request)
        return response