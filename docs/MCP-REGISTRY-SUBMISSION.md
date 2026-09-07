# Official MCP Registry Submission

## Current status: ready for authenticated registry publication

The Official MCP Registry accepts remote servers whose `remotes` entry points to a publicly accessible Streamable HTTP MCP endpoint. Tollbooth now exposes and has smoke-tested a JSON-RPC MCP initialization endpoint at `/mcp`, including `list_products`, `preview_product`, `list_payment_methods`, and `buy_product`.

Publish the checked-in root `server.json`. Static `server-card.json` metadata is supplemental and is not the registry payload.

## Registry payload

The registry payload is [../server.json](../server.json). It declares the live `/mcp` Streamable HTTP endpoint.

The requested command below is obsolete and must not be run:

```bash
# INVALID: wrong path, no authentication, and server-card.json is not Registry server.json
curl -X POST https://registry.modelcontextprotocol.io/servers \
  -H "Content-Type: application/json" \
  -d @docs/server-card.json
```

The production Registry publishes through the authenticated `mcp-publisher` CLI. After `/mcp` is live and this billboard repository is public:

```bash
mcp-publisher validate server.json
mcp-publisher login github
mcp-publisher publish server.json
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.robotfleet-hq/http-402-ai-tollbooth"
```

GitHub login proves control of the `io.github.robotfleet-hq/*` namespace. The public billboard repository may be used as the registry's reviewable repository URL; the private implementation repository remains private.

Official references:

- Publishing guide: https://modelcontextprotocol.io/registry/quickstart
- Remote servers: https://modelcontextprotocol.io/registry/remote-servers
- Registry and publisher source: https://github.com/modelcontextprotocol/registry
- Registry search UI/API: https://registry.modelcontextprotocol.io/

There is no separate official submission form documented as a fallback. If CLI publication fails, open an issue at https://github.com/modelcontextprotocol/registry/issues with secrets and tokens removed.

## Human checklist

- [ ] Review every billboard file and replace `<CONTACT_EMAIL>`.
- [ ] Push billboard repo to GitHub as public.
- [x] Implement, deploy, and verify a Streamable HTTP MCP endpoint at `/mcp`.
- [ ] Submit to Official MCP Registry with `mcp-publisher` (requires the publisher's GitHub device login).
- [ ] Submit to MCP.so.
- [ ] Submit to MCP Market.
- [ ] Submit to Composio.
- [ ] Submit to MCPServers.org.
- [ ] Submit to mcp.run.
