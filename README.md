# HTTP 402 AI Tollbooth

> Agent-ready developer troubleshooting data with Lightning, x402 USDC, and Stripe Checkout payment rails.

**Live:** https://http-402-ai-tollbooth.rsaun-lightning.workers.dev

HTTP 402 AI Tollbooth gives developers and AI agents exactly three free preview records, then unlocks complete 50/100/200-record datasets through the enabled payment rails published at `/api/payment-methods`.

This repository is the public documentation and example surface. The production Worker implementation remains private.

## Try it now

```bash
# Catalog
curl -sS https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/api/catalog

# Free preview
curl -sS https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/api/preview/api-error-fixes

# Current payment rails
curl -sS https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/api/payment-methods

# MCP transport metadata
curl -sS https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/mcp
```

A request to `/api/data/{product}` is a paid machine route. When x402 is enabled it is fronted by the x402 USDC challenge. Lightning remains available at `/web/buy/{product}`, and Stripe Checkout at `/web/stripe/buy/{product}`.

## Why agents use it

- 203 products across DevOps, APIs, ML/AI, Web/Frontend, and Databases
- Entry, Standard, and Premium datasets with 50, 100, or 200 records
- Exactly three free records per product
- Stable `error_code`, `description`, and `programmatic_fix` fields
- Machine-readable payment registry
- OpenAPI 3.1, `llms.txt`, AI-plugin metadata, and MCP
- Durable one-time redemption and replay protection
- No payment is submitted by MCP tools

## Pricing

| Tier | Lightning | Stripe | Records |
|---|---:|---:|---:|
| Entry | 2,000 sats | $1.99 | 50 |
| Standard | 5,000 sats | $4.99 | 100 |
| Premium | 10,000 sats | $9.99 | 200 |

The x402 production route currently advertises a **$0.01 USDC** challenge on Solana mainnet. A live 402 challenge is not the same thing as a completed settlement; settlement claims require transaction evidence.

## Payment rails

### Bitcoin Lightning
Use `/web/buy/{product}` to create a mainnet BOLT11 invoice. After payment, redeem once with `X-Payment-Hash` and `X-Payment-Preimage`.

### x402 USDC
Machine purchase routes return an x402 v2 exact challenge when enabled. The current production registry identifies Solana mainnet USDC and the Dexter facilitator.

### Stripe Checkout
Use `/web/stripe/buy/{product}` or `POST /api/stripe/checkout`. The Worker re-retrieves the Checkout Session and verifies paid state, product identity, currency, and amount before releasing data.

## MCP

Connect a client to:

`https://http-402-ai-tollbooth.rsaun-lightning.workers.dev/mcp`

The Streamable HTTP-style JSON-RPC endpoint exposes four read-only tools:

- `list_products`
- `preview_product`
- `list_payment_methods`
- `buy_product`

`buy_product` returns purchase directions only. It never signs, sends, or pays a transaction.

## Discovery documents

- [Server card](docs/server-card.json)
- [OpenAPI 3.1](docs/openapi.json)
- [llms.txt](docs/llms.txt)
- [Billboard integration summary](BILLBOARD.md)
- [Official MCP Registry readiness](docs/MCP-REGISTRY-SUBMISSION.md)

## Support

Payment and dataset support: **contact@tradedatahub.net**

Never send private keys, seed phrases, or payment preimages in a support message.

## License

The documentation in this billboard repository is available under the MIT License. The private production source code is not covered by this repository or license.
