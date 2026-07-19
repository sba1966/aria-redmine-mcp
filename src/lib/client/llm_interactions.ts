import { BaseClient } from "./base.js";
import type { RedmineLlmInteractionCreate, RedmineLlmInteractionCreated } from "../types/index.js";
import { RedmineLlmInteractionCreatedSchema } from "../types/llm_interactions/schema.js";

export class LlmInteractionsClient extends BaseClient {
  async createLlmInteraction(
    issueId: number,
    interaction: RedmineLlmInteractionCreate
  ): Promise<RedmineLlmInteractionCreated> {
    const response = await this.performRequest<RedmineLlmInteractionCreated>(
      `issues/${issueId}/llm_interactions.json`,
      {
        method: "POST",
        body: JSON.stringify({ llm_interaction: interaction }),
      }
    );
    return RedmineLlmInteractionCreatedSchema.parse(response);
  }
}
