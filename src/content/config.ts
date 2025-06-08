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
    type: z.enum(['tutorial', 'documentation', 'tool', 'dataset']).optional(),
    tags: z.array(z.string()).default([]),
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
    featured: z.boolean().optional().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

// Define the schema for team
const team = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    social: z.object({
      twitter: z.string().optional(),
      github: z.string().optional(),
      linkedin: z.string().optional(),
      website: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

// Define the schema for workshops
const workshops = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    duration: z.string(),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    instructor: z.string().optional(),
    prerequisites: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    slides: z.string().optional(),
    video: z.string().optional(),
  }),
});

// Define the schema for projects
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    client: z.string().optional(),
    startDate: z.date(),
    endDate: z.date().optional(),
    status: z.enum(['active', 'completed', 'on-hold']).default('active'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
  }),
});

// Export all collections
export const collections = {
  resources,
  services,
  workshops,
  projects,
  team,
};