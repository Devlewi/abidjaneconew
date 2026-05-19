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

// Fonction utilitaire pour nettoyer les CDATA doublons qui viennent de WordPress
function cleanXmlCdata(content: string): string {
  if (!content) return '';
  // Supprime les <![CDATA[ et ]]> qui traînent potentiellement dans la chaîne
  return content.replace(/<!\[CDATA\[/gi, '').replace(/\]\]>/gi, '');
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
    const requestUrl = new URL(request.url);
    const pathname = requestUrl.pathname;
    const match = pathname.match(/^\/([a-zA-Z-]{2,5})\/feed/);
    const locale = match?.[1] ?? 'fr'; // fallback sur 'fr'
    const posts = await getArticles(locale);

    const feedUrl = `${apiBaseUrl}${pathname}`;

    const feed = new Feed({
      title: `Abidjan Eco - RSS (${locale.toUpperCase()})`,
      description: `Flux RSS des derniers articles (${locale})`,
      id: feedUrl,
      link: `${apiBaseUrl}/${locale}`,
      // Solution pour le avertissement de la ligne 250 (Missing atom:link)
      feedLinks: {
        atom: feedUrl,
      },
      language: locale,
      copyright: `© ${new Date().getFullYear()} Abidjan Eco`,
      updated: new Date(),
    });

    posts.forEach((post: any) => {
      const postUrl = `${apiBaseUrl}${post.link.replace(/^https?:\/\/[^/]+/, '')}`;
      const featuredImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';

      // On nettoie le contenu brut de WordPress de tout CDATA parasite
      const cleanWordPressContent = cleanXmlCdata(post.content.rendered);

      feed.addItem({
        title: he.decode(post.title.rendered),
        id: postUrl,
        link: postUrl,
        description: he.decode(cleanXmlCdata(post.excerpt?.rendered ?? '')),
        
        // Contenu HTML propre, sans aucun CDATA écrit à la main
        content: `
          <p><img width="1000" style="max-width:100%;height:auto;object-fit:contain;display:block;margin:0 auto;" src="${featuredImageUrl}" alt="${post.title.rendered}" decoding="async" /></p>
          ${cleanWordPressContent}
        `.trim(),
        
        date: new Date(post.date),
        author: [{ name: 'webmaster@Abidjan-eco.com' }],
        category: post.categories?.map((catId: number) => {
          const category = post._embedded?.["wp:term"]?.[0]?.find((term: WPCategory) => term.id === catId);
          return category ? { name: category.name } : null;
        }).filter(Boolean),

        // Ajout de la balise média pour MSN
        ...(featuredImageUrl && {
          extensions: [
            {
              name: "media:content",
              objects: {
                _attributes: {
                  url: featuredImageUrl,
                  type: "image/webp",
                  medium: "image"
                }
              }
            }
          ]
        })
      });
    });

    // Injection du namespace xmlns:media
    let rssXml = feed.rss2();
    if (!rssXml.includes('xmlns:media=')) {
      rssXml = rssXml.replace(
        '<rss version="2.0"',
        '<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/"'
      );
    }

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        // Optionnel : Désactive le cache navigateur pendant vos tests
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('Erreur génération RSS:', error);
    return new NextResponse('Erreur lors de la génération du flux RSS', { status: 500 });
  }
}


