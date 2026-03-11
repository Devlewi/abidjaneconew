/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
//import LanguageSwitcher from "./LanguageSwitcher";
import NavComponent from "./NavComponent";
import { useParams } from "next/navigation";
import { getTranslation } from "../utils/i18n";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { getLastUpdate } from "../services/api";

export default function DesktopHeadComponent() {
  const params = useParams();
  const rawLocale = params?.locale;
  const locale = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale || "fr";

  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL;
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;




  const headerRef = useRef<HTMLDivElement>(null);

  //const [marginTop, setMarginTop] = useState(0); // Valeur par défaut


  
  const villesCoteDIvoire = [
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "San Pedro",
  "Korhogo",
  "Daloa",
];

const villeAleatoire =
  villesCoteDIvoire[Math.floor(Math.random() * villesCoteDIvoire.length)];


  const [lastUpdate, setLastUpdate] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    getLastUpdate()
      .then((data) => {
        if (data.last_update) {
          // Transforme en format ISO8601 compatible
          const isoString = data.last_update.replace(" ", "T");
          const date = new Date(isoString);            
          setLastUpdate(date.toISOString()); // Stocke en ISO pour réutilisation

        }
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération de la date de mise à jour :", err);
        setError(err.message);
      });
  }, []);




  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  const dateFormattee = new Date().toLocaleDateString(
    locale || "fr-FR",
    options
  );
  const currentDate = `${villeAleatoire}, le ${dateFormattee}`;

  const t = getTranslation(locale); // locale = "fr" ou "en"
  //const latest = t.latest || '';
  //const articl = t.articles || '';
  const searchenginepath = t.searchenginepath || "";


  function formatLastUpdate(dateIsoString: string) {
    if (!dateIsoString) return "";
  
    const date = new Date(dateIsoString);
  
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
  
    // Format date en "04 juin 2025" selon locale française
    const formattedDate = date.toLocaleDateString("fr-FR", options);
  
    // Récupérer heures et minutes pour "15h54min"
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedTime = `${hours}h${minutes < 10 ? "0" : ""}${minutes}min`;
  
    return `le ${formattedDate} - ${formattedTime}`;
  }
  
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={`/${locale}/images/banner-1.webp`}
          type="image/webp"
          crossOrigin="anonymous"
        />
      </Head>
      <div
  className="smart-head smart-head-a smart-head-main"
  id="smart-head"
  data-sticky="auto"
  data-sticky-type="smart"
  data-sticky-full=""
  style={{
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: "#fff", // obligatoire si le fond est transparent
  }}
