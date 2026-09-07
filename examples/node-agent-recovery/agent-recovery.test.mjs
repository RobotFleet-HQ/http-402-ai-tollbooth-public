import test from "node:test";
import assert from "node:assert/strict";
import { classify, parseRetryAfter, readJson } from "./agent-recovery.mjs";

test("parses JSON responses", async () => {
  const result = await readJson("data:application/json,%7B%22ok%22%3Atrue%7D");
  assert.equal(result.body.ok, true);
});

test("stops on malformed JSON", () => {
  const response = new Response("not json", { status: 200 });
  assert.deepEqual(classify({ response, body: null }), { action: "stop", reason: "invalid_json" });
});

test("honors a numeric Retry-After without replaying", () => {
  const response = new Response(JSON.stringify({ error: "slow down" }), { status: 429, headers: { "Retry-After": "2" } });
  const decision = classify({ response, body: { error: "slow down" } });
  assert.equal(decision.action, "retry_after_delay");
  assert.equal(decision.delayMs, 2000);
});

test("recognizes a payment challenge as a human decision", () => {
  const response = new Response(JSON.stringify({ error: "payment required" }), { status: 402 });
  assert.equal(classify({ response, body: { error: "payment required" } }).action, "human_payment");
});

test("uses fallback for an invalid Retry-After", () => {
  assert.equal(parseRetryAfter("nonsense", 750), 750);
});
