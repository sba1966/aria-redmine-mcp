// Request body fields (nested under llm_interaction key per Rails strong-params convention)
export interface RedmineLlmInteractionCreate {
  agent_login: string;
  model: string;
  api_key_hint: string;
  step?: string;
  input_tokens: number;
  output_tokens: number;
  request?: string;
  response?: string;
}

// Success response shape (HTTP 201)
export interface RedmineLlmInteractionCreated {
  id: number;
  total_tokens: number;
}
