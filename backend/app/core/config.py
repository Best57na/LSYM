from functools import lru_cache

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """App settings, read from environment variables (and backend/.env in development).

    Field names map to env vars case-insensitively: `mongodb_uri` <- MONGODB_URI.
    Pydantic validates and converts types at startup, so a bad value fails fast.
    """

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_env: str = "development"

    # SecretStr hides the value in logs and reprs; call .get_secret_value() to use it.
    mongodb_uri: SecretStr
    mongodb_db_name: str = "slipwise"
    mongodb_timeout_ms: int = 3000

    # Parsed from a JSON array in the env var, e.g. CORS_ORIGINS=["http://localhost:3000"]
    cors_origins: list[str] = ["http://localhost:3000"]


@lru_cache
def get_settings() -> Settings:
    """Build Settings once and reuse it (lru_cache memoizes the return value)."""
    return Settings()  # pyright: ignore[reportCallIssue]  # values come from env, not args
