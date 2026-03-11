/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import {
  FaAngleDoubleRight,
  FaHandPointRight,
} from "react-icons/fa";
import Link from "next/link";
import SixLastPostListComponent from "@/app/ui/SixLastPostListComponent";
import he, { decode } from "he";
import { getTranslation } from "@/app/utils/i18n";
import ShareVideoButtons from "@/app/ui/ShareVideoButtons";
import { fetchFeaturedVideoResponse } from "@/app/services/api";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

type VideoPost = {
  id: number;
  title: string;
  slug: string;
  link: string;
  date_published: string;
  thumbnail: string | false;
  url_video: string;
  views: number;
  content: string;
  author: string;
  author_link: string;
  fichier_pdf_image?: string;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/featuredvideo/${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return {};

    const post: VideoPost = await res.json();

    return {
      title: post.title,
      description: post.content.replace(/<[^>]+>/g, '').slice(0, 160),
      openGraph: {
        title: post.title,
        description: post.content.replace(/<[^>]+>/g, '').slice(0, 160),
        images: post.thumbnail ? [post.thumbnail] : [],
        url: post.url_video,
        type: "video.other",
      },
      twitter: {
        card: "player",
        title: post.title,
        description: post.content.replace(/<[^>]+>/g, '').slice(0, 160),
        images: post.thumbnail ? [post.thumbnail] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function VideoPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = getTranslation(locale);
  const latest = t.latest || '';
  const publishedBy = t.publishedBy || '';
  const publishedByOn = t.publishedByOn || '';
  const featuredvideo2 = t.featuredvideo2 || '';
  const articles = t.articles || '';
  const featuredVidSlug = t.featuredVidSlug || '';
  const view = t.view || '';
  const home = t.home || '';
  const videopath = t.videopath || '';
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;

  //const singulararticle = t.singulararticle || '';
  try {
    const res = await fetchFeaturedVideoResponse(slug);

    if (!res.ok) return notFound();
    
    
    
    const post: VideoPost = await res.json();

    if (!post || !post.id) return notFound();

    return (
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Section principale */}
          <div className="lg:col-span-8">
            <article>
              {/* Fil d’Ariane */}
              <div className="flex flex-wrap items-center space-x-2 mb-4 text-sm text-gray-500 overflow-hidden">
                <span className="truncate max-w-[100px]">
                  <Link href="/" className="hover:text-[#db2e44]">
                    {home}
                  </Link>
                </span>
                <FaAngleDoubleRight className="text-gray-500" />
                <Link href={`/${featuredVidSlug}`}>
                  <span className="truncate max-w-[150px]">{featuredvideo2}</span>
                </Link>
                <FaAngleDoubleRight className="text-gray-500" style={{marginRight:4}}/>
                {decode(post.title)}
              </div>

              <h1 className="text-4xl font-bold mb-4">{decode(post.title)}</h1>

              <p className="text-sm text-gray-500 mb-4">
                {publishedBy}{" "}
                <Link href={`#`}>
                  {post.author}
                </Link>{" "}
                {publishedByOn} {" "}
                {new Date(post.date_published).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                - {post.views} {view}
              </p>

              <ShareVideoButtons locale={locale} videopath={videopath} post={post}  />

              {/* Affichage vidéo YouTube intégrée */}
              <div className="mb-6 aspect-w-16 aspect-h-9">
              <iframe
                  width="100%"
                  height="480"
                  src={post.url_video.replace("watch?v=", "embed/")}
                  title={he.decode(post.title)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={he.decode(post.title)}
                  loading="lazy"
                  className="w-full min-h-[200px] object-cover rounded-lg mb-6"
                />
              )}

              <div
                className="prose max-w-none text-base lg:text-[16px] wp-content"
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
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 mt-8">
            <div className="sticky top-20">
              <div className="block-head block-head-ac block-head-c is-left">
                <h4 className="heading">
                  {latest} <span className="text-[#db2e44]"> {articles}</span>
                </h4>
              </div>

              <SixLastPostListComponent locale={locale} />

              <br />
              <br />

              <div className="w-[300px] h-[600px] bg-gray-300 flex items-center justify-center sm:mx-0 mx-auto">
                <span className="text-gray-600">Espace pub</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching video post:", error);
    return notFound();
  }
}
