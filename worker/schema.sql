CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  username TEXT NOT NULL DEFAULT 'anonymous',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_comments_created_at
  ON comments (created_at, id);
