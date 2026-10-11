from fastapi.testclient import TestClient

from app.db.mongo import ping_database
from app.main import app


def test_health_returns_ok_when_database_is_reachable(client: TestClient) -> None:
    # Swap the real MongoDB ping for a stub so the test is fast and offline.
    app.dependency_overrides[ping_database] = lambda: True

    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "ok"}
