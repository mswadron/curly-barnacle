// Cloudflare Pages Function: POST /api/hechsher-scan
// Body: {"image": "<base64 jpeg>"}. Claude reads the kosher symbol(s) in the photo and matches
// them to the agencies on the cRc list (apps/kosher-catalog.txt, served from the same site).
// Needs the secret ANTHROPIC_API_KEY set on the Pages project (Settings > Variables and Secrets).
// Without it the endpoint answers 503 and the page falls back to on-device logo matching.

const MODEL = "claude-sonnet-5-5";
const ALLOWED = [/^https:\/\/(www\.)?limudlab\.com$/, /^https:\/\/[a-z0-9-]+\.curly-barnacle\.pages\.dev$/, /^https:\/\/curly-barnacle\.pages\.dev$/];

const json = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export async function onRequestPost({ request, env }) {
  const key = env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: "not_configured" }, 503);
  const origin = request.headers.get("origin") || "";
  if (origin && !ALLOWED.some(r => r.test(origin))) return json({ error: "forbidden" }, 403);

  let body;
  try { body = await request.json(); } catch { return json({ error: "bad_request" }, 400); }
  const image = typeof body?.image === "string" ? body.image : "";
  if (!image || image.length > 2_000_000 || !/^[A-Za-z0-9+/=]+$/.test(image)) return json({ error: "bad_image" }, 400);

  let catalog = "";
  try { catalog = await (await env.ASSETS.fetch(new URL("/apps/kosher-catalog.txt", request.url))).text(); } catch {}
  if (!catalog) return json({ error: "no_catalog" }, 500);

  const prompt = `You identify kosher certification symbols (hechsherim) in a photo of a food package, label, or restaurant certificate.
Catalog of agencies on the cRc recommended list, one per line as "id | name | short name | other names | location":
${catalog}

Look at every kosher symbol in the photo. For each one, decide which catalog agency it is, if any. Only match when the mark really is that agency's symbol (shape, letters, text). Many symbols look alike (a plain K, a K in a circle, a K in a triangle, a K in a star): do not force a match.
Reply with only JSON, no other text: {"symbols":[{"match_id":"<catalog id or null>","name":"<agency name if you recognize it, even if not in the catalog, else what the symbol shows>","seen":"<short description of the mark and letters such as D, DE, P, M>","confidence":"high|medium|low"}]}. If no kosher symbol is visible reply {"symbols":[]}.`;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL, max_tokens: 800,
      messages: [{ role: "user", content: [
        { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
        { type: "text", text: prompt }
      ] }]
    })
  });
  if (!r.ok) return json({ error: "upstream", status: r.status }, 502);
  const out = await r.json();
  const text = (out.content || []).filter(b => b.type === "text").map(b => b.text).join("");
  const m = text.match(/\{[\s\S]*\}/);
  try {
    const parsed = JSON.parse(m ? m[0] : text);
    const symbols = Array.isArray(parsed.symbols) ? parsed.symbols.slice(0, 6).map(s => ({
      match_id: typeof s.match_id === "string" ? s.match_id : null,
      name: String(s.name || "").slice(0, 120), seen: String(s.seen || "").slice(0, 200),
      confidence: ["high", "medium", "low"].includes(s.confidence) ? s.confidence : "low"
    })) : [];
    return json({ symbols });
  } catch { return json({ error: "unreadable" }, 502); }
}

export const onRequest = () => json({ error: "method_not_allowed" }, 405);
