import { defineCollection, z } from 'astro:content';

const skillsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(200),
    author: z.string(),
    authorUrl: z.string().url().optional(),
    tags: z.array(z.string()).max(5).default([]),
    dateAdded: z.coerce.date().default(() => new Date()),
  }),
});

const agentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(10).max(200),
    author: z.string(),
    authorUrl: z.string().url().optional(),
    tags: z.array(z.string()).max(5).default([]),
    model: z.string().optional(),
    dateAdded: z.coerce.date().default(() => new Date()),
  }),
});

export const collections = {
  skills: skillsCollection,
  agents: agentsCollection,
};
