/* eslint-disable @next/next/no-img-element */
import React from "react";
import "@/app/globals.css";
import { fetchEcoxNetworkNews } from "../services/api"; // Ajuste ce chemin selon ton projet
import he from "he";

// 1. TYPAGE STRICT DIRECTEMENT DANS LE FICHIER
interface NetworkArticle {
  id: string | number;
  title: string;
  link: string;
  featured_image?: string;
  date_published?: string;
  excerpt?: string;
  siteName?: string;
  credit_photo?: string | boolean; // Gère les cas où l'API renvoie un booléen
  countryCode?: string;
}

interface Props {
  locale: string;
}

/**
 * Associe le nom d'un site à son fichier drapeau local disponible dans public/fr/images/flags/
 */
const getFlagPath = (siteName: string, locale: string): string | null => {
  if (!siteName) return null;

  const name = siteName.toLowerCase().trim();

  // Dictionnaire de correspondance mis à jour
  const flagMapping: Record<string, string> = {
    "abidjan": "drapeau-ci.png",
    "côte d'ivoire": "drapeau-ci.png",
    "cote d'ivoire": "drapeau-ci.png",
    "ci": "drapeau-ci.png",
    
    "rdc": "drapeau-rdc.png",
    "congo rdc": "drapeau-rdc.png",
    
    "cameroun": "drapeau-cameroun.png",
    
    "faso": "drapeau-faso.png",
    "burkina": "drapeau-faso.png",
    
    "benin": "drapeau-benin.png",
    
    "brazzaville": "drapeau-brazza.png",
    "congo brazzaville": "drapeau-brazza.png",
    
    "guinée équatoriale": "drapeau-guinnee-equa.png",
    "guinee equatoriale": "drapeau-guinnee-equa.png",
    
    "conakry": "drapeau-conakry.png",
    "guinée conakry": "drapeau-conakry.png",
    
    "madagascar": "drapeau-madagascar.png",
    
    "sénégal": "drapeau-senegal.png",
    "senegal": "drapeau-senegal.png",
    
    "mali": "drapeau-mali.png",
    "tchad": "drapeau-tchad.png",
    "centrafrique": "drapeau-centrafrique.png",
    "gabon": "drapeau-gabon.png",
    "niger": "drapeau-niger.png",
    "togo": "drapeau-togo.png",
    "bangui": "drapeau-bangui.png",
  };

  // Cherche si un des mots-clés est contenu dans le nom du site
  const matchedKey = Object.keys(flagMapping).find((key) => name.includes(key));
  const fileName = matchedKey ? flagMapping[matchedKey] : null;

  if (!fileName) return null;

  // Sécurité : si locale est absente, indéfinie ou n'est pas une chaîne propre, on force "fr"
  const cleanLocale = (locale && typeof locale === "string" && locale.trim() !== "") ? locale.trim() : "fr";

  // Renvoie le chemin propre absolu : /fr/images/flags/drapeau-tchad.png
  return `/${cleanLocale}/images/flags/${fileName}`;
};

