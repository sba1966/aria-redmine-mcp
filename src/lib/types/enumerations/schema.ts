import { z } from "zod";

export const TrackerSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  default_status: z.object({
    id: z.number(),
    name: z.string(),
  }).optional(),
});

export const IssueStatusSchema = z.object({
  id: z.number(),
  name: z.string(),
  is_closed: z.boolean(),
  is_default: z.boolean().optional(),
});

export const IssuePrioritySchema = z.object({
  id: z.number(),
  name: z.string(),
  is_default: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const TimeEntryActivitySchema = z.object({
  id: z.number(),
  name: z.string(),
  is_default: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type TrackerData = z.infer<typeof TrackerSchema>;
export type IssueStatusData = z.infer<typeof IssueStatusSchema>;
export type IssuePriorityData = z.infer<typeof IssuePrioritySchema>;
export type TimeEntryActivityData = z.infer<typeof TimeEntryActivitySchema>;
