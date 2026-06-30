from __future__ import annotations

import time
import logging
from fastapi import Request

logger = logging.getLogger("swiftreply")


async def logging_middleware(request: Request, call_next):
    """
    Logs all incoming requests with execution time.
    """

    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time

    logger.info(
        f"{request.method} {request.url.path} "
        f"status={response.status_code} "
        f"time={process_time:.4f}s"
    )

    return response