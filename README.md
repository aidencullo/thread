# thread

A minimal, anonymous comment thread.

**Live:** https://aidencullo.github.io/thread/

## How it works

Single HTML file. No framework, no build step.

- **Frontend** — static HTML/CSS/JS hosted on GitHub Pages
- **Backend** — Supabase Postgres database via REST API
- **Realtime** — WebSocket subscription for live updates, with 30s polling fallback
- **Auth** — none. Anyone can read and post. Row Level Security allows public read/insert.

Comments are stored in a `comments` table with `id`, `text`, and `created_at` columns. The anon key is embedded client-side — RLS restricts access to read and insert only.

Enter to post, Shift+Enter for newline.
