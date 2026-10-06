# HTTP 402 AI Tollbooth Billboard

Live service: https://http-402-ai-tollbooth.rsaun-lightning.workers.dev

## Agent tools

| Tool | Purpose | Runtime |
|---|---|---|
| `list_products` | List products, tiers, sizes, and public purchase paths | `POST /mcp` |
| `preview_product` | Return three free sample records | `POST /mcp` |
| `list_payment_methods` | Return enabled payment rails | `POST /mcp` |
| `buy_product` | Return purchase directions without initiating payment | `POST /mcp` |

MCP endpoint: `/mcp`  
Payment registry: `/api/payment-methods`

## Payment rails

- **Bitcoin Lightning** — BOLT11 mainnet invoices; human checkout at `/web/buy/{product}`.
- **x402 USDC on Solana** — x402 v2 exact challenge; production machine route enabled.
- **Stripe Checkout** — hosted USD checkout; server-side paid-session verification before one-time redemption.

## Pricing

- Entry: 2,000 sats / $1.99 / 50 records
- Standard: 5,000 sats / $4.99 / 100 records
- Premium: 10,000 sats / $9.99 / 200 records
- x402 route currently advertises $0.01 USDC on Solana mainnet.

## Machine-readable specifications

- [Server card](docs/server-card.json)
- [OpenAPI](docs/openapi.json)
- [llms.txt](docs/llms.txt)
- [Pricing](docs/PRICING.md)

## Contact

contact@tradedatahub.net
