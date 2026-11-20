import { Tool } from "@modelcontextprotocol/sdk/types.js";

export const LIST_TRACKERS_TOOL: Tool = {
  name: "list_trackers",
  description:
    "List all trackers configured in this Redmine instance. " +
    "Returns each tracker's id and name (e.g. {\"id\": 5, \"name\": \"Story\"}). " +
    "Call this before creating or updating an issue to obtain the correct tracker_id. " +
    "Takes no input parameters.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export const LIST_ISSUE_STATUSES_TOOL: Tool = {
  name: "list_issue_statuses",
  description:
    "List all globally configured issue statuses in this Redmine instance. " +
    "Returns each status's id, name, and whether it is a closed status. " +
    "Call this before creating or updating an issue to obtain the correct status_id. " +
    "Takes no input parameters.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export const LIST_ISSUE_PRIORITIES_TOOL: Tool = {
  name: "list_issue_priorities",
  description:
    "List all issue priority values configured in this Redmine instance. " +
    "Returns each priority's id and name (e.g. {\"id\": 2, \"name\": \"Normal\"}). " +
    "Call this before creating or updating an issue to obtain the correct priority_id. " +
    "Takes no input parameters.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export const LIST_TIME_ENTRY_ACTIVITIES_TOOL: Tool = {
  name: "list_time_entry_activities",
  description:
    "List all time entry activity values configured in this Redmine instance. " +
    "Returns each activity's id and name (e.g. {\"id\": 9, \"name\": \"Development\"}). " +
    "Call this before logging time to obtain the correct activity_id. " +
    "Takes no input parameters.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};
