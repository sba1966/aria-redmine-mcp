import { BaseClient, RedmineApiError } from "./base.js";
import { RedmineWikiPage, RedmineWikiPageIndex, RedmineWikiPageCreate } from "../types/index.js";
import { RedmineWikiPageSchema, RedmineWikiPageIndexSchema } from "../types/wiki/schema.js";
import { ZodError } from "zod";

export class WikiClient extends BaseClient {
  async getWikiPages(projectId: string | number): Promise<{ wiki_pages: RedmineWikiPageIndex[] }> {
    try {
      const response = await this.performRequest<{ wiki_pages: RedmineWikiPageIndex[] }>(
        `projects/${projectId}/wiki/index.json`
      );
      return {
        wiki_pages: response.wiki_pages.map(p => RedmineWikiPageIndexSchema.parse(p)),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async getWikiPage(
    projectId: string | number,
    title: string
  ): Promise<{ wiki_page: RedmineWikiPage }> {
    try {
      const response = await this.performRequest<{ wiki_page: RedmineWikiPage }>(
        `projects/${projectId}/wiki/${encodeURIComponent(title)}.json`
      );
      return {
        wiki_page: RedmineWikiPageSchema.parse(response.wiki_page),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async createOrUpdateWikiPage(
    projectId: string | number,
    title: string,
    data: RedmineWikiPageCreate
  ): Promise<{ wiki_page: RedmineWikiPage }> {
    try {
      const response = await this.performRequest<{ wiki_page: RedmineWikiPage }>(
        `projects/${projectId}/wiki/${encodeURIComponent(title)}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ wiki_page: data }),
        }
      );
      // Redmine returns 200/201 with body, or 204 with empty body on some versions
      if (!response.wiki_page) {
        // If no body returned, fetch the page to return it
        return this.getWikiPage(projectId, title);
      }
      return {
        wiki_page: RedmineWikiPageSchema.parse(response.wiki_page),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async deleteWikiPage(projectId: string | number, title: string): Promise<void> {
    await this.performRequest(
      `projects/${projectId}/wiki/${encodeURIComponent(title)}.json`,
      {
        method: "DELETE",
      }
    );
  }
}
