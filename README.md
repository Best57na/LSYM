# LSYM: Let's Save Your Money

AI-powered expense tracker for Thai bank transfer slips and receipts. Upload a slip, Claude reads the
amount, date, bank and recipient and suggests a category, and you confirm before anything is saved.

| Layer    | Tech                                        |
| -------- | ------------------------------------------- |
| Frontend | Next.js 16 (App Router, TypeScript), Tailwind CSS 4 |
| Backend  | Python 3.13, FastAPI, Pydantic              |
| Database | MongoDB Atlas (PyMongo async driver)        |
| Auth     | Clerk                                       |
| AI       | Claude API (vision + structured outputs)    |

## Repository layout

```
frontend/   Next.js app (pages, components, typed API client)
backend/    FastAPI service (routes, schemas, services, MongoDB access, tests)
docs/       Architecture notes and screenshots
```

## Prerequisites

- Node.js 20+ and npm
- Python 3.13 managed by [uv](https://docs.astral.sh/uv/) (`pip install uv`, or see the uv docs)
- A MongoDB connection string: [Atlas free tier](https://www.mongodb.com/cloud/atlas) or a local `mongod`

## Setup

### Backend

```bash
cd backend
uv sync                    # creates .venv/ and installs dependencies from uv.lock
cp .env.example .env       # then set MONGODB_URI
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local # NEXT_PUBLIC_API_URL defaults to http://localhost:8000
```

## Run

Use two terminals:

```bash
# Terminal 1: API at http://localhost:8000 (interactive docs at /docs)
cd backend
uv run fastapi dev app/main.py

# Terminal 2: web app at http://localhost:3000
cd frontend
npm run dev
```

The home page shows the backend status. "API ok" means the frontend reached FastAPI. "MongoDB ok"
means FastAPI reached your database.

## Test and lint

```bash
cd backend
uv run pytest              # tests
uv run ruff check .        # lint
uv run ruff format .       # format
uv run pyright             # type check

cd frontend
npm run lint
npx tsc --noEmit
```

## Privacy

Slip images are processed in memory and never stored. Account numbers are never stored, in full or
in part. Only the fields needed to track an expense (amount, date, bank, recipient, category) are
saved.
