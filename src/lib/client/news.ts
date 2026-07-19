import { BaseClient, RedmineApiError } from "./base.js";
import { RedmineNews, RedmineNewsCreate, NewsSearchParams } from "../types/index.js";
import { RedmineNewsSchema } from "../types/news/schema.js";
import { ZodError } from "zod";

export class NewsClient extends BaseClient {
  async getNews(params?: NewsSearchParams & { project_id?: string | number }): Promise<{ news: RedmineNews[]; total_count: number; offset: number; limit: number }> {
    try {
      const { project_id, ...rest } = params ?? {};
      const query = Object.keys(rest).length ? this.encodeQueryParams(rest as Record<string, string | number>) : "";
      const path = project_id
        ? `projects/${project_id}/news.json${query ? `?${query}` : ""}`
        : `news.json${query ? `?${query}` : ""}`;
      const response = await this.performRequest<{ news: RedmineNews[]; total_count: number; offset: number; limit: number }>(path);
      return {
        ...response,
        news: response.news.map(n => RedmineNewsSchema.parse(n)),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async createNews(projectId: string | number, data: RedmineNewsCreate): Promise<{ news: RedmineNews | null }> {
    try {
      const response = await this.performRequest<{ news?: RedmineNews }>(
        `projects/${projectId}/news.json`,
        {
          method: "POST",
          body: JSON.stringify({ news: data }),
        }
      );
      return {
        news: response.news ? RedmineNewsSchema.parse(response.news) : null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async updateNews(id: number, data: Partial<RedmineNewsCreate>): Promise<void> {
    await this.performRequest(
      `news/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ news: data }),
      }
    );
  }

  async deleteNews(id: number): Promise<void> {
    await this.performRequest(
      `news/${id}.json`,
      {
        method: "DELETE",
      }
    );
  }
}
