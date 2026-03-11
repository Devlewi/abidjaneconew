/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getTranslation } from "../utils/i18n";
import { FiEye } from "react-icons/fi";
import { formatDuration, getEmbedUrl } from "../utils/stringUtils";
import SixLastPostListComponent from "./SixLastPostListComponent";
import { fetchFeaturedVideos } from "../services/api";

// Typage des données d'un communiqué
type VideoalauneItem = {
  id: number;
  date: string;
  title: string;
  content: string;
  slug: string;
  url_video?: string;
  views?: number;
  duree_en_seconde: string;
};

export default function VideosAlaUneClient({ locale }: { locale: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [videoalauneInfo, setvideoalauneInfo] = useState<VideoalauneItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  const t = getTranslation(locale);
  const pressreleases = t.featuredvideo2 || "";
  const view = t.view || "";
  const duration = t.duration || "";
  const next = t.next || "";
  const nodata = t.nodata || "";
  const previous = t.previous || "";
  const videopath = t.videopath || "";
  const featuredVidSlug = t.featuredVidSlug || "";
  const searchParams = useSearchParams();
  const latest = t.latest || "";
  const articles = t.articles || "";

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchFeaturedVideos(locale, page, perPage);
  
      if (!result || !result.data) {
        console.error("Erreur lors du chargement.");
        setvideoalauneInfo([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }
  
      const mappedData: VideoalauneItem[] = result.data.map((item: any) => ({
        id: item.id,
        date: item.date,
        title: item.title,
        content: item.content,
        slug: item.slug,
        url_video: item.url_video,
        views: item.views ?? 0,
        duree_en_seconde: item.duree_en_seconde,
      }));
  
      setvideoalauneInfo(mappedData);
      setTotalPages(result.total_pages || 1);
      setLoading(false);
    };
  
    fetchData();
  }, [locale, page]);
  
  const generatePageNumbers = (currentPage: number, total: number) => {
    const range: (number | string)[] = [];
    const maxPages = 5;

    range.push(1);

    if (total > maxPages) {
      if (currentPage > 3) range.push("...");
      if (currentPage > 2) range.push(currentPage - 1);
      range.push(currentPage);
      if (currentPage < total - 1) range.push(currentPage + 1);
      if (currentPage < total - 2) range.push("...");
    } else {
      for (let i = 2; i <= total; i++) {
        range.push(i);
      }
    }

    if (!range.includes(total)) range.push(total);

    return range;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="container mx-auto px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-left mb-6  mt-5 lg:text-4xl text-gray-600">
              {pressreleases}
            </h1>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {[...Array(perPage)].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse bg-white shadow rounded p-4 space-y-4"
                  >
                    <div className="bg-gray-300 rounded w-full h-48"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : videoalauneInfo.length === 0 ? (
              <p>{nodata}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {videoalauneInfo.map((video, index) => {
                  const embedUrl = getEmbedUrl(video.url_video ?? "");
                  if (!embedUrl) return null;

                  return (
                    <article
                      key={video.id || index}
                      className="l-post grid-post grid-base-post bg-white shadow rounded p-4"
                      style={{ marginBottom: 40 }}
                    >
                      <div className="medium-media mb-4">
                        <div
                          className="video-wrapper"
                          style={{ aspectRatio: "16/9" }}
                        >
                          <iframe
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            title={video.title}
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              opacity: isClient ? 1 : 0,
                              pointerEvents: isClient ? "auto" : "none",
                              transition: "opacity 0.3s ease-in-out",
                            }}
                          />
                        </div>
                      </div>

                      <div className="text-lg font-medium pl-2 pr-2 pt-1 pb-1 text-white bg-[#db2e44] inline-block mb-2">
                        {formatDate(video.date, locale)}
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FiEye className="mr-1" />
                        {video.views ?? 0} {view}
                      </div>

                      <Link href={`/${locale}/${videopath}/${video.slug}`}>
                        <h2
                          className="text-xl font-semibold text-[#1a2a54] lg:text-2xl truncate-3-lines"
                          dangerouslySetInnerHTML={{ __html: video.title }}
                        />
                      </Link>

                      <div
                        className="post-meta-items meta-below"
                        style={{ marginBottom: "-5px" }}
                      >
                        <span
                          className="meta-item post-author text-[#1a2a54]"
                          style={{ fontWeight: 800 }}
                        >
                          {duration}:{" "}
                          {isNaN(Number(video.duree_en_seconde))
                            ? "N/A"
                            : formatDuration(Number(video.duree_en_seconde))}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {videoalauneInfo.length > 0 && totalPages > 1 && (
              <nav
                className="main-pagination pagination-numbers mt-6 flex flex-wrap gap-2"
                data-type="numbers"
              >
                {page > 1 && (
                  <Link
                    href={`/${locale}/${featuredVidSlug}?page=${page - 1}`}
                    className="prev page-numbers px-3 py-1 rounded border bg-white text-[#1a2a54] hover:bg-blue-100 text-[15px] border-blue-300"
                  >
                    ← {previous}
                  </Link>
                )}

                {generatePageNumbers(page, totalPages).map((pageNum, i) =>
                  pageNum === "..." ? (
                    <span key={i} className="page-numbers dots">
                      ...
                    </span>
                  ) : (
                    <Link
                      key={i}
                      href={`/${locale}/${featuredVidSlug}?page=${pageNum}`}
                      className={`page-numbers px-3 py-1 rounded border text-[16px] ${
                        pageNum === page
                          ? "bg-[#1a2a54] text-white border-[#1a2a54]"
                          : "bg-white text-[#1a2a54] border-blue-300 hover:bg-blue-100"
                      }`}
                      aria-current={pageNum === page ? "page" : undefined}
                    >
                      {pageNum}
                    </Link>
                  )
                )}

                {page < totalPages && (
                  <Link
                    href={`/${locale}/${featuredVidSlug}?page=${page + 1}`}
                    className="next page-numbers px-3 py-1 rounded border border-blue-300 text-[#1a2a54] hover:bg-blue-100 text-[15px]"
                  >
                    {next} →
                  </Link>
                )}
              </nav>
            )}

            <br />
            <br />
            <br />
          </div>
        </div>
        <aside className="lg:col-span-4 mt-8">
          <div className="sticky">
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
}

// Formatage de la date
function formatDate(dateStr: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, options);
}
