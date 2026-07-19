import type { RedmineCatalogItem, RedmineCatalogSearchResponse } from "../lib/types/index.js";

export function formatCatalogItem(item: RedmineCatalogItem, catalogId: number, id: number): string {
  return JSON.stringify({ catalog_id: catalogId, id, item }, null, 2);
}

export function formatCatalogSearchResults(items: RedmineCatalogSearchResponse, catalogId: number, query: string): string {
  return JSON.stringify({ query, catalog_id: catalogId, count: items.length, items }, null, 2);
}
