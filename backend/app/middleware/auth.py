from __future__ import annotations

from fastapi import Request, HTTPException, status

from app.auth.jwt import JWTHandler


jwt_handler = JWTHandler()


async def auth_middleware(request: Request, call_next):
    """
    JWT authentication middleware.
    Attaches user payload to request.state.user if valid token exists.
    """

    if request.url.path in ["/", "/docs", "/openapi.json"]:
        return await call_next(request)

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return await call_next(request)

    try:
        scheme, token = auth_header.split()

        if scheme.lower() != "bearer":
            raise ValueError("Invalid scheme")

        payload = jwt_handler.decode_token(token)

        if payload:
            request.state.user = payload

    except Exception:
        request.state.user = None

    return await call_next(request)