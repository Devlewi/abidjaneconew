"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaHandPointRight } from "react-icons/fa";
import Link from "next/link";
import { getTranslation } from "../utils/i18n";
import SidebarLatestPosts from "./SidebarLatestPosts";
import { fetchFlashInfo } from "../services/api";
import he from "he";

type FlashInfoItem = {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string | null;
  source: string | null;
  date: string;
  link: string;
};

export default function FlashInfoClient({ locale }: { locale: string }) {
  const [flashInfo, setFlashInfo] = useState<FlashInfoItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;

  const t = getTranslation(locale);
  const next = t.next || "";
  const previous = t.previous || "";
  const latest = t.latest || "";
  const articles = t.articles || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { items, totalPages } = await fetchFlashInfo(locale, page, perPage);
        setFlashInfo(items);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
        setFlashInfo([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [locale, page]);

  // Grouper les flash infos par date formatée
  const groupedByDate: Record<string, FlashInfoItem[]> = flashInfo.reduce(
    (acc, item) => {
      const dateKey = formatDate(item.date, locale);
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    },
    {} as Record<string, FlashInfoItem[]>
  );

  const generatePageNumbers = (currentPage: number, totalPages: number) => {
    // ta fonction actuelle ici
    const range: (number | string)[] = [];
    const maxDisplayedPages = 5;

    range.push(1);

    if (totalPages > maxDisplayedPages) {
      if (currentPage > 3) range.push("...");
      if (currentPage > 2) range.push(currentPage - 1);
      range.push(currentPage);
      if (currentPage < totalPages - 1) range.push(currentPage + 1);
      if (currentPage < totalPages - 2) range.push("...");
    } else {
      for (let i = 2; i <= totalPages; i++) {
        range.push(i);
      }
    }

    if (!range.includes(totalPages)) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <h1 className="text-2xl font-bold text-left mb-6 lg:mx-0 mt-10 lg:text-4xl text-gray-600">
            Flash Infos
          </h1>

          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-lg p-6 lg:mx-0 border-l-8 border-t-2 border-solid border-gray-400 border-t-gray-100"
                >
                  <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
                  <div className="h-4 bg-gray-300 w-2/3 mb-6 rounded"></div>
                  <div className="h-3 bg-gray-300 w-full mb-4 rounded"></div>
                  <div className="h-3 bg-gray-300 w-full rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groupedByDate).map(([date, items]) => (
                <div key={date}>
                  <div className="text-lg font-medium mb-4 pl-2 pr-2 pt-1 pb-1 text-white bg-[#db2e44] inline-block rounded">
                    {date}
                  </div>

                  <div className="space-y-6">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-lg p-6 lg:mx-0 border-l-8 border-t-2 border-solid border-gray-400 border-t-gray-100"
                      >
                        {item.source && (
                          <div className="mb-3 flex items-center text-gray-500 italic text-sm">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8l4 4-4 4-4-4 4-4z"
                              />
                            </svg>
                            Source : {he.decode(item.source)}
                          </div>
                        )}
                        <h2
                          className="text-xl font-semibold text-[#1a2a54] mb-4 lg:text-3xl"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />

                        <div
                          className="text-sm text-gray-700 mb-4 wp-content"
                          dangerouslySetInnerHTML={{ __html: item.content }}
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
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination dynamique */}
          {flashInfo.length > 0 && totalPages > 1 && (
            <nav
              className="main-pagination pagination-numbers mt-6 flex flex-wrap gap-2 lg:mx-0"
              data-type="numbers"
            >
              {page > 1 && (
                <Link
                  href={`/${locale}/flash-info?page=${page - 1}`}
                  className="prev page-numbers px-3 py-1 rounded border bg-white text-[#1a2a54] hover:bg-blue-100 text-[15px] border-blue-300"
                >
                  ← {previous}
                </Link>
              )}

              {generatePageNumbers(page, totalPages).map((pageNum, index) =>
                pageNum === "..." ? (
                  <span key={index} className="page-numbers dots">
                    ...
                  </span>
                ) : (
                  <Link
                    key={index}
                    href={`/${locale}/flash-info?page=${pageNum}`}
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
                  href={`/${locale}/flash-info?page=${page + 1}`}
                  className="next page-numbers px-3 py-1 rounded border border-blue-300 text-[#1a2a54] hover:bg-blue-100 text-[15px]"
                >
                  {next} →
                </Link>
              )}
            </nav>
          )}

          <br />
          <br />
        </div>

        <SidebarLatestPosts
          locale={locale}
          latest={latest}
          articles={articles}
        />
      </div>
    </div>
  );
}

function formatDate(dateStr: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return new Date(dateStr).toLocaleDateString(locale, options);
}
