# thread

Minimal anonymous comment thread app.

## Architecture

- Single `index.html` file — no build step, no framework
- Hosted on GitHub Pages and Vercel (both auto-deploy from `main`)
- Supabase Postgres backend (project ref: `dekiekoxtmesfxjvakbd`, region: us-east-1)

## Deployments

- **GitHub Pages:** https://aidencullo.github.io/thread/
- **Vercel:** https://thread-delta-six.vercel.app

## Database

- **Table:** `comments` — columns: `id` (uuid, auto), `text` (text), `username` (text), `created_at` (timestamptz, auto)
- **RLS:** Public read and insert, no update/delete
- **Auth:** Anon key embedded in client — safe because RLS restricts operations

## Users

Each visitor gets an auto-generated anonymous username (e.g. `swift-fox-472`) stored in localStorage. No accounts or auth.

## API

All requests go to `https://dekiekoxtmesfxjvakbd.supabase.co/rest/v1/comments`

- `GET ?select=*&order=created_at.asc` — fetch all comments
- `POST` with `{"text": "...", "username": "..."}` — insert a comment

## Realtime

WebSocket connection to Supabase Realtime listens for INSERT events on `comments` table. Falls back to 30s polling.

## Workflow

- Push to `main` to deploy (both GitHub Pages and Vercel)
- No PR workflow, no branches
