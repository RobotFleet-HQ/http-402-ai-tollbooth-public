export function parseRetryAfter(value, fallbackMs = 1000) {
  if (!value) return fallbackMs;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const at = Date.parse(value);
  return Number.isFinite(at) ? Math.max(0, at - Date.now()) : fallbackMs;
}

export async function readJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = null; }
  return { response, body, raw: text };
}

export function classify({ response, body }) {
  if (!response.ok && response.status === 402) return { action: "human_payment", reason: "payment_required", body };
  if (!response.ok && response.status === 429) return { action: "retry_after_delay", reason: "rate_limited", delayMs: parseRetryAfter(response.headers.get("retry-after")), body };
  if (!response.ok) return { action: "stop", reason: `http_${response.status}`, body };
  if (body === null) return { action: "stop", reason: "invalid_json" };
  return { action: "use_result", body };
}

export async function callPreview(baseUrl, product = "api-error-fixes") {
  const url = new URL(`/api/preview/${encodeURIComponent(product)}`, baseUrl);
  return readJson(url);
}
