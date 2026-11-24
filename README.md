# thread

One thread. Everyone sees it. No censorship, no ownership — just quorum.

**Live:** https://aidencullo.github.io/thread/  
**Mirror:** https://thread-delta-six.vercel.app

## How it works

Single HTML file for the frontend, plus a small Cloudflare Worker for the shared backend.

- **Frontend** — static HTML/CSS/JS hosted on GitHub Pages + Vercel
- **Backend** — Cloudflare Worker + D1 at https://thread-api.aidencullo.workers.dev
- **Updates** — 3s polling, no WebSocket subscription
- **Auth** — none. Anyone can read and post. CORS is open.
- **Users** — random anonymous username generated on every page load (e.g. `bold-owl-317`)

Enter to post, Shift+Enter for newline.

## Worker

- **Worker:** `thread-api` (`worker/index.js`)
- **D1 database:** `thread-comments`
- **Table:** `comments` — `id` (uuid text), `text`, `username`, `created_at`

The former Supabase project was deleted, so the old comments were not migrated.

### Deploy backend changes

```sh
cd worker
wrangler d1 execute thread-comments --remote --file=schema.sql
wrangler deploy
```

Push to `main` to deploy the frontend to GitHub Pages and Vercel.
