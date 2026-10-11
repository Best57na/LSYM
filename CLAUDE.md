# SlipWise

AI-powered expense tracker and portfolio project. A user uploads a Thai bank transfer slip or receipt.
The Claude API (vision) extracts amount, date, bank and recipient and suggests a category. The user
confirms or edits the result before it is saved.

## Stack

- **frontend/**: Next.js 16 (App Router, TypeScript), Tailwind CSS 4, npm
- **backend/**: Python 3.13, FastAPI, Pydantic / pydantic-settings, PyMongo async (`AsyncMongoClient`, not Motor), uv
- **Database**: MongoDB Atlas
- **Auth**: Clerk. Next.js sends the Clerk session JWT as a Bearer token, and FastAPI verifies it with Clerk's JWKS.
- **AI**: Claude API with vision and structured outputs (`messages.parse()` with a Pydantic model)

Next.js 16 has breaking changes compared with older versions. Before writing frontend code, read
`frontend/AGENTS.md` and the bundled docs in `frontend/node_modules/next/dist/docs/`.

## Folder structure

```
frontend/src/app/          routes (App Router)
frontend/src/components/   React components
frontend/src/lib/api.ts    typed fetch client for the backend
frontend/src/types/        TS types mirroring backend schemas
backend/app/main.py        app factory, lifespan (Mongo client), CORS, routers
backend/app/core/          settings (config.py), auth
backend/app/api/routes/    HTTP routes, one module per resource
backend/app/schemas/       Pydantic request/response models
backend/app/services/      business logic (Claude extraction, categorization)
backend/app/db/            Mongo client, dependencies, indexes, seeds
backend/tests/             pytest tests (stub DB dependencies with app.dependency_overrides)
docs/                      architecture notes, screenshots
```

## Commands

```bash
# backend (run from backend/)
uv sync
uv run fastapi dev app/main.py      # http://localhost:8000, docs at /docs
uv run pytest
uv run ruff check . && uv run ruff format --check .
uv run pyright

# frontend (run from frontend/)
npm install
npm run dev                         # http://localhost:3000
npm run lint && npx tsc --noEmit
```

## Conventions

- Money is stored as integer satang (`amount_satang`), never as floats.
- Dates are stored as UTC and displayed in Asia/Bangkok time.
- Every expense query filters by `user_id`.
- Settings come from env vars through `app/core/config.py`. Add new keys to `.env.example` as well.

## Rules

- **Git workflow:** every feature gets its own branch off `dev`, named after the feature (`feat/landing-page`, `fix/...`, `chore/...`). Never commit directly to `main` or `dev`.
- **Commits:** commit in small parts as each piece works (one logical change per commit), using Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`).
- **Review gate:** when the feature is done, stop and wait for the user to check it. Do not push before the user says OK.
- **After OK:** push the branch and open a PR into `dev`.
- **Secrets:** never commit secrets. `.env` files stay git-ignored, and only `.env.example` files with placeholder values are committed.
- **Slip data:** never store raw slip or receipt images, and never store account numbers, full or partial. Process images in memory and discard them after extraction. Never log request bodies or raw AI responses.
