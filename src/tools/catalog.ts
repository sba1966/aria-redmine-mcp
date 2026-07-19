import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const CATALOG_SEARCH_TOOL: Tool = {
  name: "catalog_search",
  description:
    "Search items in a Redmine universal catalog using a full-text query. " +
    "Executes a PostgreSQL JSONB text-search expansion across all catalog item keys. " +
    "Returns matching items including their full payload.",
  inputSchema: {
    type: "object",
    properties: {
      catalog_id: {
        type: "number",
        description: "Numeric ID of the catalog to search in"
      },
      q: {
        type: "string",
        description: "Search query string — expanded across all JSONB keys of catalog items"
      }
    },
    required: ["catalog_id", "q"]
  }
};

export const CATALOG_GET_ITEM_TOOL: Tool = {
  name: "catalog_get_item",
  description:
    "Retrieve a specific item from a Redmine universal catalog by its numeric ID. " +
    "Returns the full item including its structured payload.",
  inputSchema: {
    type: "object",
    properties: {
      catalog_id: {
        type: "number",
        description: "Numeric ID of the catalog"
      },
      id: {
        type: "number",
        description: "Database primary key ID of the catalog item"
      }
    },
    required: ["catalog_id", "id"]
  }
};
