/* eslint-disable @typescript-eslint/no-unused-vars */
//https://controlpanel.abidjan-eco.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,date
import { type NextRequest } from 'next/server';

const POSTS_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/posts?per_page=100&_fields=slug,date`;

async function getArticleSlugs() {
  const res = await fetch(POSTS_API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const posts: { slug: string; date: string }[] = await res.json();

  return posts.map(post => ({
    slug: post.slug,
    locale: 'fr', // si tu n'as pas plusieurs locales dans WP, fixe à 'fr'
    lastmod: post.date,
  }));
}

function generateSitemapXml(urls: { loc: string; lastmod: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
</urlset>`;
}

export async function GET(_req: NextRequest) {
  try {
    const articles = await getArticleSlugs();

    const urls = articles.map(article => ({
      loc: `https://www.abidjan-eco.com/${article.locale}/article/${article.slug}`,
      lastmod: article.lastmod,
    }));

    const sitemap = generateSitemapXml(urls);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return new Response('Failed to generate sitemap', { status: 500 });
  }
}
