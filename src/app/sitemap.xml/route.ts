/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//https://controlpanel.cameroun-eco.com/wp-json/wp/v2/posts?per_page=100&_fields=slug,date
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest } from 'next/server';

// On s'assure que l'API récupère les derniers articles (ordre par date)
const POSTS_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc&_fields=slug,date,lang`;

async function getArticleSlugs() {
  // On ajoute un timestamp pour éviter que le serveur Next ne mette en cache l'appel API WP
  const res = await fetch(`${POSTS_API_URL}&_cb=${Date.now()}`, {
    next: { revalidate: 3600 } // Revalide toutes les heures
  });
  
  if (!res.ok) throw new Error('Failed to fetch posts');
  
  const posts: any[] = await res.json();

  return posts.map(post => ({
    slug: post.slug,
    // On essaie de récupérer la langue depuis WP, sinon 'en' (vu ton lien de mai)
    locale: post.lang || 'en', 
    lastmod: post.date,
  }));
}

function generateSitemapXml(urls: { loc: string; lastmod: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
}

export async function GET(_req: NextRequest) {
  try {
    const articles = await getArticleSlugs();

    const urls = articles.map(article => ({
      // ATTENTION : Vérifie si c'est /article/ ou /post/ dans ton architecture Next.js
      loc: `https://www.abidjan-eco.com/${article.locale}/article/${article.slug}`,
      lastmod: article.lastmod,
    }));

    const sitemap = generateSitemapXml(urls);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        // On réduit le cache pour forcer Google à voir les changements
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    return new Response('Failed to generate sitemap', { status: 500 });
  }
}