import { defineCollection, z } from 'astro:content';

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional(),
  }),
});

const services = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional(),
  }),
});

const training = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  'resources': resources,
  'services': services,
  'training': training,
};