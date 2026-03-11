import { fetchPageBySlug } from '@/app/services/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug,locale } = await params;

    // Choisir le titre selon la locale
    const siteTitle = locale === 'en' ? 'CAMEROON ECO' : 'CAMEROUN ECO';

  return {
    title: `${siteTitle} | ${slug.replace(/-/g, ' ')}`,
    description: `PAGE ${slug} SUR ${siteTitle}`,
  };
}

export default async function CMSPage({ params }: Props) {
  const { locale, slug } = await params;
  //const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/homepage/data/${locale}`;
  /*
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/pages?slug=${slug}&lang=${locale}`,
    { next: { revalidate: 60 } }
  );
  */
  const data = await fetchPageBySlug(slug, locale);


  //const data = await res.json();

  if (!data || data.length === 0) return notFound();

  const page = data[0];

  return (
    <main className="container mx-auto px-4 py-24">
      
      <h1 dangerouslySetInnerHTML={{ __html: page.title.rendered }}/>

      <div
  className="wp-content mt-5"
  dangerouslySetInnerHTML={{ __html: page.content.rendered }}
/>

    </main>
  );
}
