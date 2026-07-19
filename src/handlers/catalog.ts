import {
  HandlerContext,
  ToolResponse,
  asNumber,
  ValidationError,
} from "./types.js";
import * as formatters from "../formatters/index.js";

export function createCatalogHandlers(context: HandlerContext) {
  const { client } = context;

  return {
    catalog_search: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const catalog_id = asNumber(args.catalog_id);

        if (typeof args.q !== "string" || !args.q) {
          throw new ValidationError("q is required and must be a non-empty string");
        }

        const result = await client.catalog.searchCatalogItems(catalog_id, args.q);
        return {
          content: [{ type: "text", text: formatters.formatCatalogSearchResults(result, catalog_id, args.q) }],
          isError: false,
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: error instanceof Error ? error.message : String(error) }],
          isError: true,
        };
      }
    },

    catalog_get_item: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const catalog_id = asNumber(args.catalog_id);
        const id = asNumber(args.id);

        const result = await client.catalog.getCatalogItem(catalog_id, id);
        return {
          content: [{ type: "text", text: formatters.formatCatalogItem(result, catalog_id, id) }],
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