>

        <div
          className="smart-head-row smart-head-top s-dark smart-head-row-full"
          style={{
            background: `url(/${locale}/images/banner-1.webp) center center / cover no-repeat`,
            height: "55px", // pas besoin de `!important` en React
          }}
        >
          {/* Overlay sombre semi-transparent */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)", // ajuste l’opacité ici
      height:55

    }}
  />

          <div className="inner full">
            <div className="items items-left ">
              <div className="nav-wrap">
                <nav className="navigation navigation-small nav-hov-a">
                  <ul id="menu-top-links" className="menu">
                    <li
                      id="menu-item-1202"
                      className="menu-item menu-item-type-taxonomy menu-item-object-category menu-cat-3 menu-item-1202"
                    >
                      <a href="#" style={{ fontWeight: 900, fontSize: 15 }}>
                        <img
                          src={`/${locale}/images/flag.webp`}
                          style={{ width: "20%" }}
                          alt="drapeau cameroun"
                          className="mr-2"
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            lineHeight: 1.2,
                          }}
                        >
                          <span>{currentDate}</span>
                          <span style={{ fontWeight: 400, whiteSpace: "nowrap" }}>

                            Dernière Mise à jour : {formatLastUpdate(lastUpdate)}
                          </span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="items items-center empty"></div>
            <div className="items items-right ">
              <div className="spc-social-block spc-social spc-social-a smart-head-social">
                <a
                  href={facebookUrl}
                  className="link service s-facebook"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <i className="fab fa-facebook-f" />{" "}
                  <span className="visuallyhidden">Facebook</span>
                </a>
                <a
                  href={whatsappUrl}
                  className="link service s-instagram"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <i className="fab fa-whatsapp" />{" "}
                  <span className="visuallyhidden">Whatsapp</span>
                </a>
                <a
                  href={linkedinUrl}
                  className="link service s-linkedin"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <i className="fab fa-linkedin-in" />{" "}
                  <span className="visuallyhidden">LinkedIn</span>
                </a>
                <a
                  href={twitterUrl}
                  className="link service s-twitter"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <i className="icon tsi tsi-twitter" />{" "}
                  <span className="visuallyhidden">Twitter</span>
                </a>
                <a
                  href={youtubeUrl}
                  className="link service s-youtube"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <i className="fab fa-youtube" />{" "}
                  <span className="visuallyhidden">YouTube</span>
                </a>
                <a
                  href={instagramUrl}
                  className="link service s-instagram"
                  target="_blank"
                  rel="nofollow noopener"
                >
                  <i className="fab fa-instagram" />{" "}
                  <span className="visuallyhidden">Instagram</span>
                </a>
                 <a
                      href={process.env.NEXT_PUBLIC_THREADS_URL}
                      className="link service s-instagram"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                fill="#ffffff" 
                  width="16"    
                  height="16"   
              >
                <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8 29.2 14.1 50.6 35.2 61.8 61.4 15.7 36.5 17.2 95.8-30.3 143.2-36.2 36.2-80.3 52.5-142.6 53l-.3 0c-70.2-.5-124.1-24.1-160.4-70.2-32.3-41-48.9-98.1-49.5-169.6l0-.5C17 184.3 33.6 127.2 65.9 86.2 102.2 40.1 156.2 16.5 226.4 16l.3 0c70.3 .5 124.9 24 162.3 69.9 18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4-29.2-35.8-73-54.2-130.5-54.6-57 .5-100.1 18.8-128.2 54.4-26.2 33.3-39.8 81.5-40.3 143.2 .5 61.7 14.1 109.9 40.3 143.3 28 35.6 71.2 53.9 128.2 54.4 51.4-.4 85.4-12.6 113.7-40.9 32.3-32.2 31.7-71.8 21.4-95.9-6.1-14.2-17.1-26-31.9-34.9-3.7 26.9-11.8 48.3-24.7 64.8-17.1 21.8-41.4 33.6-72.7 35.3-23.6 1.3-46.3-4.4-63.9-16-20.8-13.8-33-34.8-34.3-59.3-2.5-48.3 35.7-83 95.2-86.4 21.1-1.2 40.9-.3 59.2 2.8-2.4-14.8-7.3-26.6-14.6-35.2-10-11.7-25.6-17.7-46.2-17.8l-.7 0c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1l.8 0c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2 .1 0zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3 25.6-1.4 54.6-11.4 59.5-73.2-13.2-2.9-27.8-4.4-43.4-4.4-4.8 0-9.6 .1-14.4 .4-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z" />
              </svg>
                      {" "}
                      <span className="visuallyhidden">Threads</span>
                    </a>                
              </div>

              {/* pour changer de langues */}
              {/* <LanguageSwitcher /> */}
            </div>
          </div>
        </div>
        <div className="smart-head-row smart-head-mid smart-head-row-3 is-light smart-head-row-full">
          <div className="inner full">
            <div className="items items-left ">
              {/* <MobileMenu /> */}
              <button
                className="offcanvas-toggle has-icon"
                type="button"
                aria-label="Menu"
              >
                <span className="hamburger-icon hamburger-icon-a">
                  <span className="inner" />
                </span>
              </button>
              {/* ancienne classe pour l icon de recherche: search-icon has-icon-only is-icon */}
              <Link
                href={`/${locale}/${searchenginepath}`}
                className=""
                title="Search"
              >
                <i
                  className="fas fa-search"
                  style={{ fontSize: 22, transform: "rotate(90deg)" }}
                />
              </Link>
            </div>
            <div className="items items-center ">
              <Link
                href={`/${locale}`}
                title=""
                rel="home"
                className="logo-link ts-logo logo-is-image"
              >
                <h1>
                  <img
                    src={`/${locale}/images/logo-ae.webp`}
                    className="logo-image logo-image-dark"
                    alt=""
                    srcSet={`/${locale}/images/logo-ae.webp`}
                  />

                  {/*
                  
                  <img
                    src={`/${locale}/images/logo-ae.webp`}
                    className="logo-image"
                    alt=""
                    srcSet={`/${locale}/images/logo-ae.webp`}
                    width={301}
                    height={156}
                  />

                  */}
                  
                  <img
  src={`/${locale}/images/logo-ae.webp`}
  className="w-[400px] h-auto"
  alt=""
  srcSet={`/${locale}/images/logo-ae.webp`}
  style={{marginTop:-10}}
/>



                  
                </h1>
              </Link>
            </div>
          </div>
        </div>
        {/* le sticky se joue ici */}
              
        <div
  ref={headerRef}
  className="smart-head-row smart-head-bot smart-head-row-3 is-light has-center-nav smart-head-row-full"  
>

          <div className="inner full">
            <div className="items items-left empty"></div>
            <div className="items items-center ">
              <div className="nav-wrap">
                <NavComponent locale={locale} />
              </div>
            </div>
            <div className="items items-right empty"></div>
          </div>
        </div>
      </div>
    </>
  );
}
