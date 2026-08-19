# HTTP 402 AI Tollbooth Billboard

Live service: https://http-402-ai-tollbooth.rsaun-lightning.workers.dev

## Agent tools

| Tool | Purpose | Public HTTP endpoint |
|---|---|---|
| `list_products` | List available products, prices, tiers, and sizes | `/api/catalog` |
| `preview_product` | Retrieve exactly three free records | `/api/preview/{product}` |
| `buy_product` | Request the full dataset and receive an HTTP 402 invoice | `/api/data/{product}` |

## Pricing

- Entry: 2,000 sats for 50 records
- Standard: 5,000 sats for 100 records
- Premium: 10,000 sats for 200 records

## Payment

The live flow uses Bitcoin Lightning. The paid endpoint returns a BOLT11 invoice and payment hash. After payment, retry with `X-Payment-Hash` and `X-Payment-Preimage`. The proof is single-use.

x402 settlement over Solana USDC is planned but disabled until its readiness check and manual $0.01 receipt verification have passed.

## Machine-readable specifications

- [Server card](docs/server-card.json)
- [OpenAPI](docs/openapi.json)
- [llms.txt](docs/llms.txt)
- [Pricing](docs/PRICING.md)

## Contact

Contact: `<CONTACT_EMAIL>`
