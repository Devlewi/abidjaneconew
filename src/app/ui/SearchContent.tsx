"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
//import Image from "next/image";
import Link from "next/link";
import { IoSearchSharp } from "react-icons/io5";
//import { format } from "date-fns";
//import { fr } from "date-fns/locale";
import he from "he";
import { usePathname } from "next/navigation";
import { getTranslation } from "../utils/i18n";
import { searchApi } from "../services/api";

const truncateTitle = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
};

interface Article {
  id: number;
  slug: string;
  title: string;
  media_url?: string | null;
  views: number;
  date: string;
  photo_credit: string;
  post_type?: string; // Pour gérer "featured_video"
}

// Convertir URL YouTube normale en URL embed
const getYoutubeEmbedUrl = (url: string | undefined | null) => {
  if (!url) return "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    if (urlObj.hostname.includes("youtu.be")) {
      const videoId = urlObj.pathname.slice(1);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return url; // url inchangée si pas YouTube
  } catch {
    return url; // url inchangée en cas d'erreur
  }
};

/*
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Erreur lors de la récupération des données");
    return res.json();
  });
*/

const SearchContent = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searched, setSearched] = useState(false);

    
    const pathname = usePathname(); // ex: "/fr/contact"
    const locale = pathname?.split("/")[1] || "fr"; // prendre le premier segment après /
  
    const t = getTranslation(locale); // locale = "fr" ou "en"
    //const latest = t.latest || '';
    //const articl = t.articles || '';
    const next = t.next || "";
    const previous = t.previous || "";
    const searchenginetext = t.searchenginetext || "";
    const loadingmsg2 = t.loadingmsg2 || "";
    const view = t.view || '';


      // clé pour SWR
  const key = query.trim() && searched ? [query, locale, page] : null;

    // fetcher qui utilise la fonction du service
    const fetcher = ([query, locale, page]: [string, string, number]) =>
      searchApi(query, locale, page, 6);
  
  
    const { data, error, isLoading } = useSWR(key, fetcher, {
      revalidateOnFocus: false,
    });

  useEffect(() => {
    if (searched) setPage(1);
  }, [searched, query]);


  // Log des données chaque fois que "data" change
  useEffect(() => {
    if (data) {
      //console.log("Données API reçues :", data);
    }
  }, [data]);
  
  const results: Article[] = data?.results || [];
  const totalPages: number = data?.total_pages || 1;

  const handleSearch = () => {
    if (query.trim() !== "") {
      setSearched(true);
      setPage(1);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-28">
      {/* Barre de recherche */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder={`${searchenginetext} ...`}
          className="w-full max-w-md rounded-full border-2 border-gray-800 px-5 py-6 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          aria-label="Lancer la recherche"
          className="ml-3 flex items-center justify-center rounded-full bg-[#1a2a54] hover:bg-[#1a2a54] transition px-3 py-1"
        >
          <IoSearchSharp size={28} color="white" />
        </button>
      </div>

      {/* Messages */}
      {isLoading && <p className="text-center text-gray-600">{loadingmsg2}...</p>}
      {error && (
        <p className="text-center text-red-600 font-semibold">
          Erreur lors du chargement des données.
        </p>
      )}

      {/* Résultats */}
      {!isLoading && !error && (
        <>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {                            
                results.map((article) => {                
                const isVideo = article.post_type === "featured_video";
                /*const isCommunique = article.post_type === "communique";
                const isPost = article.post_type === "post";
                */
                const { post_type } = article;

              
                // Construire le chemin dynamique selon le type et la locale
                let basePath = "";
                /*if (isVideo) basePath = "/video";
                else if (isCommunique) basePath = "/communique";
                else if (isPost) basePath = "/article";
                else basePath = "/article";*/
                if (post_type === "featured_video") {
                  basePath = locale === "fr" ? "/video" : "/video";
                } else if (post_type === "communique") {
                  basePath = locale === "fr" ? "/communique" : "/press-release";
                } else if (post_type === "post") {
                  basePath = locale === "fr" ? "/article" : "/post";
                } else {
                  basePath = locale === "fr" ? "/article" : "/post"; // fallback
                }
              
                // Lien complet avec locale
                const linkHref = `/${locale}${basePath}/${article.slug}`;
              
                // Pour la vidéo, on construit l'URL embed si possible
                const embedUrl = isVideo ? getYoutubeEmbedUrl(article.media_url) : null;
              
                // Image par défaut si pas d'image (et pas vidéo)
                const imageUrl =
                  !isVideo && article.media_url
                    ? article.media_url
                    : "/fr/images/default1-img.webp";

                    
                return (
                  <article
                    key={article.id}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition mb-10"
                  >
 {/*
                    <div className="text-xs text-gray-500 p-2">
  Type: {article.post_type} <br />
  isVideo: {String(isVideo)} <br />
  isCommunique: {String(isCommunique)} <br />
  isPost: {String(isPost)}<br/>
  link: {String(linkHref)}<br/>
  {locale}
</div>
 */}

                <Link href={String(linkHref)}>
                      <div className="relative h-48 w-full bg-gray-100 rounded-t-lg overflow-hidden">
                        {isVideo && embedUrl ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            title={article.title}
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="block"
                          />
                        ) : (
                          <img
    src={imageUrl}
    alt={article.title}
    className="object-cover w-full h-full"
  />
                        )}
                        {!isVideo && article.photo_credit && (
  <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-[10px] px-2 py-1 rounded z-50 max-w-[90%] truncate">
    {article.photo_credit}
  </span>
)}

                        <span className="absolute bottom-2 right-2 bg-[#1a2a54] text-[white] text-xs font-semibold px-2 py-1 rounded">
                          {article.views} {view} 
                        </span>
                      </div>
                    </Link>
                    <div className="p-4 bg-white">
                      <h2 className="text-lg font-semibold mb-2">
                        <Link href={String(linkHref)}>
                          {truncateTitle(he.decode(article.title), 10)}
                        </Link>
                      </h2>
                      <p className="text-sm text-gray-500">
                         
                      {new Date(article.date).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                
                      </p>
                
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            searched && (
              <p className="text-center text-gray-600 font-medium mt-10">
                Aucun résultat trouvé
              </p>
            )
          )}
        </>
      )}

      {/* Pagination */}
      {results.length > 0 && (
        <div className="flex justify-center items-center space-x-6 mt-12">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className={`px-5 py-0 rounded-md font-semibold transition ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#1a2a54] text-white hover:bg-[#1a2a54]"
            }`}
          >
            {previous}
          </button>
          <span className="font-semibold">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className={`px-5 py-0 rounded-md font-semibold transition ${
              page === totalPages
                ? "bg-gray-300 text-[white] cursor-not-allowed"
                : "bg-[#1a2a54] text-white hover:bg-[#1a2a54]"
            }`}
          >
            {next}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchContent;
