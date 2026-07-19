import { z } from "zod";

export const RedmineWikiPageSchema = z.object({
  title: z.string(),
  text: z.string().optional(),
  version: z.number(),
  author: z.object({
    id: z.number(),
    name: z.string(),
  }).optional(),
  parent: z.object({
    title: z.string(),
  }).optional(),
  created_on: z.string(),
  updated_on: z.string(),
});

export const RedmineWikiPageIndexSchema = z.object({
  title: z.string(),
  version: z.number(),
  parent: z.object({
    title: z.string(),
  }).optional(),
  created_on: z.string(),
  updated_on: z.string(),
});

export type RedmineWikiPageData = z.infer<typeof RedmineWikiPageSchema>;
export type RedmineWikiPageIndexData = z.infer<typeof RedmineWikiPageIndexSchema>;
