// functions/api/scaffold.js
// Pages Function: free built-in model calls for Sugya Scout via Workers AI.
// Needs the Workers AI binding named AI on this Pages project
// (Cloudflare dashboard: Workers & Pages -> this project -> Settings -> Bindings -> Add -> Workers AI, name: AI).
// The free plan includes 10,000 neurons/day and simply stops when exhausted; no billing surprise.

const ALLOWED = new Set([
  '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  '@cf/meta/llama-4-scout-17b-16e-instruct',
  '@cf/openai/gpt-oss-120b',
  '@cf/qwen/qwq-32b',
  '@cf/qwen/qwen3-30b-a3b-fp8',
  '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
  '@cf/mistralai/mistral-small-3.1-24b-instruct',
  '@cf/google/gemma-3-12b-it'
]);

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: { 'content-type': 'application/json' }
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad JSON' }, 400); }
  const model = String(body.model || '');
  const prompt = body.prompt;
  if (!ALLOWED.has(model)) return json({ error: 'model not allowed: ' + model }, 400);
  if (typeof prompt !== 'string' || prompt.length < 10 || prompt.length > 80000) {
    return json({ error: 'bad prompt' }, 400);
  }
  if (!env.AI) {
    return json({ error: 'The built-in model is not switched on yet (Workers AI binding missing on the Pages project).' }, 503);
  }
  try {
    const r = await env.AI.run(model, {
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2400
    });
    // Workers AI response shapes vary by model: { response: "..." }, { response: {...} },
    // { result: ... }, OpenAI-style { choices: [...] }, or a bare string. Coerce to text.
    let reasoning = '';
    function toText(v) {
      if (v == null) return '';
      if (typeof v === 'string') return v;
      if (Array.isArray(v)) return v.map(toText).join('');
      if (typeof v === 'object') {
        if (typeof v.reasoning === 'string' && v.reasoning) reasoning = reasoning || v.reasoning;
        if (typeof v.reasoning_content === 'string' && v.reasoning_content) reasoning = reasoning || v.reasoning_content;
        for (const k of ['response', 'output_text', 'text', 'content', 'result', 'generated_text']) {
          if (v[k] != null) { const t = toText(v[k]); if (t) return t; }
        }
        if (v.choices) return toText(v.choices.map(c => c && (c.message || c)));
        if (v.message) return toText(v.message);
        return '';
      }
      return String(v);
    }
    let text = toText(r);
    if (!text) text = JSON.stringify(r);
    const m = String(text).match(/<think>([\s\S]*?)<\/think>/);
    if (m) { reasoning = m[1].trim(); text = text.replace(m[0], '').trim(); }
    return json({ text: text, reasoning: reasoning });
  } catch (e) {
    return json({ error: 'model call failed: ' + String(e && e.message || e) }, 502);
  }
}
