/* eslint-disable @typescript-eslint/no-explicit-any */
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
// ✅ Version ultra-sécurisée utilisant le fetch principal
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const defaultTitle = "Abidjan Eco | L'actualité économique";

  try {
    let cleanSlug = decodeURIComponent(slug);
    cleanSlug = cleanSlug.replace(/['’]/g, '');

    // 💡 ON UTILISE fetchPost ICI AUSSI (Puisqu'on sait qu'il fonctionne parfaitement)
    const post = await fetchPost(cleanSlug, locale);
    
    if (!post || !post.title) {
      return { title: defaultTitle };
    }

    // Extraction propre du texte du titre
    // ✅ Version corrigée pour TypeScript (sans toucher à votre logique)
const targetPost = post as any;

const titleText = typeof targetPost.title === 'object' && targetPost.title?.rendered 
  ? targetPost.title.rendered 
  : targetPost.title;

    return {
      title: `${he.decode(titleText)} | Abidjan Eco`,
      description: post.excerpt ? he.decode(post.excerpt) : "",
      openGraph: {
        title: he.decode(titleText),
        description: post.excerpt ? he.decode(post.excerpt) : "",
        images: post.featured_image ? [post.featured_image] : [],
        type: "article",
      }
    };
  } catch (error) {
    console.error("Erreur SEO generateMetadata :", error);
    return { title: defaultTitle };
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  //console.log("Langue actuelle : ", locale);
  //console.log("Slug de l'article : ", slug);
  //const { slug } = await params;
const t = getTranslation(locale); // locale = "fr" ou "en"
const latest = t.latest || '';
const singulararticle = t.singulararticle || '';
const articles = t.articles || '';
const samecategory = t.samecategory || '';
const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;

  try {
    const cleanSlug = decodeURIComponent(slug);
    const post = await fetchPost(cleanSlug, locale);
  
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
                    Accueil
                  </Link>
                </span>
                <FaAngleDoubleRight className="text-gray-500" />

                
                <Link href={`/${locale}/${category}/${post.categoriesdetails?.[0]?.slug}`}>
                  <span className="truncate max-w-[150px]">
                    {decode(post.categoriesdetails?.[0]?.name) ?? "Catégorie"}
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
                Publié par {post.author} le{" "}
                {new Date(post.date_published).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                - {post.views} vues
              </p>

              <ShareButtons locale={locale} singulararticle={singulararticle} post={post}  />
              {/* locale,singulararticle,post */}

              

              {post.featured_image ? (
<>
<div className="relative w-full mb-6 group">
    {/* L'image principale */}
    <img
      src={post.featured_image}
      alt={post.title}
      loading="lazy"
      className="w-full min-h-[200px] max-h-[500px] object-cover rounded-lg"
    />

    {/* Le crédit photo positionné en étiquette en bas à droite de l'image */}
    {post.photo_credit && (
      <p className="absolute bottom-3 right-3 bg-black/65 text-white text-[11px] font-medium py-1 px-2.5 rounded italic shadow-sm pointer-events-none z-10 m-0 backdrop-blur-[2px]">
        {post.photo_credit}
      </p>
    )}
  </div>
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
    className="wp-content prose max-w-none text-base lg:text-[16px] 
               [&_.wp-caption]:relative [&_.wp-caption]:block [&_.wp-caption]:!w-full [&_.wp-caption]:max-w-full [&_.wp-caption]:mb-6
               [&_.wp-caption_img]:w-full [&_.wp-caption_img]:h-auto [&_.wp-caption_img]:object-cover [&_.wp-caption_img]:rounded-lg
               [&_.wp-caption-text]:absolute [&_.wp-caption-text]:bottom-3 [&_.wp-caption-text]:right-3 
               [&_.wp-caption-text]:bg-black/65 [&_.wp-caption-text]:text-white [&_.wp-caption-text]:text-xs 
               [&_.wp-caption-text]:py-1 [&_.wp-caption-text]:px-2.5 [&_.wp-caption-text]:rounded [&_.wp-caption-text]:italic 
               [&_.wp-caption-text]:m-0 [&_.wp-caption-text]:pointer-events-none" 
    dangerouslySetInnerHTML={{ 
      __html: post.content 
        ? post.content.replace(/<p><strong>\s*LIRE AUSSI\s*:/gi, '<p class="lire-aussi-box"><strong>LIRE AUSSI :') 
        : "" 
    }}
/>

{/*
<div
                className="wp-content prose max-w-none text-base lg:text-[16px] wp-content" // Par défaut, taille de texte "base", sur desktop 16px
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
*/}

              <br/>
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

            
            <section className="related-posts mt-[80px]">
              <div className="block-head block-head-ac block-head-c is-left">
                <h4 className="heading">
                  {articles} <span className="text-[#db2e44]"> {samecategory}</span>
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
