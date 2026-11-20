import { Tracker, IssueStatus, IssuePriority, TimeEntryActivity } from "../lib/types/index.js";

export function formatTrackers(trackers: Tracker[]): string {
  if (trackers.length === 0) return "No trackers found.";
  return trackers
    .map(t => `- id: ${t.id}, name: "${t.name}"${t.description ? `, description: "${t.description}"` : ""}`)
    .join("\n");
}

export function formatIssueStatuses(statuses: IssueStatus[]): string {
  if (statuses.length === 0) return "No issue statuses found.";
  return statuses
    .map(s => `- id: ${s.id}, name: "${s.name}", is_closed: ${s.is_closed}${s.is_default ? ", is_default: true" : ""}`)
    .join("\n");
}

export function formatIssuePriorities(priorities: IssuePriority[]): string {
  if (priorities.length === 0) return "No issue priorities found.";
  return priorities
    .map(p => `- id: ${p.id}, name: "${p.name}"${p.is_default ? ", is_default: true" : ""}${p.active === false ? ", active: false" : ""}`)
    .join("\n");
}

export function formatTimeEntryActivities(activities: TimeEntryActivity[]): string {
  if (activities.length === 0) return "No time entry activities found.";
  return activities
    .map(a => `- id: ${a.id}, name: "${a.name}"${a.is_default ? ", is_default: true" : ""}${a.active === false ? ", active: false" : ""}`)
    .join("\n");
}
