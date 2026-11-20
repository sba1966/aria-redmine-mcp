import { HandlerContext, ToolResponse } from "./types.js";
import {
  formatTrackers,
  formatIssueStatuses,
  formatIssuePriorities,
  formatTimeEntryActivities,
} from "../formatters/enumerations.js";

export function createEnumerationsHandlers(context: HandlerContext) {
  const { client } = context;

  return {
    "list_trackers": async (_args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const response = await client.enumerations.listTrackers();
        return {
          content: [{ type: "text", text: formatTrackers(response.trackers) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },

    "list_issue_statuses": async (_args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const response = await client.enumerations.listIssueStatuses();
        return {
          content: [{ type: "text", text: formatIssueStatuses(response.issue_statuses) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },

    "list_issue_priorities": async (_args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const response = await client.enumerations.listIssuePriorities();
        return {
          content: [{ type: "text", text: formatIssuePriorities(response.issue_priorities) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },

    "list_time_entry_activities": async (_args: Record<string, unknown>): Promise<ToolResponse> => {
      try {
        const response = await client.enumerations.listTimeEntryActivities();
        return {
          content: [{ type: "text", text: formatTimeEntryActivities(response.time_entry_activities) }],
          isError: false,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `API Error: ${message}` }], isError: true };
      }
    },
  };
}
