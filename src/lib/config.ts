import { z } from "zod";
import { parseArgs } from "node:util";
import dotenv from 'dotenv';

// .envファイルの読み込み
dotenv.config();

// 設定スキーマの定義
const ConfigSchema = z.object({
  // RedmineのAPI設定
  redmine: z.object({
    apiKey: z.string({
      required_error: "REDMINE_API_KEY environment variable or --api-key argument is required",
    }),
    host: z
      .string({
        required_error: "REDMINE_URL environment variable or --url argument is required",
      })
      .url("REDMINE_URL / --url must be a valid URL"),
  }),

  // サーバー設定
  server: z.object({
    name: z.string().default("@yonaka15/mcp-server-redmine"),
    version: z.string().default("0.1.0"),
  }),
});

// 設定の型定義
export type Config = z.infer<typeof ConfigSchema>;

// 環境変数からの設定読み込み
function loadConfig(): Config {
  // Parse CLI args; unknown flags are ignored (strict: false) so MCP host args don't cause errors
  const { values: args } = parseArgs({
    options: {
      "api-key": { type: "string" },
      "url": { type: "string" },
    },
    strict: false,
    args: process.argv.slice(2),
  });

  return ConfigSchema.parse({
    redmine: {
      apiKey: args["api-key"] ?? process.env.REDMINE_API_KEY,
      host: args["url"] ?? process.env.REDMINE_URL,
    },
    server: {
      name: process.env.SERVER_NAME ?? "@yonaka15/mcp-server-redmine",
      version: process.env.SERVER_VERSION ?? "0.1.0",
    },
  });
}

// 設定のバリデーションとエクスポート
// Log env var presence at startup so missing vars are visible in MCP server logs
console.error("[mcp-redmine] Startup env check:");
console.error(`  REDMINE_API_KEY: ${process.env.REDMINE_API_KEY ? "SET" : "MISSING"}`);
console.error(`  REDMINE_URL:     ${process.env.REDMINE_URL     ? "SET" : "MISSING"}`);

// Log parsed CLI args
{
  const { values: _args } = parseArgs({
    options: {
      "api-key": { type: "string" },
      "url": { type: "string" },
    },
    strict: false,
    args: process.argv.slice(2),
  });
  console.error("[mcp-redmine] CLI args check:");
  console.error(`  --api-key: ${_args["api-key"] ? "SET" : "MISSING"}`);
  console.error(`  --url:     ${_args["url"]     ? "SET" : "MISSING"} (${_args["url"] ?? "n/a"})`);
}

let config: Config;
try {
  config = loadConfig();
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Configuration error:");
    error.errors.forEach((err) => {
      console.error(`- ${err.path.join(".")}: ${err.message}`);
    });
  } else {
    console.error("Unknown error loading configuration:", error);
  }
  process.exit(1);
}

export default config;