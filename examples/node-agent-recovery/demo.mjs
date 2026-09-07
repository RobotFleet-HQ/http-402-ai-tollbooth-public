import { callPreview, classify } from "./agent-recovery.mjs";

const baseUrl = process.env.TOLLBOOTH_URL ?? "https://http-402-ai-tollbooth.rsaun-lightning.workers.dev";
const result = await callPreview(baseUrl);
const decision = classify(result);

console.log(JSON.stringify({
  endpoint: `${baseUrl}/api/preview/api-error-fixes`,
  status: result.response.status,
  decision,
  recordCount: Array.isArray(result.body?.items) ? result.body.items.length : 0
}, null, 2));
