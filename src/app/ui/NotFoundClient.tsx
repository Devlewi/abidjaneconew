// src/app/not-found-client.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTranslation } from "../utils/i18n";

const NotFoundClient = () => {
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "fr";
  //error404title

  const t = getTranslation(locale); // locale = "fr" ou "en"
  const error404title = t.error404title || '';
  const error404desc = t.error404desc || '';
  const error404returnhome = t.error404returnhome || '';

  
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white text-gray-800 px-4">
      {/* Icône animée */}
      <div className="mb-6">
        <svg
          className="w-20 h-20 text-red-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.851L21 18V6a2 2 0 00-1.851-1.995L19 4H5a2 2 0 00-1.995 1.851L3 6v12c0 1.054.816 1.918 1.851 1.995L5 20z"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-red-600 mb-3 text-center">
        {locale.toUpperCase()} – {error404title}
      </h1>

      <p className="text-base text-gray-600 mb-6 text-center max-w-md">
        {error404desc}
      </p>

      <Link
        href={`/${locale}`}
        className="px-5 py-2.5 bg-[#1a2a54] text-white rounded-lg shadow hover:bg-[#0f1b3a] transition"
      >
        {error404returnhome}
      </Link>
    </div>
  );
};

export default NotFoundClient;
