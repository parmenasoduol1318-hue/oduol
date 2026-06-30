from __future__ import annotations

import logging
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

logger = logging.getLogger("swiftreply")


class ErrorHandlingMiddleware:
    """
    Global error handler middleware.
    """

    async def __call__(self, request: Request, call_next):
        try:
            return await call_next(request)

        except HTTPException as e:
            return JSONResponse(
                status_code=e.status_code,
                content={"detail": e.detail},
            )

        except Exception as e:
            logger.exception("Unhandled server error")

            return JSONResponse(
                status_code=500,
                content={
                    "detail": "Internal Server Error",
                    "error": str(e),
                },
            )