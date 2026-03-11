/* eslint-disable @next/next/no-img-element */
import React from "react";
import { decodeHTML, formatLocalizedDate, formatViews } from "../utils/stringUtils";
import { getTranslation } from "../utils/i18n";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import Head from "next/head";

type Article = {
  link: string;
  thumbnail: string;
  featured_image: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  views: string;
  photo_credit: string;
};

type ThirdSectionBloc2ComponentProps = {
  locale: string;
  articleEmplacement2: Article | null;
};

const ThirdSectionBloc2Component: React.FC<ThirdSectionBloc2ComponentProps> = ({
  locale,
  articleEmplacement2,
}) => {
  const t = getTranslation(locale);
  const view = t.view || "";
  const singulararticle = t.singulararticle || "";

  const imageSrc =
  articleEmplacement2?.featured_image || "/fr/images/default1-img.webp";

  return (
    <>

<Head>
        {/* Précharge l'image pour optimiser le LCP */}
        <link rel="preload" as="image" href={imageSrc} />
</Head>
    <article className="l-post grid-post grid-base-post">
      <div className="media">
      {articleEmplacement2 ? (
        <>
        
          <Link
            href={`/${locale}/${singulararticle}/${articleEmplacement2.slug}`}
            className="image-link media-ratio ratio-16-9"
            title={articleEmplacement2.title}
          >
            <img
              src={
                articleEmplacement2.featured_image ||
                "/fr/images/default1-img.webp"
              }
              alt={articleEmplacement2.title}
              width={377}
              height={220}
              className="wp-post-image attachment-bunyad-medium size-bunyad-medium"
              loading="lazy"
            />
          </Link>
          
          {/* Crédit photo affiché ici */}
      {articleEmplacement2.photo_credit && (
        <p className="text-xs text-gray-500 mt-2 mb-0 italic text-left">
          {articleEmplacement2.photo_credit}
        </p>
      )}
        </>
        ) : (
          <div className="w-full md:w-[900px] h-[200px] md:h-[350px] bg-gray-300 rounded"></div>
        )}
      </div>

      <div className="content">
        <div className="post-meta post-meta-a has-below">
          <h2
            className="is-title post-title hover:text-[#b71c2b] transition-colors duration-300 truncate-2-lines"
            style={{ color: "#db2e44", fontWeight: 700,  fontSize:18 }}
          >
            {articleEmplacement2 ? (
              <Link href={`/${locale}/${singulararticle}/${articleEmplacement2.slug}`}>
                {decodeHTML(articleEmplacement2.title)}
              </Link>
            ) : (
              <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse" />
            )}
          </h2>

          <div className="post-meta-items meta-below">
            <span className="meta-item post-author">
              <a
                href="#"
                title="Posts by Shane Doe"
                style={{ color: "#1a2a54", fontWeight: 600 }}
                rel="author"
              >
                <i
                  className="fa fa-clock"
                  style={{ color: "#db2e44", paddingRight: 5 }}
                />
                {articleEmplacement2 ? (
                  formatLocalizedDate(articleEmplacement2?.date || "", locale)
                ) : (
                  <span className="bg-gray-300 rounded h-4 w-24 inline-block animate-pulse" />
                )}
              </a>
            </span>

            <span
              className="meta-item has-next-icon date"
              style={{ color: "#1a2a54" }}
            >
              <span className="date-link">
                <time
                  className="post-date"
                  dateTime={articleEmplacement2?.date}
                  style={{ color: "#1a2a54", fontWeight: 600 }}
                >
                  {t.publishedAt}{" "}
                  <span style={{ color: "#db2e44" }}>
                    {articleEmplacement2 ? (
                      new Date(articleEmplacement2.date)
                        .toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                        .replace(":", "h")
                    ) : (
                      <span className="bg-gray-300 rounded h-4 w-16 inline-block animate-pulse" />
                    )}
                  </span>
                  {/*articleEmplacement2 && (
                                      <span className="">{" - "} {formatViews(articleEmplacement2.views)} {view}</span>
                                    )*/}
                </time>
              </span>
            </span>
          </div>
        </div>

        {articleEmplacement2 && (
                            <div className="mt-[4px] mb-[-10px] text-[#1a2a54] font-semibold flex items-center text-[12px]">
                            <FiEye className="mr-1" />
                            {formatViews(articleEmplacement2.views)} {view}
                        </div>
                          )}
                

        <div className="excerpt truncate-4-lines" style={{ color: "#1a2a54" }}>
          {articleEmplacement2 ? (
            <p>{decodeHTML(articleEmplacement2.excerpt)}</p>
          ) : (
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </article>
    </>
  );
};

export default ThirdSectionBloc2Component;
