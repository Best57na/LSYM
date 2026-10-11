// Mirrors backend/app/schemas/health.py
export type HealthResponse = {
  status: "ok";
  database: "ok" | "unreachable";
};
