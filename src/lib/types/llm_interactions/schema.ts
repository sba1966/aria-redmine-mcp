import { z } from "zod";

export const RedmineLlmInteractionCreateSchema = z.object({
  agent_login: z.string().min(1),
  model: z.string().min(1),
  api_key_hint: z.string().min(1),
  step: z.string().optional(),
  input_tokens: z.number().int().min(0),
  output_tokens: z.number().int().min(0),
  request: z.string().optional(),
  response: z.string().optional(),
});

// HTTP 201 response: { id, total_tokens }
export const RedmineLlmInteractionCreatedSchema = z.object({
  id: z.number().int(),
  total_tokens: z.number().int(),
});
