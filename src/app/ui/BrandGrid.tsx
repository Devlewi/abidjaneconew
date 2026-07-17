"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import he from "he";
//import { getTranslation } from "../utils/i18n";

// Fonction utilitaire pour décoder HTML
function decodeHTML(html: string) {
  return he.decode(html);
}

// Formattage des vues
function formatViews(views: number) {
  return views.toLocaleString();
}

// Formattage date localisée
function formatLocalizedDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type Article = {
  id: number;
  title: string;
  slug: string;
  link: string;
  brand_name: string;
  brand_logo: string;
  date: string;
  thumbnail: string;
  featured_image: string;
  excerpt: string;
  photo_credit?: string;
  views: number;
  subcategory?: {
    slug: string;
    name: string;
  };
};

interface BrandGridProps {
  dataArticles: Article[];
  locale: string;
}

export default function BrandGrid({ dataArticles, locale }: BrandGridProps) {
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="block-content">
      <div className="loop loop-grid loop-grid-sm grid grid-3 md:grid-2 xs:grid-1 gap-6">
        {dataArticles.map((article) => {
          //const t = getTranslation(locale);
          const imageLoaded = loadedImages[article.id] || false;
          const articlePath = "article"; // chemin article
          //const category = t.category || "";
          //const postcategory = article.subcategory?.slug || "";

          return (
            <article
              key={article.id}
              className="l-post grid-post grid-base-post mb-[50px] bg-[transparent] p-4 rounded-md"
            >
              <div className="medium-media relative">
  {/* Brand : nom + logo */}
  <div className="flex items-center gap-2 mb-2">
    {article.brand_logo && (
      <img
        src={article.brand_logo}
        alt={article.brand_name}
        className="h-20 w-20 rounded-md"
      />
    )}
    <span className="text-white font-semibold">{article.brand_name}</span>
  </div>
  {/* Badge catégorie */}


  {/* Image */}
  {/* ✅ Ajout de "relative block" sur le Link pour ancrer le crédit photo à l'image */}
  <Link
    href={`/${locale}/${articlePath}/${article.slug}`}
    className="small-media image-link media-ratio ar-bunyad-thumb relative block"
    title={decodeHTML(article.title)}
  >
    <img
      src={article.featured_image || "/fr/images/default1-img.webp"}
      alt={decodeHTML(article.title || "Image indisponible")}
      className={`wp-post-image attachment-bunyad-medium size-bunyad-medium rounded-md transition-opacity duration-700 ${
        imageLoaded ? "opacity-100" : "opacity-0"
      }`}
      loading="lazy"
      onLoad={() => handleImageLoad(article.id)}
      width={300}
      height={200}
      style={{ borderRadius: 6 }}
    />

    {/* ✅ Le crédit photo est placé directement DANS le Link en absolute bas-droite */}
    {article.photo_credit && (
      <span className="absolute bottom-1.5 right-1.5 bg-black/65 text-white text-[9px] font-medium py-0.5 px-1.5 rounded italic shadow-sm pointer-events-none z-10 m-0 backdrop-blur-[2px] max-w-[85%] truncate">
        {article.photo_credit}
      </span>
    )}
  </Link>
</div>

              {/* Contenu */}
              <div className="content mt-3">
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
                  }}
                >
                  <Link href={`/${locale}/${articlePath}/${article.slug}`}>
                    {decodeHTML(article.title)}
                  </Link>
                </h4>

                <div
                  className="post-meta-items meta-below mt-1"
                  style={{ marginTop: "-4px", marginBottom: "-10px" }}
                >
                  <span className="meta-item post-author">
                    <span style={{ color: "#fff", fontWeight: 600 }}>
                      <i
                        className="fa fa-clock"
                        style={{ color: "#fff", paddingRight: 5 }}
                      />
                      {formatLocalizedDate(article.date, locale)}
                    </span>
                  </span>
                </div>

                {/* Vues */}
                <div className="mt-[14px] mb-[-10px] text-[#fff] font-semibold flex items-center text-[12px]">
                  <FiEye className="mr-1" />
                  {formatViews(article.views)} vues
                </div>

                {/* Excerpt */}
                <div className="excerpt truncate-2-lines mt-2">
                  <p className="text-gray-400">{decodeHTML(article.excerpt)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
