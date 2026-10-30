import { defineConfig } from 'astro/config';

// GitHub Pages: для сайта вида <user>.github.io base = '/',
// для проектного репозитория <user>.github.io/<repo> base = '/<repo>'.
// Значения приходят из workflow, локально берутся значения по умолчанию.
const rawBase = process.env.BASE_PATH || '/';
// Astro ждёт base со слэшем на конце, иначе import.meta.env.BASE_URL склеит пути без разделителя.
const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
const site = process.env.SITE_URL || 'https://example.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
