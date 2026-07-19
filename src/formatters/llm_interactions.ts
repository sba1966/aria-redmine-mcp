import type { RedmineLlmInteractionCreated } from "../lib/types/index.js";

export function formatLlmInteractionCreated(result: RedmineLlmInteractionCreated): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<response>
  <message>LLM interaction was successfully recorded.</message>
  <id>${result.id}</id>
  <total_tokens>${result.total_tokens}</total_tokens>
</response>`;
}
