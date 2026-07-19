# Session Context — MCP Server Redmine

## Problem
Redmine MCP tools never appear in Claude Code after startup. The server is registered in
`~/.claude/settings.json` but tools don't show up.

## Root Cause Hypothesis
The MCP server process exits immediately with code 1 if `REDMINE_API_KEY` or `REDMINE_URL`
are missing. If Claude Code doesn't pass the `env` block to the spawned process correctly,
the server dies silently before the MCP handshake completes — so no tools register.

## What Was Done
- Added startup env var logging to `src/lib/config.ts` so the server writes to stderr
  whether the env vars were received or not (before attempting to parse them).
- This lets you see in Claude Code's MCP logs whether the env vars are actually arriving.

## Settings.json Config (do NOT change)
Located at `~/.claude/settings.json`:
```json
"redmine": {
  "command": "node",
  "args": ["/Users/stefanbaus/Documents/dev/projects/mcp-server-redmine/dist/index.js"],
  "env": {
    "REDMINE_API_KEY": "fd44719db22a4a0b3e6df4e71f466ff1d32fae51",
    "REDMINE_URL": "https://rx.i99o.com"
  }
}
```

## Server Config (src/lib/config.ts)
- Reads `REDMINE_API_KEY` and `REDMINE_URL` from `process.env`
- Now logs to stderr at startup: which env vars were found / missing
- If vars are missing → `process.exit(1)` → server dies → tools never register

## Next Steps After Restart
1. Check Claude Code's MCP logs (or stderr output) for the startup env var report.
2. If vars show as `undefined`, the issue is Claude Code not passing `env` to the process.
3. If vars are present but tools still don't appear, the issue is elsewhere in MCP init.

## Key Files
- `src/lib/config.ts` — env var loading + new startup logging
- `src/handlers/index.ts` — tool registration and MCP server init
- `src/index.ts` — entrypoint, calls `runServer()`
- `dist/index.js` — built output (run `npm run build` after any changes)
