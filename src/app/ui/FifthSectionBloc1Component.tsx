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

type FifthSectionBloc1ComponentProps = {
  locale: string;
  articleEmplacement1: Article | null;
};

const FifthSectionBloc1Component: React.FC<FifthSectionBloc1ComponentProps> = ({
  locale,
  articleEmplacement1,
}) => {
  const t = getTranslation(locale);
  const category = t.category || "";
  const articlePath = t.singulararticle || "article";
  const view = t.view || "";
  const date = articleEmplacement1?.date ? new Date(articleEmplacement1.date) : null;
  const hours = date ? date.getHours().toString().padStart(2, "0") : "00";
  const minutes = date ? date.getMinutes().toString().padStart(2, "0") : "00";
  const formattedTime = `${hours}h${minutes}`;

  const [imageLoaded, setImageLoaded] = useState(false);

  if (!articleEmplacement1) {
    // SKELETON UI
    return (
      <article className="l-post grid-post grid-base-post mb-[50px] animate-pulse">
        <div className="small-media">
          <div className="w-full md:w-[305px] md:h-[200px] h-[230px] bg-gray-300 rounded"></div>
        </div>
        <div className="content">
          <div className="post-meta post-meta-a post-meta-left has-below">
            <h4 className="is-title post-title">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            </h4>

            <div className="post-meta-items meta-below" style={{ marginTop: "-4px", marginBottom: "-10px" }}>
              <span className="meta-item post-author">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-1"></div>
              </span>
              <span className="">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </span>
            </div>

            <div className="excerpt">
              <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ARTICLE UI
  return (
    <article className="l-post grid-post grid-base-post mb-[50px]">
      <div className="medium-media relative">
        <div className="absolute top-0 left-0 mt-[-15px] z-20">
          {articleEmplacement1.subcategory?.slug && articleEmplacement1.subcategory?.name ? (
            <Link
              href={`/${locale}/${category}/${articleEmplacement1.subcategory.slug}`}
              className="bg-[#1f3162] p-2 text-white rounded-md font-semibold"
            >
              <span>{decodeHTML(articleEmplacement1.subcategory.name)}</span>
            </Link>
          ) : (
            <div className="bg-gray-700 p-2 text-gray-500 rounded-md font-semibold">
              emplacement vide
            </div>
          )}
        </div>

        {articleEmplacement1.slug ? (
          
          <>
          <Link
            href={`/${locale}/${articlePath}/${articleEmplacement1.slug}`}
            className="small-media image-link media-ratio ar-bunyad-thumb"
            title={decodeHTML(articleEmplacement1.title)}
          >
            <img
              src={articleEmplacement1.featured_image || "/fr/images/default1-img.webp"}
              alt={decodeHTML(articleEmplacement1.title || "Image indisponible")}
              className={`wp-post-image attachment-bunyad-medium size-bunyad-medium rounded-md transition-opacity duration-700 ${
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
            {articleEmplacement1.photo_credit && (
            <p className="text-xs text-gray-500 mt-2 mb-0 italic text-left">
              {articleEmplacement1.photo_credit}
            </p>
          )}

          </>
        ) : (
          <div className="small-media image-link media-ratio ar-bunyad-thumb">
            <img
              src="/fr/images/default1-img.webp"
              alt="Image par défaut"
              className="wp-post-image attachment-bunyad-medium size-bunyad-medium rounded-md opacity-100"
              loading="lazy"
              width={300}
              height={200}
              style={{ borderRadius: 6 }}
            />
          </div>
        )}
      </div>

      <div className="content">
        <div className="post-meta post-meta-a post-meta-left has-below">
          
        <h4
            className="is-title2 post-title line-clamp-2"
            style={{
              color: "#db2e44",
              fontWeight: 700,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize:16,
            }}
          >          
            <Link href={`/${locale}/${articlePath}/${articleEmplacement1.slug}`} className="">
              {decodeHTML(articleEmplacement1.title)}
            </Link>
          </h4>

          <div className="post-meta-items meta-below" style={{ marginTop: "-4px", marginBottom: "-10px" }}>
            <span className="meta-item post-author">
              <span style={{ color: "#1a2a54", fontWeight: 600 }}>
                <i className="fa fa-clock" style={{ color: "#db2e44", paddingRight: 5 }} />
                {formatLocalizedDate(articleEmplacement1.date, locale)}
              </span>
            </span>
            <span className="meta-item has-next-icon date" style={{ color: "#1a2a54" }}>
              <span className="date-link">
                <time
                  className="post-date"
                  dateTime={articleEmplacement1.date}
                  style={{ color: "#1a2a54", fontWeight: 600 }}
                >
                  {t.publishedAt}{" "}
                  <span style={{ color: "#db2e44" }}>{formattedTime}</span>
                </time>
              </span>
            </span>
          </div>

          <div className="mt-[14px] mb-[-10px] text-[#1a2a54] font-semibold flex items-center text-[12px]">
            <FiEye className="mr-1" />
            {formatViews(articleEmplacement1.views)} {view}
          </div>

          <div className="excerpt truncate-2-lines" style={{ color: "#1a2a54" }}>
            <p>{decodeHTML(articleEmplacement1.excerpt)}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FifthSectionBloc1Component;
