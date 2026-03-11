/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { decodeHTML, formatLocalizedDate, formatViews } from "../utils/stringUtils";
import { getTranslation } from "../utils/i18n";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

interface Article {
  emplacement: number;
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  views: string;
  link: string;
  thumbnail: string;
  featured_image: string;
  date: string;
  photo_credit: string;
  subcategory: {
    id: number;
    name: string;
    slug: string;
  };
}

type ThirdSectionBloc3ComponentProps = {
  locale: string;
  articleEmplacement3: Article | null;
};

const ThirdSectionBloc3Component: React.FC<ThirdSectionBloc3ComponentProps> = ({
  locale,
  articleEmplacement3,
}) => {
  const t = getTranslation(locale);
  const category = t.category || "";
  const articlePath = t.singulararticle || "article";
  const view = t.view || "";

  const date = articleEmplacement3?.date
    ? new Date(articleEmplacement3?.date)
    : null;
  const hours = date ? date.getHours().toString().padStart(2, "0") : "00";
  const minutes = date ? date.getMinutes().toString().padStart(2, "0") : "00";
  const formattedTime = `${hours}h${minutes}`;

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="l-post small-post small-a-post m-pos-left">
      <div className="small-media relative">
        <div className="absolute top-0 left-0 mt-[-15px] z-20">
          {articleEmplacement3 && articleEmplacement3.subcategory ? (
  <Link
    href={`/${locale}/${category}/${articleEmplacement3.subcategory.slug}`}
    className="bg-[#1f3162] p-2 text-white rounded-md font-semibold"
  >
    <span>{decodeHTML(articleEmplacement3.subcategory.name)}</span>
  </Link>
) : (
  <div className="bg-gray-300 animate-pulse h-7 w-32 rounded-md" />
)}

        </div>

        {articleEmplacement3 ? (
          <>
          
          <Link
            href={`/${locale}/${articlePath}/${articleEmplacement3.slug}`}
            className="small-media image-link media-ratio ar-bunyad-thumb"
            title={decodeHTML(articleEmplacement3.title)}
          >
            <img
              src={
                articleEmplacement3.featured_image || "/fr/images/default1-img.webp"
              }
              alt={decodeHTML(articleEmplacement3.title)}
              className={`wp-post-image attachment-bunyad-medium size-bunyad-medium rounded-md ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              width={300}
              height={200}
              style={{ borderRadius: 6 }}
            />
          </Link>

                         {/* Crédit photo affiché ici */}
      {articleEmplacement3.photo_credit && (
        <p className="text-xs text-gray-500 mt-2 mb-0 italic text-left">
          {articleEmplacement3.photo_credit}
        </p>
      )}

          </>

        ) : (
          <div className="w-full md:w-[250px] md:h-[200px] h-[230px] bg-gray-300 rounded"></div>
        )}
      </div>

      <div className="content">
        <div className="post-meta post-meta-a post-meta-left has-below">
          <h3
            className="is-title post-title line-clamp-2"
            style={{
              color: "#db2e44",
              fontWeight: 700,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {articleEmplacement3 ? (
              <Link
                href={`/${locale}/${articlePath}/${articleEmplacement3.slug}`}
              >
                {decodeHTML(articleEmplacement3.title)}
              </Link>
            ) : (
              <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
            )}
          </h3>

          <div
            className="post-meta-items meta-below"
            style={{
              marginTop: "-4px",
              marginBottom: "-10px",
            }}
          >
            <span className="meta-item post-author">
              <a
                href="#"
                title=""
                style={{
                  color: "#1a2a54",
                  fontWeight: 600,
                }}
                rel="author"
              >
                <i
                  className="fa fa-clock"
                  style={{
                    color: "#db2e44",
                    paddingRight: 5,
                  }}
                />
                {articleEmplacement3
                  ? formatLocalizedDate(articleEmplacement3.date, locale)
                  : <span className="bg-gray-200 h-4 w-20 inline-block animate-pulse rounded" />}
              </a>
            </span>

            <span
              className="meta-item has-next-icon date"
              style={{ color: "#1a2a54" }}
            >
              <span className="date-link">
                <time
                  className="post-date"
                  dateTime={articleEmplacement3?.date}
                  style={{
                    color: "#1a2a54",
                    fontWeight: 600,
                  }}
                >
                  {t.publishedAt}{" "}
                  <span style={{ color: "#db2e44" }}>
                    {articleEmplacement3 ? (
                      formattedTime
                    ) : (
                      <span className="bg-gray-200 h-4 w-12 inline-block animate-pulse rounded" />
                    )}
                  </span>                  
                </time>
              </span>
            </span>
          </div>

                  {articleEmplacement3 && (
                    <div className="flex items-center mt-[15px] mb-[-10px] text-[#1a2a54] font-semibold">
                    <FiEye className="mr-1" />
                    {formatViews(articleEmplacement3.views)} {view}
                  </div>
                  
                  )}

<div
            className="excerpt truncate-4-lines"
            style={{ color: "#1a2a54" }}
          >
            {articleEmplacement3 ? (
              <p>{decodeHTML(articleEmplacement3.excerpt)}</p>
            ) : (
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              </div>
            )}
          </div>          
        </div>
      </div>
    </article>
  );
};

export default ThirdSectionBloc3Component;
