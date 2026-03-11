/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getTranslation } from "../utils/i18n";
import { useEffect } from "react";

export default function MobileHeadComponent() {
  const params = useParams();
  //const pathname = usePathname();

  const rawLocale = params?.locale;
  const locale = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale || "fr";



  const t = getTranslation(locale); // locale = "fr" ou "en"




  
  const searchenginepath = t.searchenginepath || "";


  useEffect(() => {
    const target = document.querySelector(".smart-head-mobile .smart-head-row");

    if (!target) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const currentClass = target.className;
          if (window.innerWidth <= 768 && currentClass.includes("off")) {
            // Supprimer la classe "off" sur mobile
            target.classList.remove("off");
          }
        }
      });
    });

    observer.observe(target, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);
  
  return (
    <>
     
      {/* Header mobile */}
      <div
        className="smart-head smart-head-a smart-head-mobile"
        id="smart-head-mobile"
        data-sticky="mid"
        data-sticky-type="smart"
        data-sticky-full=""
      >
        <div
          className="smart-head-mid smart-head-row-3 is-light smart-head-row-full smart-head-row"
          style={{ background: "#fff" }}
        >
          <div className="inner wrap">
            <div className="items items-left">
              <button
                className="offcanvas-toggle has-icon"
                type="button"
                aria-label="Menu"
              >
                <span className="hamburger-icon hamburger-icon-a">
                  <span className="inner" />
                </span>
              </button>
            </div>

            <div className="items items-center">
              <Link
                href={`/${locale}`}
                title=""
                rel="home"
                className="logo-link ts-logo logo-is-image"
              >
                <span>
                  <img
                    className="logo-mobile logo-image logo-image-dark"
                    src={`/${locale}/images/logo-mobile.webp`}
                    width={155}
                    height={36}
                    alt="Logo"
                  />
                  
                  {/*<img
                    className="logo-mobile logo-image"
                    src={`/${locale}/images/logo-mobile.webp`}
                    width={155}
                    height={36}
                    alt="Logo"
                  />*/}


{/*
<img
  className="logo-mobile logo-image w-[800px] h-auto"
  src={`/${locale}/images/logo-ae.webp`}
  alt="Logo"
/>
*/}
<img
  className="logo-mobile logo-image w-[800px] h-auto"
  src={`/${locale}/images/logo-ae.webp`}
  alt="Logo"
/>

                  
                </span>
              </Link>
            </div>

            <div className="items items-right">
              <div className="scheme-switcher has-icon-only" />
              {/* ancienne classe de l'icon de recherche: search-icon has-icon-only is-icon */}
              <Link
                href={`/${locale}/${searchenginepath}`}
                className=""
                title="Search"
              >
                <i className="tsi tsi-search" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
