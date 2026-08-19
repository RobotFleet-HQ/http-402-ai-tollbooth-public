# Official MCP Registry Submission

## Current status: blocked pending a real MCP transport

The Official MCP Registry accepts remote servers whose `remotes` entry points to a publicly accessible Streamable HTTP MCP endpoint. The Tollbooth currently exposes REST/OpenAPI routes and MCP discovery metadata, but it does not yet expose a JSON-RPC MCP initialization endpoint at `/mcp`.

Do **not** publish `registry-server.template.json` until `POST /mcp` successfully completes the MCP `initialize` handshake in production. Static `server-card.json` metadata can help Smithery skip metadata scanning, but it does not turn REST routes into an MCP transport.

## Registry payload

The future registry payload is [registry-server.template.json](registry-server.template.json). It translates the server-card identity into the Official Registry's current `server.json` schema and declares the future `/mcp` Streamable HTTP endpoint.

The requested command below is obsolete and must not be run:

```bash
# INVALID: wrong path, no authentication, and server-card.json is not Registry server.json
curl -X POST https://registry.modelcontextprotocol.io/servers \
  -H "Content-Type: application/json" \
  -d @docs/server-card.json
```

The production Registry publishes through the authenticated `mcp-publisher` CLI. After `/mcp` is live and this billboard repository is public:

```bash
cp docs/registry-server.template.json server.json
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
- [ ] Implement, deploy, and verify a Streamable HTTP MCP endpoint at `/mcp`.
- [ ] Submit to Official MCP Registry with `mcp-publisher`.
- [ ] Submit to MCP.so.
- [ ] Submit to MCP Market.
- [ ] Submit to Composio.
- [ ] Submit to MCPServers.org.
- [ ] Submit to mcp.run.
