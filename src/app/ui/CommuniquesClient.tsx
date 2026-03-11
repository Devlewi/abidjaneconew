"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaFileDownload } from "react-icons/fa";
import { getTranslation } from "../utils/i18n";
import { FiEye } from "react-icons/fi";
import SidebarLatestPosts from "./SidebarLatestPosts";
import { fetchCommuniques } from "../services/api";

// Typage des données d'un communiqué
type CommuniqueItem = {
  id: number;
  date: string;
  title: string;
  content: string;
  slug: string;
  fichier_pdf_image?: string;
  views?: number;
};

export default function CommuniquesClient({ locale }: { locale: string }) {
  const [communiqueInfo, setCommuniqueInfo] = useState<CommuniqueItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);

  const t = getTranslation(locale);
  const communiquePath = t.pressreleasesingpath || "";
  const pressreleases = t.pressreleases || "";
  const downloadcommunique = t.downloadcommunique || "";
  const view = t.view || "";
  const next = t.next || "";
  const nodata = t.nodata || "";
  //const {loadingmsg} = t.loadingmsg || "";
  const previous = t.previous || "";

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = 10;


  const latest = t.latest || '';
  const articles = t.articles || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const result = await fetchCommuniques(locale, page, perPage);
  
      if (!result || !result.data) {
        console.error("Erreur lors du chargement.");
        setCommuniqueInfo([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }
  
      setCommuniqueInfo(result.data);
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
    <div className="container mx-auto px-4 lg:px-8 py-16">


<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <div className="lg:col-span-8">
  <h1 className="text-2xl font-bold text-left mb-6  mt-10 lg:text-4xl text-gray-600">
        {pressreleases}
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-l-8 border-t-2 border-solid border-gray-300 border-t-gray-100 mb-[10px] animate-pulse"
            >
              <div className="h-10 w-32 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 w-16 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 w-32 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : communiqueInfo.length === 0 ? (
        <p>{nodata}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {communiqueInfo.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6 border-l-8 border-t-2 border-solid border-gray-400 border-t-gray-100 mb-[10px]"
            >
              <div className="mb-2">
                <div className="text-lg font-medium pl-2 pr-2 pt-1 pb-1 text-white bg-[#db2e44] inline-block">
                  {formatDate(item.date, locale)}
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-[5px] mt-[5px]">
                <FiEye className="mr-1" />
                {item.views ?? 0} {view}
              </div>

              <Link href={`/${locale}/${communiquePath}/${item.slug}`}>
                <h2
                  className="text-xl font-semibold text-[#1a2a54] mb-2 lg:text-2xl truncate-4-liness"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
              </Link>

              {item.fichier_pdf_image && (
                <Link
                  href={item.fichier_pdf_image}
                  className="inline-flex items-center bg-[#1a2a54] text-white px-4 py-2 rounded-md hover:bg-[#1a2a54] transition"
                >
                  <FaFileDownload className="mr-2" />
                  {downloadcommunique}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {communiqueInfo.length > 0 && totalPages > 1 && (
        <nav
          className="main-pagination pagination-numbers mt-6 flex flex-wrap gap-2 lg:mx-12"
          data-type="numbers"
        >
          {page > 1 && (
            <Link
              href={`/${locale}/communiques?page=${page - 1}`}
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
                href={`/${locale}/communiques?page=${pageNum}`}
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
              href={`/${locale}/communiques?page=${page + 1}`}
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
  <SidebarLatestPosts
  locale={locale}
  latest={latest}
  articles={articles}
/>
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
