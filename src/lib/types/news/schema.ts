import { z } from "zod";

export const RedmineNewsSchema = z.object({
  id: z.number(),
  project: z.object({
    id: z.number(),
    name: z.string(),
  }),
  author: z.object({
    id: z.number(),
    name: z.string(),
  }),
  title: z.string(),
  summary: z.string().optional(),
  description: z.string().optional(),
  created_on: z.string(),
});

export type RedmineNewsData = z.infer<typeof RedmineNewsSchema>;
