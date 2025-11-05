# Capstone Backend (Express + TypeScript)

REST API for analysis that the frontend expects.

- Base URL: `http://localhost:8000`
- Endpoints:
  - POST `/api/analyze` – Analyze content via OpenAI; enrich with YouTube & Naver blogs; store to DB
  - GET `/api/analysis/:id` – Retrieve a saved analysis
  - POST `/api/analysis/save` – Save an analysis payload
  - GET `/api/analyses/all` – List saved analyses (pagination)

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
  - Format: `postgres://username:password@host:5432/dbname`
  - For AWS RDS enforcing SSL, also set `PGSSLMODE=require`.

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
- The analyze endpoint performs a two-stage process: (1) quick filter/validation (rejects spam/non-news), (2) full analysis & external source grounding.

## Connect to AWS RDS from local machine

If your RDS is in a private subnet or not publicly accessible, you cannot connect directly from your laptop and will see errors like `connect ETIMEDOUT`.

Two safe options:

1) SSH tunnel via an EC2 instance that can reach RDS

- Open a tunnel (Windows PowerShell):

```powershell
ssh -i C:\path\to\your-key.pem -N -L 5432:cap01-db.cv0h7ohckwwx.ap-northeast-2.rds.amazonaws.com:5432 ec2-user@<EC2_PUBLIC_IP>
```

- Then set `.env`:

```
DATABASE_URL=postgres://<USER>:<PASSWORD>@localhost:5432/<DBNAME>
PGSSLMODE=require
```

Keep the tunnel open while developing.

2) Make RDS publicly accessible (not recommended for production)

- Set RDS "Publicly accessible: Yes"
- Add a Security Group inbound rule for TCP 5432 from your public IP only
- Keep `DATABASE_URL` pointed to the RDS endpoint and `PGSSLMODE=require`
