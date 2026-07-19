import { BaseClient } from "./base.js";
import type { RedmineCatalogItem, RedmineCatalogSearchResponse } from "../types/index.js";
import { RedmineCatalogItemSchema, RedmineCatalogSearchResponseSchema } from "../types/catalog/schema.js";

export class CatalogClient extends BaseClient {
  async searchCatalogItems(
    catalogId: number,
    q: string
  ): Promise<RedmineCatalogSearchResponse> {
    const query = this.encodeQueryParams({ q });
    const response = await this.performRequest<RedmineCatalogSearchResponse>(
      `catalogs/${catalogId}/catalog_items.json?${query}`
    );
    return RedmineCatalogSearchResponseSchema.parse(response);
  }

  async getCatalogItem(
    catalogId: number,
    id: number
  ): Promise<RedmineCatalogItem> {
    const response = await this.performRequest<RedmineCatalogItem>(
      `catalogs/${catalogId}/catalog_items/${id}.json`
    );
    return RedmineCatalogItemSchema.parse(response);
  }
}
