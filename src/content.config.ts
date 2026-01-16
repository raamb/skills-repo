import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const skillsSchema = z.object({
  name: z.string(),
  description: z.string(),
  platform: z.string(),
  'allowed-tools': z.string().optional(),
  author: z.string().optional(),
  authorUrl: z.string().url().optional(),
  tags: z.array(z.string()).max(5).default([]),
  dateAdded: z.coerce.date().optional().default(() => new Date()),
});

const agentsSchema = z.object({
  name: z.string(),
  description: z.string(),
  platform: z.string(),
  model: z.string().optional(),
  author: z.string().optional(),
  authorUrl: z.string().url().optional(),
  tags: z.array(z.string()).max(5).default([]),
  dateAdded: z.coerce.date().optional().default(() => new Date()),
});

const skills = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/skills' }),
  schema: skillsSchema,
});

const agents = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/agents' }),
  schema: agentsSchema,
});

export const collections = { skills, agents };
