const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...CORS_HEADERS,
    },
  });
}

function error(message, status = 400) {
  return json({ error: message }, status);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const { pathname } = new URL(request.url);

    if (pathname !== '/comments') {
      return error('Not found', 404);
    }

    if (request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT id, text, username, created_at FROM comments ORDER BY created_at ASC, id ASC'
      ).all();

      return json(results);
    }

    if (request.method === 'POST') {
      let body;
      try {
        body = await request.json();
      } catch {
        return error('Invalid JSON body');
      }

      const text = typeof body.text === 'string' ? body.text.trim() : '';
      const username =
        typeof body.username === 'string' && body.username.trim()
          ? body.username.trim().slice(0, 64)
          : 'anonymous';

      if (!text) {
        return error('Text is required');
      }
      if (text.length > 2000) {
        return error('Text must be 2000 characters or fewer');
      }

      const comment = {
        id: crypto.randomUUID(),
        text,
        username,
        created_at: new Date().toISOString(),
      };

      await env.DB.prepare(
        'INSERT INTO comments (id, text, username, created_at) VALUES (?, ?, ?, ?)'
      )
        .bind(comment.id, comment.text, comment.username, comment.created_at)
        .run();

      return json(comment, 201);
    }

    return error('Method not allowed', 405);
  },
};
