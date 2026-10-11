from typing import Annotated

from fastapi import APIRouter, Depends

from app.db.mongo import ping_database
from app.schemas.health import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
async def health(db_ok: Annotated[bool, Depends(ping_database)]) -> HealthResponse:
    """Liveness check. Returns 200 while the API process is up; `database` reports
    whether MongoDB is reachable so a DB outage is visible without taking the API down."""
    return HealthResponse(status="ok", database="ok" if db_ok else "unreachable")
