# Capstone Backend (Express + TypeScript)

REST API for analysis that the frontend expects.

- Base URL: `http://localhost:8000`
- Endpoints:
  - POST `/api/analyze` – Analyze content via OpenAI; enrich with YouTube & Naver blogs; store to DB
  - GET `/api/analysis/:id` – Retrieve a saved analysis
  - POST `/api/analysis/save` – Save an analysis payload

## Quick start

1. Copy environment template:

```bash
cp .env.example .env
```

2. Fill in keys in `.env`:

- `OPENAI_API_KEY` (required)
- `YOUTUBE_API_KEY` (optional)
- `NEWSAPI_KEY` (optional; NewsAPI.org for news articles)
- `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET` (optional)
- `DATABASE_URL` (optional; PostgreSQL, e.g. AWS RDS)

3. Install deps and run:

```bash
npm install
npm run dev
```

Server runs at `http://localhost:8000`.

If `DATABASE_URL` is not set, data persists in-memory.

## Docker

Build & run:

```bash
docker build -t capstone-backend .
# ensure .env is present
docker run --env-file .env -p 8000:8000 capstone-backend
```

## Notes
- When `DATABASE_URL` is defined, the server will auto-create a table `analyses` to store JSON results.
- External sources are best-effort: missing API keys will simply yield fewer opinion sources.
