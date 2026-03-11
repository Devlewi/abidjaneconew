/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import {
  FaAngleDoubleRight,
  FaHandPointRight,
  FaImage,  
} from "react-icons/fa";
import Link from "next/link";
import ShareButtons from "@/app/ui/ShareButtons";
import ThreeLastPostSimilComponent from "@/app/ui/ThreeLastPostSimilComponent";
import he, { decode } from "he";
import { getTranslation } from "@/app/utils/i18n";
import SidebarLatestPosts from "@/app/ui/SidebarLatestPosts";
import { fetchPost, fetchPostMeta } from "@/app/services/api";


type Props = {
  params: Promise<{ locale: string; slug: string }>; // On ajoute slug ici
};


// ✅ Meta avec Promise pour params
export async function generateMetadata({ params }: Props) {

  const { locale, slug } = await params;

  try {
    
    const post = await fetchPostMeta(slug, locale);
    if (!post) return {};
    return {
      title: he.decode(post.title),
      description: he.decode(post.excerpt),
      openGraph: {
        title: he.decode(post.title),
        description: he.decode(post.excerpt),
        images: [post.featured_image],
        url: he.decode(post.link),
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: he.decode(post.title),
        description: he.decode(post.excerpt),
        images: [post.featured_image],
      },
    };
  } catch {
    return {};
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = getTranslation(locale); // locale = "fr" ou "en"
  const latest = t.latest || '';
  const articles = t.articles || '';
  const samecategory = t.samecategory || '';
  const singulararticle = t.singulararticle || '';
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;


  const publishedBy = t.publishedBy || '';
  const publishedByOn = t.publishedByOn || '';
  const view = t.view || '';
  const home = t.home || '';

  //console.log("Langue actuelle : ", locale);
  //console.log("Slug de l'article : ", slug);
  //const { slug } = await params;

  try {
    const post = await fetchPost(slug, locale);
      
        //console.log(post.related_articles);
        //console.log(post);

    if (!post || !post.id) return notFound();
    const category = t.category || "";

    return (
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Section article principale */}
          <div className="lg:col-span-8">
            <article>
              {/* Chemin de fer avant le titre */}
              <div className="flex flex-wrap items-center space-x-2 mb-4 text-sm text-gray-500 overflow-hidden">
                <span className="truncate max-w-[100px]">
                  <Link href="/" className="hover:text-[#db2e44]">
                    {home}
                  </Link>
                </span>
                <FaAngleDoubleRight className="text-gray-500" />

                <Link href={`/${locale}/${category}/${post.categoriesdetails?.[0]?.slug}`}>                
                  <span className="truncate max-w-[150px]">
                    {decode(post.categoriesdetails?.[0]?.name) ?? "Category"}
                  </span>
                </Link>
                <FaAngleDoubleRight className="text-gray-500" />
                {/*text-gray-700 font-medium truncate max-w-[200px] */}
                {decode(post.title)}
              </div>

              {/* sub category */}
              <Link href={`/${locale}/${category}/${post.categoriesdetails?.[0]?.slug}`}>                
                <div className="bg-[#db2e44] border border-gray-300 rounded-md px-4 py-1.5 mb-4 inline-block shadow-sm text-white">
                  {decode(post.categoriesdetails?.[0]?.name) ?? "Catégorie"}
                </div>
              </Link>

              <h1 className="text-4xl font-bold mb-4">{decode(post.title)}</h1>

              <p className="text-sm text-gray-500 mb-4">
                {publishedBy} {he.decode(post.author)} {publishedByOn}{" "}
                {new Date(post.date_published).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                - {post.views} {view}
              </p>

              <ShareButtons locale={locale} singulararticle={singulararticle} post={post}  />

              {post.featured_image ? (
              <>
              <img
                src={post.featured_image}
                alt={post.title}
                loading="lazy"
                className="w-full min-h-[200px] object-cover rounded-lg mb-6"
              />
              
              {/* Crédit photo affiché ici */}
              {post.photo_credit && (
                      <p className="text-xs text-gray-500 mt-0 mb-0 italic text-left" style={{marginTop:-10}}>
                        {post.photo_credit}
                      </p>
                    )}
              </>
              
              ) : (
                <div className="w-full h-[250px] md:h-[550px] flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md mb-6">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <FaImage className="text-gray-400" size={64} />
                  <span className="text-sm text-gray-400">Aucune image</span>
                </div>
              </div>
              
              
              )}

              <div
                className="prose max-w-none text-base lg:text-[16px]" // Par défaut, taille de texte "base", sur desktop 16px
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="text-sm flex items-center">
                                                      <FaHandPointRight className="text-gray-500 mr-1" />
                                                      <a
                                                        href={`${whatsappLink}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#db2e44] no-underline hover:underline font-semibold"
                                                      >
                                                        {locale === "en"
                                                          ? "Follow the live information on our WHATSAPP channel"
                                                          : "Suivez l'information en direct sur notre chaîne WHATSAPP"}
                                                      </a>
                                                    </div>
            </article>

            <section className="related-posts">
              <div className="block-head block-head-ac block-head-c is-left">
                <h4 className="heading">
                {articles} <span className="text-[#db2e44]">{samecategory}</span>
                </h4>
              </div>
              <ThreeLastPostSimilComponent relatedArticles={post.related_articles} locale={locale} />

            </section>
          </div>

          {/* Section pub / contenu secondaire */}
          <SidebarLatestPosts
  locale={locale}
  latest={latest}
  articles={articles}
/>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return notFound();
  }
}
