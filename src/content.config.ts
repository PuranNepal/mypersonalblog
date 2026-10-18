import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const entries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    kind: z.enum(['articles', 'signals', 'books']), tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false), author: z.string().optional(),
  }),
});
export const collections = { entries };
