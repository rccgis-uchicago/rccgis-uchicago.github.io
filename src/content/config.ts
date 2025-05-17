import { defineCollection, z } from 'astro:content';

// Define the schema for resources
const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Define the schema for services
const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    icon: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

// Define the schema for training
const training = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    pubDate: z.date().optional(),
    updatedDate: z.date().optional(),
    draft: z.boolean().optional(),
    level: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    duration: z.string().optional(),
  }),
});

// Export the collections
export const collections = {
  'resources': resources,
  'services': services,
  'training': training,
};