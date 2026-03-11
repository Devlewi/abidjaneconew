/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { decodeHTML, formatLocalizedDate } from "../utils/stringUtils";
import Link from "next/link";
import { getTranslation } from "../utils/i18n";
import { getLastPosts } from "../services/api";

// Définir un type pour chaque article
type Article = {
  featured_image: string;
  link: string;
  slug: string;
  title: string;
  photo_credit: string;
  date_published: string;
  views: number;
};

// Typage des props
interface Props {
  locale: string;
}

const SixLastPostListComponent: React.FC<Props> = ({ locale }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const t = getTranslation(locale); // locale = "fr" ou "en"
  //const latest = t.latest || "";
  //const articl = t.articles || "";
  //const category = t.category || "";
  //const publishedOn = t.publishedOn || "";
  const view = t.view || "";
  const singulararticle = t.singulararticle || "";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getLastPosts(locale);
        console.log("data = ", data);
        setArticles(data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [locale]);

  // Si le chargement est en cours, afficher un skeleton loader
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <article
            key={index}
            className="flex flex-col md:flex-row rounded-lg overflow-hidden pb-1 animate-pulse"
          >
            {/* Image skeleton */}
            <div className="md:w-1/3 w-full">
              <div className="w-full h-32 bg-gray-300 rounded"></div>
            </div>

            {/* Contenu skeleton */}
            <div className="md:w-2/3 w-full md:pl-4 flex flex-col justify-center pt-2 md:pt-0">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return <p>Aucun article trouvé.</p>;
  }

  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row rounded-lg overflow-hidden pb-1 ${
            index < 2 ? "border-b border-gray-200" : ""
          }`}
        >
          {/* Image à gauche */}
          <div className="md:w-1/3 w-full relative">
  <Link href={`/${locale}/${singulararticle}/${article.slug}`}>
    {/* Image avec cover ici yes*/}
    <img
      src={article.featured_image || "/fr/images/default1-img.webp"}
      alt={`Article ${index + 1}`}
      className="w-full md:h-32 h-[200px] object-cover rounded-md"
    />

    {/* Crédit photo superposé */}
    {article.photo_credit && (
      <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[10px] px-2 py-1 rounded z-50 max-w-[95%] truncate">
        {article.photo_credit}
      </div>
    )}
  </Link>
</div>

          {/* Contenu à droite */}
          <div className="md:w-2/3 w-full md:pl-4 flex flex-col justify-center pt-2 md:pt-0">
            <h3 className="text-[15px] font-semibold mb-2 truncate-2-lines">
              <Link href={`/${locale}/${singulararticle}/${article.slug}`}>
                {decodeHTML(article.title)}
              </Link>
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <FaClock className="mr-1" />
              {formatLocalizedDate(article.date_published, locale)}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              {article.views} {view}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SixLastPostListComponent;
