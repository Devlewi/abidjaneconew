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

// Nettoyage de sécurité des catégories pour le XML
function sanitizeCategory(name: string): string {
  if (!name) return '';
  const decoded = he.decode(name);
  return decoded.replace(/\s*&\s*/g, ' et ').trim();
}

function cleanXmlCdata(content: string): string {
  if (!content) return '';
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
    
    // Détection de la locale (Pathname, Query param, ou 'fr' par défaut)
    const match = pathname.match(/^\/([a-zA-Z-]{2,5})\/feed/);
    const searchParams = requestUrl.searchParams;
    const locale = match?.[1] || searchParams.get('lang') || 'fr';
    
    const posts = await getArticles(locale);
    const feedUrl = `${apiBaseUrl}${pathname}`;

    const feed = new Feed({
      title: `Abidjan Eco - RSS (${locale.toUpperCase()})`,
      description: `Flux RSS des derniers articles (${locale})`,
      id: feedUrl,
      link: `${apiBaseUrl}/${locale}`,
      feedLinks: {
        atom: feedUrl,
      },
      language: locale,
      copyright: `© ${new Date().getFullYear()} Abidjan Eco`,
      updated: new Date(),
    });

    posts.forEach((post: any) => {
      const postUrl = `${apiBaseUrl}${post.link.replace(/^https?:\/\/[^/]+/, '')}`;
      
      const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
      const featuredImageUrl = featuredMedia?.source_url ?? '';
      
      // Extraction du crédit photo / Légende
      let photoCredit = '';
      if (featuredMedia?.caption?.rendered) {
        photoCredit = featuredMedia.caption.rendered.replace(/<\/?[^>]+(>|$)/g, "").trim();
      }
      
      if (!photoCredit) {
        photoCredit = featuredMedia?.alt_text || post.title.rendered;
      }

      const cleanCredit = he.decode(photoCredit);
      const cleanWordPressContent = cleanXmlCdata(post.content.rendered);

      feed.addItem({
        title: he.decode(post.title.rendered),
        id: postUrl,
        link: postUrl,
        description: he.decode(cleanXmlCdata(post.excerpt?.rendered ?? '')),
        
        // Nettoyé : Plus d'image HTML forcée ici pour éviter les doublons
        content: cleanWordPressContent.trim(),
        
        date: new Date(post.date),
        author: [{ name: 'webmaster@Abidjan-eco.com' }],
        
        category: post.categories?.map((catId: number) => {
          const category = post._embedded?.["wp:term"]?.[0]?.find((term: WPCategory) => term.id === catId);
          return category ? { name: sanitizeCategory(category.name) } : null;
        }).filter(Boolean),

        // L'image passe uniquement par ici, au format standard XML
        ...(featuredImageUrl && {
          extensions: [
            {
              name: "media:content",
              objects: {
                _attributes: {
                  url: featuredImageUrl,
                  type: "image/webp",
                  medium: "image",
                  alt: he.encode(cleanCredit) 
                }
              }
            }
          ]
        })
      });
    });

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
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('Erreur génération RSS:', error);
    return new NextResponse('Erreur lors de la génération du flux RSS', { status: 500 });
  }
}