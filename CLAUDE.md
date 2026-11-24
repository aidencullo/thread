# thread

One thread. Everyone sees it. No censorship, no ownership — just quorum.

## Architecture

- `index.html` — single-file static frontend, no build step
- `worker/` — Cloudflare Worker + D1 backend
- Hosted on GitHub Pages and Vercel (both auto-deploy from `main`)

## Deployments

- **GitHub Pages:** https://aidencullo.github.io/thread/
- **Vercel:** https://thread-delta-six.vercel.app
- **API:** https://thread-api.aidencullo.workers.dev

## UI

- Full-screen hero page: big "thread" title with blinking terminal cursor, subtitle, and "Join the thread" CTA button
- CTA smooth-scrolls to the comment section
- Loading dots shown while fetching comments; page card hidden until ready
- If the API is unavailable, a status message is shown and polling continues
- Hero elements fade in with staggered animations

## Database

- **Worker:** `thread-api` in `worker/index.js`
- **D1 database:** `thread-comments` (`869a150a-1eae-4bd5-9e46-2ce6187d0e90`)
- **Table:** `comments` — `id` (uuid text), `text`, `username`, `created_at` (ISO timestamp text)
- Schema: `worker/schema.sql`

The old Supabase project (`dekiekoxtmesfxjvakbd`) no longer resolves; comments from it were not recoverable.

## Users

Random anonymous username generated on every page load (e.g. `bold-owl-317`). No persistence, no localStorage, no accounts. Format: `adjective-noun-number` from 10 adjectives x 10 nouns x 900 numbers = 90,000 combinations.

## API

All requests go to `https://thread-api.aidencullo.workers.dev/comments` with permissive CORS.

- `GET` — fetch all comments ordered oldest to newest
- `POST` with `{"text": "...", "username": "..."}` — insert a comment
- `OPTIONS` — CORS preflight

Text is trimmed and capped at 2000 characters; usernames at 64 characters.

## Updates

The frontend polls `GET /comments` every 3 seconds. There is no WebSocket/realtime subscription.

## Workflow

- Backend changes: `cd worker && wrangler d1 execute thread-comments --remote --file=schema.sql && wrangler deploy`
- Frontend changes: push to `main` (both GitHub Pages and Vercel auto-deploy)
- Update README.md and CLAUDE.md when features change
