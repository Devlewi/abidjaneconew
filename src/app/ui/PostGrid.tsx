"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { getTranslation } from "../utils/i18n";
import { formatLocalizedDate } from "../utils/stringUtils";

type Article = {
  id: number;
  title: string;
  excerpt?: string;
  slug: string;
  featured_image: string;
  date: string;
  views: number;
};

interface PostGridProps {
  dataPost: Article[];
  locale: string;
}

export default function PostGrid({ dataPost, locale }: PostGridProps) {
  const [isClient, setIsClient] = useState(false);
  const t = getTranslation(locale);
  const articlePath = t.singulararticle || "article";
  const view = t.view;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="block-content px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dataPost.map((article) => (
          <article key={article.id} className="l-post grid-post grid-base-post mb-8">
            <div className="media">
              <Link
                href={`/${locale}/${articlePath}/${article.slug}`}
                className="image-link media-ratio ratio-16-9"
                title={article.title}
              >
                <img
                  src={article.featured_image || "/fr/images/default1-img.webp"}
                  alt={article.title}
                  width={377}
                  height={220}
                  className="wp-post-image attachment-bunyad-medium size-bunyad-medium"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="content">
              <div className="post-meta post-meta-a post-meta-left has-below">
                {/* Titre */}
                <h4
                  className="is-title2 post-title line-clamp-2"
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 16,
                    marginTop:-15
                  }}
                >
                  <Link href={`/${locale}/${articlePath}/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>

                {/* Date + Heure */}
                <div className="post-meta-items meta-below" style={{ marginTop: "-4px", marginBottom: "-10px" }}>
                  <span className="meta-item post-author">
                    <span style={{ color: "#fff", fontWeight: 600 }}>
                      <i className="fa fa-clock" style={{ color: "#fff", paddingRight: 5 }} />
                      {formatLocalizedDate(article.date, locale)}
                    </span>
                  </span>
                  <span className="meta-item has-next-icon date" style={{ color: "#fff" }}>
                    <span className="date-link">
                      <time
                        className="post-date"
                        dateTime={article.date}
                        style={{ color: "#fff", fontWeight: 600 }}
                      >
                        {t.publishedAt}{" "}
                        <span style={{ color: "#fff" }}>
                          {new Date(article.date)
                            .toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })
                            .replace(":", "h")}
                        </span>
                      </time>
                    </span>
                  </span>
                </div>

                {/* Vue */}
                <div className="mt-[14px] mb-[-10px] text-[#fff] font-semibold flex items-center text-[12px]">
                  <FiEye className="mr-1" />
                  {article.views} {view}
                </div>

                {/* Extrait */}
                {article.excerpt && (
                  <div
                    className="excerpt truncate-2-lines"
                    style={{ color: "#fff" }}
                    dangerouslySetInnerHTML={{ __html: article.excerpt }}
                  />
                )}
              </div>
              </div>
          </article>
        ))}
      </div>
    </div>
  );
}
