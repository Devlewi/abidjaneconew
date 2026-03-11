/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
import CatArticleSkeleton from "./CatArticleSkeleton"; // à adapter selon ton chemin
import { decode } from "he";
import { getTranslation } from "../utils/i18n";
import { formatLocalizedDate } from "../utils/stringUtils";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  link: string;
  slug: string;
  featured_image?: string;
  photo_credit?: string;
  date_published: string;
};

type CatArticleListProps = {
  data: Post[];
  categoryName: string;
  locale: string;
};

export default function CatArticleList({
  data,
  categoryName,
  locale,
}: CatArticleListProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const t = getTranslation(locale); // locale = "fr" ou "en"
  const no_articles = t.no_articles || "";
  const publishedAt = t.publishedAt || "";

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 1000); // délai simulé
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="loop loop-list loop-sep loop-list-sep grid grid-cols-1 md:grid-cols-1 gap-4">
      {isLoading ? (
        <CatArticleSkeleton count={6} />
      ) : data.length === 0 ? (
        <div className="text-gray-500 py-0 col-span-full text-[15px] font-semibold">
          {no_articles}
        </div>
      ) : (
        data.map((article) => (
          <article
            key={article.id}
            className="l-post small-post small-a-post m-pos-left"
            style={{ marginBottom: -10 }}
          >
              <div className="small-media relative"> {/* <-- parent positionné */}

              <Link
                href={`/${locale}/article/${article.slug}`}
                className="small-media image-link media-ratio ar-bunyad-thumb"
                title={decode(article.title)}
              >
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md z-0" />
                )}
                <img
                  src={article.featured_image || "/fr/images/default1-img.webp"}
                  alt={decode(article.title)}
                  onLoad={() => setImageLoaded(true)}
                  className={`rounded-md transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  } z-10`}
                  style={{ borderRadius: "6px" }}
                />
                         {/* Crédit photo superposé en bas à gauche */}
      {article.photo_credit && (
        <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[10px] px-2 py-2 mb-0 rounded z-50 max-w-[95%] truncate">
          {article.photo_credit}
        </div>
      )}
              </Link>
            </div>

            <div className="content">
              <div>
                <Link href={``}>
                  <div className="bg-[#1a2a54] border border-gray-300 rounded-md px-4 py-1.5 mb-4 inline-block shadow-sm text-white max-w-full">
                    {decode(categoryName)}
                  </div>
                </Link>

                <h2 className="is-title post-tite text-[#db2e44] font-bold line-clamp-2 mb-2 text-[18px]">
                  <Link
                    href={`/${locale}/article/${article.slug}`}
                    className="text-[#db2e44] hover:text-[#db2e44]"
                  >
                    {decode(article.title)}
                  </Link>
                </h2>

                <div className="excerpt text-[13px] leading-relaxed text-[#1a2a54]">
                  <p>{decode(article.excerpt)}</p>
                </div>

                <br />
                <div className="post-meta-items meta-below mt-[-10px] mb-4 text-sm text-[#1a2a54] font-bold">
                  <span className="meta-item post-author flex items-center">
                    <FaClock className="text-[gray] mr-0" size={14} />
                    &nbsp;
                    {formatLocalizedDate(article.date_published, locale)} - 
                    &nbsp;
                    {publishedAt} &nbsp;
                    {new Date(article.date_published).toLocaleTimeString(locale, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}).replace(":", "h")}

                  </span>

                  
                </div>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  );
}
