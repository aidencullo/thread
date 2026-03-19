# thread

One thread. Everyone sees it. No censorship, no ownership — just quorum.

## Architecture

- Single `index.html` file — no build step, no framework
- Hosted on GitHub Pages and Vercel (both auto-deploy from `main`)
- Supabase Postgres backend (project ref: `dekiekoxtmesfxjvakbd`, region: us-east-1)

## Deployments

- **GitHub Pages:** https://aidencullo.github.io/thread/
- **Vercel:** https://thread-delta-six.vercel.app

## UI

- Full-screen hero page: big "thread" title with blinking terminal cursor, subtitle, and "Join the thread" CTA button
- CTA smooth-scrolls to the comment section
- Loading dots shown while fetching comments; page card hidden until ready
- Hero elements fade in with staggered animations

## Database

- **Table:** `comments` — columns: `id` (uuid, auto), `text` (text), `username` (text), `created_at` (timestamptz, auto)
- **RLS:** Public read and insert, no update/delete
- **Auth:** Anon key embedded in client — safe because RLS restricts operations
- **Free tier note:** Supabase pauses inactive projects after 7 days of no API requests

## Users

Random anonymous username generated on every page load (e.g. `bold-owl-317`). No persistence, no localStorage, no accounts. Format: `adjective-noun-number` from 10 adjectives x 10 nouns x 900 numbers = 90,000 combinations.

## API

All requests go to `https://dekiekoxtmesfxjvakbd.supabase.co/rest/v1/comments`

- `GET ?select=*&order=created_at.asc` — fetch all comments
- `POST` with `{"text": "...", "username": "..."}` — insert a comment

## Realtime

WebSocket connection to Supabase Realtime listens for INSERT events on `comments` table. Falls back to 30s polling.

## Workflow

- Push to `main` to deploy (both GitHub Pages and Vercel)
- No PR workflow, no branches
- Update README.md and CLAUDE.md when features change
