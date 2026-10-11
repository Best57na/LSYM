import os
from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient

# Tests must not depend on a developer's .env or a live database.
# Set before importing the app, because settings are read at import time.
os.environ.setdefault("MONGODB_URI", "mongodb://localhost:27017")

from app.main import app  # noqa: E402


@pytest.fixture
def client() -> Iterator[TestClient]:
    """A test client with the app's startup/shutdown (lifespan) running.
    Dependency overrides set in a test are cleared afterwards."""
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
