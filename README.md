# thread

One thread. Everyone sees it. No censorship, no ownership — just quorum.

**Live:** https://aidencullo.github.io/thread/
**Mirror:** https://thread-delta-six.vercel.app

## How it works

Single HTML file. No framework, no build step.

- **Frontend** — static HTML/CSS/JS hosted on GitHub Pages + Vercel
- **Backend** — Supabase Postgres database via REST API
- **Realtime** — WebSocket subscription for live updates, with 30s polling fallback
- **Auth** — none. Anyone can read and post. Row Level Security allows public read/insert.
- **Users** — random anonymous username generated on every page load (e.g. `bold-owl-317`)

Full-screen hero landing page with a "Join the thread" CTA that scrolls down to the comment section. Enter to post, Shift+Enter for newline.
