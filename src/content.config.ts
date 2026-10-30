import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Записи журнала. Каждая — отдельный markdown-файл в src/content/posts/.
 * Чтобы добавить впечатление, достаточно нового файла с frontmatter.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    /** Раса или тема записи — показывается чипом на карточке */
    race: z.string().default('Азерот'),
    faction: z.enum(['alliance', 'horde', 'neutral']).default('neutral'),
    /** Ключ иллюстрации из src/components/Artwork.astro */
    cover: z.string().default('banner'),
    /** Встроенные видео: youtube — по id, vk — по «oid_id» */
    videos: z
      .array(
        z.object({
          platform: z.enum(['youtube', 'vk']),
          id: z.string(),
          title: z.string().optional(),
        })
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
