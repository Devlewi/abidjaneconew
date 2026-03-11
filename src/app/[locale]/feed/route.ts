/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { Feed } from 'feed';
import he from 'he';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiBackendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

interface WPCategory {
  id: number;
  name: string;
}

async function getArticles(locale: string) {
  const url = `${apiBackendUrl}/wp-json/wp/v2/posts?_embed&lang=${locale}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Erreur de récupération des articles: ${res.status}`);
  }
  return res.json();
}

export async function GET(request: Request) {
  try {
    const pathname = new URL(request.url).pathname;
    const match = pathname.match(/^\/([a-zA-Z-]{2,5})\/feed/);
    const locale = match?.[1] ?? 'fr'; // fallback sur 'fr'

    const posts = await getArticles(locale);

    const feed = new Feed({
      title: `Cameroun Eco - RSS (${locale.toUpperCase()})`,
      description: `Flux RSS des derniers articles (${locale})`,
      id: `${apiBaseUrl}/${locale}`,
      link: `${apiBaseUrl}/${locale}`,
      language: locale,
      copyright: `© ${new Date().getFullYear()} Cameroun Eco`,
      updated: new Date(),
    });

    posts.forEach((post: any) => {
      const postUrl = `${apiBaseUrl}${post.link.replace(/^https?:\/\/[^/]+/, '')}`;

      feed.addItem({
        title: he.decode(post.title.rendered),
        id: postUrl,
        link: postUrl,
        description: he.decode(post.excerpt?.rendered ?? ''),
        content: `<![CDATA[
            <p><img width="1000" style="max-width:100%;height:auto;object-fit:contain;display:block;margin:0 auto;" src="${post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? ''}" alt="${post.title.rendered}" decoding="async" /></p>
            ${post.content.rendered}
          ]]>`,
        date: new Date(post.date),
        author: [{ name: 'webmaster@cameroun-eco.com' }],
        category: post.categories?.map((catId: number) => {
          const category = post._embedded["wp:term"][0].find((term: WPCategory) => term.id === catId);
          return category ? { name: category.name } : null;
        }).filter(Boolean),
      });
    });

    return new NextResponse(feed.rss2(), {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Erreur génération RSS:', error);
    return new NextResponse('Erreur lors de la génération du flux RSS', { status: 500 });
  }
}
