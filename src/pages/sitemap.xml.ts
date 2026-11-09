// Карта сайта: собирается из site и base в astro.config.mjs,
// поэтому работает и на своём домене, и на GitHub Pages с подпапкой.
// Адреса совпадают с canonical на страницах.
import type { APIRoute } from 'astro';

const pages = ['', 'join/', 'macros/'];

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const origin = site ?? new URL('https://durotar.0ae.ru');

  const urls = pages
    .map((page) => {
      const href = new URL(`${base}${page}`, origin).href;
      const loc = href.endsWith('/') ? href : `${href}/`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
