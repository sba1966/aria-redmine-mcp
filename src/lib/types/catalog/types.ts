// Single item returned by both search and detail endpoints
export interface RedmineCatalogItem {
  id: number;
  catalog_id: number;
  sku: string;
  title: string;
  payload: Record<string, unknown>;
}

// Search response is a raw array
export type RedmineCatalogSearchResponse = RedmineCatalogItem[];
