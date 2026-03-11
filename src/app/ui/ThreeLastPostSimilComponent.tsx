/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React from "react";
import { decode } from "he";
import { getTranslation } from "../utils/i18n";
//import { FaImage } from "react-icons/fa";

type RelatedArticle = {
  link: string;
  title: string;
  slug: string;
  featured_image: string;
  date_published: string;
};

interface Props {
  relatedArticles: RelatedArticle[];
  locale: string; // Ajouté ici
}

const ThreeLastPostSimilComponent: React.FC<Props> = ({
  relatedArticles,
  locale,
}) => {

  const t = getTranslation(locale); // locale = "fr" ou "en"
  const singulararticle = t.singulararticle || "";
  if (!relatedArticles?.length) return null;

  return (
    <section className="block-wrap block-grid cols-gap-sm mb-none" data-id={6}>
      <div className="block-content">
        <div className="loop loop-grid loop-grid-sm grid grid-3 md:grid-2 xs:grid-1">
          {relatedArticles.map((related, index) => (
            <article key={index} className="l-post grid-post grid-sm-post">
              <div className="media">
              <Link
  href={`/${locale}/${singulararticle}/${related.slug}`}
  title={related.title}
>
  <img
    src={related.featured_image || "/fr/images/default1-img.webp"}
    alt={related.title}
    className="w-full h-64 sm:h-48 object-cover rounded-md"
  />
</Link>

              </div>
              <div className="content">
                <div className="post-meta post-meta-a has-below">
                  <h4 className="is-title post-title truncate-2-lines">
                    <Link
                      href={`/${locale}/${singulararticle}/${related.slug}`}
                      className=""
                      title={related.title}
                    >
                      {decode(related.title)}
                    </Link>
                  </h4>
                  <div className="post-meta-items meta-below">
                    <span className="meta-item date">
                      <span className="date-link">
                        <time
                          className="post-date"
                          dateTime={related.date_published}
                        >
                          {new Date(
                            related.date_published
                          ).toLocaleDateString()}
                        </time>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeLastPostSimilComponent;
