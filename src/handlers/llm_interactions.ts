import {
  HandlerContext,
  ToolResponse,
  asNumber,
  ValidationError,
} from "./types.js";
import type { RedmineLlmInteractionCreate } from "../lib/types/index.js";
import * as formatters from "../formatters/index.js";

export function createLlmInteractionsHandlers(context: HandlerContext) {
  const { client } = context;

  return {
    create_llm_interaction: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const issue_id = asNumber(args.issue_id);

        if (typeof args.agent_login !== "string" || !args.agent_login) {
          throw new ValidationError("agent_login is required and must be a non-empty string");
        }
        if (typeof args.model !== "string" || !args.model) {
          throw new ValidationError("model is required and must be a non-empty string");
        }
        if (typeof args.api_key_hint !== "string" || !args.api_key_hint) {
          throw new ValidationError("api_key_hint is required and must be a non-empty string");
        }
        if (typeof args.input_tokens !== "number" || args.input_tokens < 0) {
          throw new ValidationError("input_tokens must be a non-negative number");
        }
        if (typeof args.output_tokens !== "number" || args.output_tokens < 0) {
          throw new ValidationError("output_tokens must be a non-negative number");
        }

        const interaction: RedmineLlmInteractionCreate = {
          agent_login: args.agent_login,
          model: args.model,
          api_key_hint: args.api_key_hint,
          input_tokens: args.input_tokens,
          output_tokens: args.output_tokens,
        };

        if (typeof args.step === "string") interaction.step = args.step;
        if (typeof args.request === "string") interaction.request = args.request;
        if (typeof args.response === "string") interaction.response = args.response;

        const result = await client.llmInteractions.createLlmInteraction(issue_id, interaction);
        return {
          content: [{ type: "text", text: formatters.formatLlmInteractionCreated(result) }],
          isError: false,
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
          isError: true,
        };
      }
    },
  };
}
