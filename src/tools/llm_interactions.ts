import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const LLM_INTERACTION_CREATE_TOOL: Tool = {
  name: "create_llm_interaction",
  description:
    "Record an LLM API call against a Redmine issue for token tracking. " +
    "Sends agent identity, model name, a safe key hint, token counts, " +
    "and optionally the full prompt and response text. " +
    "Returns the new record ID and total token count.",
  inputSchema: {
    type: "object",
    properties: {
      issue_id: {
        type: "number",
        description: "Redmine issue ID to attach this interaction to"
      },
      agent_login: {
        type: "string",
        description: "Redmine login of the agent making the call"
      },
      model: {
        type: "string",
        description: "LLM model identifier (e.g. gemini/gemini-2.0-flash)"
      },
      api_key_hint: {
        type: "string",
        description: "Last 8 characters of the LLM vendor API key — never the full key"
      },
      step: {
        type: "string",
        description: "Optional label for the agent step or phase that triggered this call"
      },
      input_tokens: {
        type: "number",
        description: "Number of prompt/input tokens consumed",
        minimum: 0
      },
      output_tokens: {
        type: "number",
        description: "Number of completion/output tokens generated",
        minimum: 0
      },
      request: {
        type: "string",
        description: "Optional full prompt text sent to the model"
      },
      response: {
        type: "string",
        description: "Optional full response text received from the model"
      }
    },
    required: ["issue_id", "agent_login", "model", "api_key_hint", "input_tokens", "output_tokens"]
  }
};
