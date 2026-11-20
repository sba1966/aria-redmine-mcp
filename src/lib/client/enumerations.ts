import { BaseClient, RedmineApiError } from "./base.js";
import { Tracker, IssueStatus, IssuePriority, TimeEntryActivity } from "../types/index.js";
import { TrackerSchema, IssueStatusSchema, IssuePrioritySchema, TimeEntryActivitySchema } from "../types/enumerations/schema.js";
import { ZodError } from "zod";

export class EnumerationsClient extends BaseClient {
  async listTrackers(): Promise<{ trackers: Tracker[] }> {
    try {
      const response = await this.performRequest<{ trackers: Tracker[] }>("trackers.json");
      return {
        trackers: response.trackers.map(t => TrackerSchema.parse(t)),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async listIssueStatuses(): Promise<{ issue_statuses: IssueStatus[] }> {
    try {
      const response = await this.performRequest<{ issue_statuses: IssueStatus[] }>("issue_statuses.json");
      return {
        issue_statuses: response.issue_statuses.map(s => IssueStatusSchema.parse(s)),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async listIssuePriorities(): Promise<{ issue_priorities: IssuePriority[] }> {
    try {
      const response = await this.performRequest<{ issue_priorities: IssuePriority[] }>("enumerations/issue_priorities.json");
      return {
        issue_priorities: response.issue_priorities.map(p => IssuePrioritySchema.parse(p)),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }

  async listTimeEntryActivities(): Promise<{ time_entry_activities: TimeEntryActivity[] }> {
    try {
      const response = await this.performRequest<{ time_entry_activities: TimeEntryActivity[] }>("enumerations/time_entry_activities.json");
      return {
        time_entry_activities: response.time_entry_activities.map(a => TimeEntryActivitySchema.parse(a)),
      };
    } catch (error) {
      if (error instanceof ZodError) {
        throw new RedmineApiError(422, "Validation failed", [error.message]);
      }
      throw error;
    }
  }
}
