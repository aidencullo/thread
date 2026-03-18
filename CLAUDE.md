# thread

Minimal anonymous comment thread app.

## Architecture

- Single `index.html` file — no build step, no framework
- Hosted on GitHub Pages (auto-deploys from `main`)
- Supabase Postgres backend (project ref: `dekiekoxtmesfxjvakbd`, region: us-east-1)

## Database

- **Table:** `comments` — columns: `id` (uuid, auto), `text` (text), `created_at` (timestamptz, auto)
- **RLS:** Public read and insert, no update/delete
- **Auth:** Anon key embedded in client — safe because RLS restricts operations

## API

All requests go to `https://dekiekoxtmesfxjvakbd.supabase.co/rest/v1/comments`

- `GET ?select=*&order=created_at.asc` — fetch all comments
- `POST` with `{"text": "..."}` — insert a comment

## Realtime

WebSocket connection to Supabase Realtime listens for INSERT events on `comments` table. Falls back to 30s polling.

## Workflow

- Push to `main` to deploy
- No PR workflow, no branches
