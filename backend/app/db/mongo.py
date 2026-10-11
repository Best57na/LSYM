from typing import Any

from fastapi import Request
from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase
from pymongo.errors import PyMongoError

from app.core.config import Settings

type MongoDocument = dict[str, Any]


def create_mongo_client(settings: Settings) -> AsyncMongoClient[MongoDocument]:
    """Create the client. This does not open a connection yet; PyMongo connects lazily
    on the first operation and keeps a connection pool for the app's lifetime."""
    return AsyncMongoClient(
        settings.mongodb_uri.get_secret_value(),
        serverSelectionTimeoutMS=settings.mongodb_timeout_ms,
        appname="lsym-backend",
    )


def get_db(request: Request) -> AsyncDatabase[MongoDocument]:
    """FastAPI dependency: the database handle created in main.lifespan."""
    return request.app.state.db


async def ping_database(request: Request) -> bool:
    """FastAPI dependency: True if MongoDB answers a ping."""
    client: AsyncMongoClient[MongoDocument] = request.app.state.mongo_client
    try:
        await client.admin.command("ping")
    except PyMongoError:
        return False
    return True
