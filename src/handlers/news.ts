import { HandlerContext, ToolResponse, ValidationError } from "./types.js";
import * as formatters from "../formatters/index.js";

export function createNewsHandlers(context: HandlerContext) {
  const { client } = context;

  return {
    list_news: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const params: { project_id?: string | number; limit?: number; offset?: number } = {};
        if (args.project_id !== undefined) {
          if (typeof args.project_id !== "string" && typeof args.project_id !== "number") {
            throw new ValidationError("project_id must be a string or number");
          }
          params.project_id = args.project_id;
        }
        if (typeof args.limit === "number") params.limit = Math.min(Math.max(1, args.limit), 100);
        if (typeof args.offset === "number") params.offset = args.offset;

        const response = await client.news.getNews(params);
        return {
          content: [{ type: "text", text: formatters.formatNewsList(response) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (error instanceof ValidationError) {
          return { content: [{ type: "text", text: `Input Error: ${message}` }], isError: true };
        }
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },

    create_news: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (!args.project_id || typeof args.project_id !== "string" && typeof args.project_id !== "number") {
          throw new ValidationError("project_id is required and must be a string or number");
        }
        if (!args.title || typeof args.title !== "string") {
          throw new ValidationError("title is required and must be a string");
        }

        const data = {
          title: args.title,
          ...(typeof args.summary === "string" && { summary: args.summary }),
          ...(typeof args.description === "string" && { description: args.description }),
        };

        const { news } = await client.news.createNews(args.project_id as string | number, data);
        const text = news
          ? formatters.formatNewsResult(news, "created")
          : `<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <message>News entry "${args.title}" was successfully created.</message>\n</response>`;
        return {
          content: [{ type: "text", text }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (error instanceof ValidationError) {
          return { content: [{ type: "text", text: `Input Error: ${message}` }], isError: true };
        }
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },

    update_news: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (typeof args.id !== "number") {
          throw new ValidationError("id is required and must be a number");
        }

        const data: { title?: string; summary?: string; description?: string } = {};
        if (typeof args.title === "string") data.title = args.title;
        if (typeof args.summary === "string") data.summary = args.summary;
        if (typeof args.description === "string") data.description = args.description;

        if (Object.keys(data).length === 0) {
          throw new ValidationError("No update data provided");
        }

        await client.news.updateNews(args.id, data);
        return {
          content: [{ type: "text", text: formatters.formatNewsUpdated(args.id) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (error instanceof ValidationError) {
          return { content: [{ type: "text", text: `Input Error: ${message}` }], isError: true };
        }
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },

    delete_news: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (typeof args.id !== "number") {
          throw new ValidationError("id is required and must be a number");
        }
        await client.news.deleteNews(args.id);
        return {
          content: [{ type: "text", text: formatters.formatNewsDeleted(args.id) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (error instanceof ValidationError) {
          return { content: [{ type: "text", text: `Input Error: ${message}` }], isError: true };
        }
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },
  };
}
