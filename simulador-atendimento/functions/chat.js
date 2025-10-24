// functions/chat.js
// Netlify Function (Node 18+)
// NÃO coloque sua chave aqui. Use a variável de ambiente OPENAI_API_KEY no Netlify.

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Allow': 'POST' }, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Server misconfigured: missing OPENAI_API_KEY' }) };
  }

  try {
    const payload = {
      model: body.model || 'gpt-4-turbo',
      messages: body.messages || [],
      temperature: typeof body.temperature === 'number' ? body.temperature : 0.75,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify(payload),
    });

    const txt = await response.text();
    if (!response.ok) {
      return { statusCode: 502, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Bad response from OpenAI', details: txt }) };
    }

    return { statusCode: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }, body: txt };
  } catch (err) {
    return { statusCode: 500, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Internal error', details: String(err) }) };
  }
};