const NetworkNewsSectionComponent: React.FC<Props> = async ({ locale }) => {
  // Consommation du service connecté à l'API et transtypage sécurisé
  const rawArticles = await fetchEcoxNetworkNews();
  const articles = (rawArticles || []) as NetworkArticle[];

  const sectionTitle = locale === "fr" ? "L'ACTUALITÉ AFRICAINE" : "L'ACTUALITÉ AFRICAINE";

  // Si le flux est vide ou inaccessible, on n'affiche rien du tout
  if (articles.length === 0) return null;

  return (
    // Section globale avec fond gris doux
    <div className="bg-gray-100 border-y border-gray-200 py-8 w-full">
      
      {/* EN-TÊTE DU BLOC */}
      <div className="container mx-auto px-4 mb-6">
        <h3 className="inline-block bg-[#db2e44] text-white px-[22px] py-[10px] rounded-[5px] text-[14px] font-black uppercase tracking-wider shadow-sm">
          {sectionTitle}
        </h3>
      </div>

      {/* GRILLE DES CARTES */}
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ columnGap: "20px", rowGap: "24px" }}
        >
          {articles.slice(0, 10).map((article) => {
            
            // Logique intelligente sécurisée contre les erreurs de type sur credit_photo
            const displayCredit = 
              article.credit_photo && typeof article.credit_photo === "string" && article.credit_photo.length < 40 
                ? article.credit_photo 
                : (article.siteName || "DR");

            // Récupération dynamique du chemin du drapeau
            const flagPath = getFlagPath(article.siteName || "", locale);

            return (
              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-lg transition-all duration-300 p-3.5 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-2.5">
                  {/* ZONE IMAGE & SOURCE */}
                  <div className="relative w-full flex flex-col gap-2">
                    
                    {/* Source épurée : Image Drapeau PNG + Nom du site */}
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#1f3162] uppercase tracking-wider h-5">
                      {flagPath ? (
                        <img 
                          src={flagPath} 
                          alt={`Drapeau ${article.siteName || "Source"}`} 
                          className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                        />
                      ) : (
                        <span className="text-sm leading-none">🌍</span>
                      )}
                      <span>{article.siteName || "INFO"}</span>
                    </div>
                    
                    {/* Conteneur de l'image au format 16/9 */}
                    <a
                      className="relative block w-full aspect-video overflow-hidden rounded-md group"
                      title={article.title}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.featured_image ? (
                        <img
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          src={article.featured_image}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white p-4">
                          <span className="text-[10px] font-bold opacity-30 tracking-widest text-center uppercase">
                            {article.siteName}
                          </span>
                        </div>
                      )}
                      
                      {/* Copyright intelligent */}
                      <span className="absolute bottom-1.5 right-1.5 bg-black/65 text-white text-[9px] font-medium py-0.5 px-1.5 rounded italic shadow-sm backdrop-blur-[2px] max-w-[85%] truncate pointer-events-none z-10">
                        © {displayCredit}
                      </span>
                    </a>
                  </div>

                  {/* ZONE DU CONTENU */}
                  <div className="flex flex-col gap-2">
                    {/* TITRE */}
                    <h4 className="font-bold text-[16px] text-[#db2e44] line-clamp-2 leading-snug">
                      <a href={article.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#db2e44]">
                        {he.decode(article.title) || "Titre non disponible"}
                      </a>
                    </h4>

                    {/* MÉTADONNÉES */}
                    <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-[#1a2a54] font-semibold">
                      <span className="flex items-center gap-1">
                        <i className="fa fa-clock text-[#db2e44]"></i>
                        {article.date_published ? (
                          <>
                            {new Date(article.date_published).toLocaleDateString("fr-FR", { 
                              day: "numeric", 
                              month: "long", 
                              year: "numeric" 
                            })}
                            <span className="mx-1 opacity-50">|</span>
                            Publié à{" "}
                            <span className="text-[#db2e44]">
                              {new Date(article.date_published).toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit"
                              }).replace(":", "h")}
                            </span>
                          </>
                        ) : (
                          "Récemment"
                        )}
                      </span>
                    </div>

                    {/* TEXTE EXTRAIT / EXCERPT */}
                    <p className="text-[13px] leading-relaxed text-[#1a2a54] line-clamp-2 opacity-90">
                      {article.excerpt ? article.excerpt.replace(/\[…\]$/, "...") : ""}
                    </p>
                  </div>
                </div>

                {/* ACTION LIRE LA SUITE */}
                <div className="pt-2.5 border-t border-gray-100 mt-2.5 flex items-center justify-end text-[11px]">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1f3162] font-bold hover:underline inline-flex items-center gap-0.5"
                  >
                    Lire la suite
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NetworkNewsSectionComponent;