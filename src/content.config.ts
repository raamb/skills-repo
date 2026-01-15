import { defineCollection, z } from 'astro:content';

const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Claude Code native fields
    name: z.string(),
    description: z.string(),
    'allowed-tools': z.string().optional(),

    // Registry metadata (optional)
    author: z.string().optional(),
    authorUrl: z.string().url().optional(),
    tags: z.array(z.string()).max(5).default([]),
    dateAdded: z.coerce.date().default(() => new Date()),
  }),
});

const agentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Claude Code native fields
    name: z.string(),
    description: z.string(),
    model: z.string().optional(),

    // Registry metadata (optional)
    author: z.string().optional(),
    authorUrl: z.string().url().optional(),
    tags: z.array(z.string()).max(5).default([]),
    dateAdded: z.coerce.date().default(() => new Date()),
  }),
});

export const collections = {
  skills: skillsCollection,
  agents: agentsCollection,
};
