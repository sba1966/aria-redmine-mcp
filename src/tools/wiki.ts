import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const WIKI_LIST_PAGES_TOOL: Tool = {
  name: "list_wiki_pages",
  description:
    "List all wiki pages in a project. " +
    "Returns page titles, versions, and timestamps. " +
    "Available since Redmine 2.2.0",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "Project ID as number or project key as text",
      },
    },
    required: ["project_id"],
  },
};

export const WIKI_GET_PAGE_TOOL: Tool = {
  name: "get_wiki_page",
  description:
    "Get the content and metadata of a wiki page. " +
    "Returns the page text, version, author, and timestamps. " +
    "Available since Redmine 2.2.0",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "Project ID as number or project key as text",
      },
      title: {
        type: "string",
        description: "Wiki page title",
      },
    },
    required: ["project_id", "title"],
  },
};

export const WIKI_CREATE_OR_UPDATE_PAGE_TOOL: Tool = {
  name: "create_or_update_wiki_page",
  description:
    "Create a new wiki page or update an existing one. " +
    "Uses the page title as identifier — creates if it doesn't exist, updates if it does. " +
    "Content should be in the format configured for the wiki (markdown or textile). " +
    "Available since Redmine 2.2.0",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "Project ID as number or project key as text",
      },
      title: {
        type: "string",
        description: "Wiki page title (used as identifier)",
      },
      text: {
        type: "string",
        description: "Page content in markdown or textile format",
      },
      comments: {
        type: "string",
        description: "Optional comment describing this change",
      },
      parent_title: {
        type: "string",
        description: "Optional parent page title to nest this page under",
      },
    },
    required: ["project_id", "title", "text"],
  },
};

export const WIKI_DELETE_PAGE_TOOL: Tool = {
  name: "delete_wiki_page",
  description:
    "Delete a wiki page permanently. " +
    "This action cannot be undone. " +
    "Available since Redmine 2.2.0",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "Project ID as number or project key as text",
      },
      title: {
        type: "string",
        description: "Wiki page title to delete",
      },
    },
    required: ["project_id", "title"],
  },
};
