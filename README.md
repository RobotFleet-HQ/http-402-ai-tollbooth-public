# HTTP 402 AI Tollbooth

> Agent-ready developer troubleshooting data, sold per request over Bitcoin Lightning.

**Live:** https://http-402-ai-tollbooth.rsaun-lightning.workers.dev

HTTP 402 AI Tollbooth gives developers and AI agents three useful records free, then unlocks complete structured datasets with a BOLT11 Lightning payment. There are no accounts, subscriptions, credit cards, or API keys.

This is a public, documentation and example repository. The production Worker implementation remains private and is not included here.

## Try it now

List the complete catalog:

```bash
curl -sS https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/api/catalog
```

Preview exactly three records without payment:

```bash
curl -sS https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/api/preview/api-error-fixes
```

Request the full product and receive an HTTP 402 Lightning challenge:

```bash
curl -i https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/api/data/api-error-fixes
```

The last command creates an invoice. Do not run it unless you intentionally want a payment challenge; simply requesting it does not spend sats.

## Why agents use it

- 203 products across DevOps, APIs, ML/AI, Web/Frontend, and Databases
- Entry, Standard, and Premium datasets with 50, 100, or 200 records
- Exactly three free records per product for try-before-you-buy discovery
- Stable `error_code`, `description`, and `programmatic_fix` fields
- HTTP 402 and Bitcoin Lightning payments without user accounts
- OpenAPI 3.1, MCP discovery metadata, and `llms.txt`
- Deterministic fallback generation for resilient dataset delivery
- Durable one-time redemption and replay protection
- Future x402 settlement is documented but remains disabled pending verification

## Architecture

```text
AI agent / developer
        |
        | HTTPS: catalog, preview, paid dataset
        v
Cloudflare Worker
   |         |                    |
   |         |                    +--> Alby --> Bitcoin Lightning invoice
   |         |
   |         +--> Durable Objects --> atomic redemption + counters
   |
   +--> Workers KV --> invoice challenges + generated dataset cache
```

## Pricing

| Tier | Price | Records |
|---|---:|---:|
| Entry | 2,000 sats | 50 |
| Standard | 5,000 sats | 100 |
| Premium | 10,000 sats | 200 |

See [the pricing rationale](docs/PRICING.md), including the live-verified 2,000-sat receiving floor.

## How to pay

1. Request a paid product endpoint.
2. Receive `402 Payment Required` with a BOLT11 invoice and payment hash.
3. Pay the invoice in a Lightning wallet.
4. Retry the same endpoint with `X-Payment-Hash` and `X-Payment-Preimage`.
5. Receive the full dataset once; replayed proofs are rejected.

Never publish or share a payment preimage before using it for its intended redemption. Future Solana USDC/x402 support is disabled until its manual verification process is completed.

## Discovery documents

- [Smithery server card](docs/server-card.json)
- [OpenAPI 3.1 document](docs/openapi.json)
- [llms.txt](docs/llms.txt)
- [Billboard integration summary](BILLBOARD.md)
- [Official MCP Registry readiness](docs/MCP-REGISTRY-SUBMISSION.md)

## Integrations

- **MCP metadata:** tool descriptions for catalog, preview, and purchase discovery
- **MCP transport:** a live Streamable HTTP JSON-RPC endpoint at `/mcp` with four read-only tools
- **OpenAPI:** complete HTTP endpoint descriptions for agent frameworks
- **LLMs.txt:** concise machine-readable project and payment guidance

Connect an MCP client to `https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/mcp`. The server supports `list_products`, `preview_product`, `list_payment_methods`, and `buy_product`. The last tool only returns payment directions and an HTTP 402 challenge; it never pays an invoice or creates a purchase on the caller's behalf.

For a complete no-payment example, see [the Node agent recovery sample](examples/node-agent-recovery/).

## Runnable free sample

The sample shows how an agent can inspect malformed JSON, retry a transient `429` once after `Retry-After`, and safely stop when a response is not recoverable. It uses Node 22+ built-ins only:

```bash
cd examples/node-agent-recovery
npm test
npm start
```

The demo calls only the public three-record preview endpoint. It does not call a paid route, create an invoice, or automatically replay a payment proof.

## License

The documentation in this billboard repository is available under the MIT License. The private production source code is not covered by this repository or license.
