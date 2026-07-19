import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const NEWS_LIST_TOOL: Tool = {
  name: "list_news",
  description:
    "List news entries for a project or across all projects. " +
    "Returns title, summary, author, and timestamp. " +
    "Available since Redmine 1.1",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "Project ID or key to scope results. Omit to list news across all projects.",
      },
      limit: {
        type: "number",
        description: "Maximum news entries to return, from 1 to 100",
        minimum: 1,
        maximum: 100,
        default: 25,
      },
      offset: {
        type: "number",
        description: "Number of entries to skip",
        minimum: 0,
        default: 0,
      },
    },
  },
};

export const NEWS_CREATE_TOOL: Tool = {
  name: "create_news",
  description:
    "Create a news entry in a project. " +
    "Available since Redmine 1.1",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "Project ID or key",
      },
      title: {
        type: "string",
        description: "News title",
      },
      summary: {
        type: "string",
        description: "Short summary shown in the news list",
      },
      description: {
        type: "string",
        description: "Full news body text",
      },
    },
    required: ["project_id", "title"],
  },
};

export const NEWS_UPDATE_TOOL: Tool = {
  name: "update_news",
  description:
    "Update an existing news entry. " +
    "Only specified fields will be changed. " +
    "Available since Redmine 1.1",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "News entry ID",
      },
      title: {
        type: "string",
        description: "New title",
      },
      summary: {
        type: "string",
        description: "New summary",
      },
      description: {
        type: "string",
        description: "New body text",
      },
    },
    required: ["id"],
  },
};

export const NEWS_DELETE_TOOL: Tool = {
  name: "delete_news",
  description:
    "Delete a news entry permanently. " +
    "This action cannot be undone. " +
    "Available since Redmine 1.1",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "number",
        description: "News entry ID to delete",
      },
    },
    required: ["id"],
  },
};
