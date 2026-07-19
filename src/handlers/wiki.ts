import { HandlerContext, ToolResponse, ValidationError } from "./types.js";
import * as formatters from "../formatters/index.js";

export function createWikiHandlers(context: HandlerContext) {
  const { client } = context;

  return {
    list_wiki_pages: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (!args.project_id || typeof args.project_id !== "string" && typeof args.project_id !== "number") {
          throw new ValidationError("project_id is required and must be a string or number");
        }
        const { wiki_pages } = await client.wiki.getWikiPages(args.project_id as string | number);
        return {
          content: [{ type: "text", text: formatters.formatWikiPages(wiki_pages) }],
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

    get_wiki_page: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (!args.project_id || typeof args.project_id !== "string" && typeof args.project_id !== "number") {
          throw new ValidationError("project_id is required and must be a string or number");
        }
        if (!args.title || typeof args.title !== "string") {
          throw new ValidationError("title is required and must be a string");
        }
        const { wiki_page } = await client.wiki.getWikiPage(
          args.project_id as string | number,
          args.title
        );
        return {
          content: [{ type: "text", text: formatters.formatWikiPage(wiki_page) }],
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

    create_or_update_wiki_page: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (!args.project_id || typeof args.project_id !== "string" && typeof args.project_id !== "number") {
          throw new ValidationError("project_id is required and must be a string or number");
        }
        if (!args.title || typeof args.title !== "string") {
          throw new ValidationError("title is required and must be a string");
        }
        if (!args.text || typeof args.text !== "string") {
          throw new ValidationError("text is required and must be a string");
        }

        const pageData = {
          text: args.text,
          ...(typeof args.comments === "string" && { comments: args.comments }),
          ...(typeof args.parent_title === "string" && { parent_title: args.parent_title }),
        };

        const { wiki_page } = await client.wiki.createOrUpdateWikiPage(
          args.project_id as string | number,
          args.title,
          pageData
        );

        // Determine action based on version (version 1 = newly created)
        const action = wiki_page.version === 1 ? "created" : "updated";
        return {
          content: [{ type: "text", text: formatters.formatWikiPageResult(wiki_page, action) }],
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

    delete_wiki_page: async (args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        if (!args.project_id || typeof args.project_id !== "string" && typeof args.project_id !== "number") {
          throw new ValidationError("project_id is required and must be a string or number");
        }
        if (!args.title || typeof args.title !== "string") {
          throw new ValidationError("title is required and must be a string");
        }
        await client.wiki.deleteWikiPage(args.project_id as string | number, args.title);
        return {
          content: [
            {
              type: "text",
              text: formatters.formatWikiPageDeleted(args.project_id as string | number, args.title),
            },
          ],
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
