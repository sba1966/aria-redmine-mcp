import { z } from "zod";

export const RedmineCatalogItemSchema = z.object({
  id: z.number().int(),
  catalog_id: z.number().int(),
  sku: z.string(),
  title: z.string(),
  payload: z.record(z.unknown()),
});

// The search endpoint returns a raw JSON array
export const RedmineCatalogSearchResponseSchema = z.array(RedmineCatalogItemSchema);
