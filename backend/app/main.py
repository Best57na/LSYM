from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import health
from app.core.config import get_settings
from app.db.mongo import create_mongo_client


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Runs once at startup (before `yield`) and once at shutdown (after `yield`)."""
    settings = get_settings()
    client = create_mongo_client(settings)
    app.state.mongo_client = client
    app.state.db = client[settings.mongodb_db_name]
    yield
    await client.close()


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="SlipWise API", version="0.1.0", lifespan=lifespan)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(health.router)
    return app


app = create_app()
