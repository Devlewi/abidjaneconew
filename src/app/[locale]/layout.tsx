
/* eslint-disable @next/next/no-img-element */
import "../globals.css";
import { getDirection } from "../lib/intl";
import IntlProvider from "../../../providers/IntlProvider";
import Footer from "../ui/Footer";
import Script from "next/script";
import ClientComponent from "../ui/ClientComponent";
import MobileHeadComponent from "../ui/MobileHeadComponent";
import DesktopHeadComponent from "../ui/DesktopHeadComponent";
import CookieBanner from "../ui/CookieBanner";
import StickyFooter from "../ui/StickyFooter";
import { fetchStickyStatus } from "../services/api";

// pages/_app.tsx

const siteDomain = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const locales = ["fr", "en"];

type Props = {
  params: Promise<{ locale: string }>; // Changement ici
  children: React.ReactNode;
};

export default async function RootLayout(props: Props) {
  // Utilise `await` sur `params`
  //const { locale } = await params;
  const { params, children } = props;
  const { locale } = await params;
  const status = await fetchStickyStatus();  // appel côté serveur
  const showSticky = status === "Oui";

  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir}>
      <head>
      
      
<Script
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9760088965124508"
          crossOrigin="anonymous"
        />

{/*
<Script
    id="adsense-init"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-9760088965124508",
          enable_page_level_ads: true
        });
      `,
    }}
  />
*/}








        {/* hreflang links */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${siteDomain}/${loc}`}
          />
        ))}
        {/* x-default for default language */}
        <link rel="alternate" hrefLang="x-default" href={`${siteDomain}/fr`} />

        
        {/*<Script
            async
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            strategy="afterInteractive" // Chargement après que l'application soit interactive
          />

          <Script
            id="adsense-init"
            strategy="afterInteractive" // Assure que ce script s'exécute après le chargement initial
            dangerouslySetInnerHTML={{
              __html: `
                (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "ca-pub-9760088965124508",
                  enable_page_level_ads: true
                });
              `,
            }}
          />*/
}
        
        <ClientComponent />



 


              {/* Script personnalisé pour lazy loading */}
              <Script id="smartmag-lazy-inline-js-after" strategy="lazyOnload">
            {`
        /* <![CDATA[ */
        /**
         * @copyright ThemeSphere
         * @preserve
         */
        var BunyadLazy = {}; 
        BunyadLazy.load = function () { 
          function loadImage(element, callback) { 
            var attributes = {}; 
            if (element.dataset.bgset && element.dataset.sizes) {
              attributes.sizes = element.dataset.sizes;
              attributes.srcset = element.dataset.bgset;
            } else {
              attributes.src = element.dataset.bgsrc;
            }
            
            function setRatio(element) {
              var ratio = element.dataset.ratio; 
              if (ratio > 0) { 
                const parent = element.parentElement; 
                if (parent.classList.contains("media-ratio")) { 
                  const style = parent.style; 
                  if (!style.getPropertyValue("--a-ratio")) {
                    style.paddingBottom = 100 / ratio + "%"; 
                  }
                } 
              } 
            }
            setRatio(element);
            
            var img = document.createElement("img"); 
            for (let key in attributes) {
              img.setAttribute(key, attributes[key]); 
            }

            img.onload = function () { 
              var backgroundUrl = "url('" + (img.currentSrc || img.src) + "')";
              var style = element.style; 
              if (style.backgroundImage !== backgroundUrl) {
                requestAnimationFrame(() => { 
                  style.backgroundImage = backgroundUrl;
                  if (callback) callback(); 
                });
              }
              img.onload = null;
              img.onerror = null;
              img = null;
            };

            img.onerror = img.onload;
            if (img.complete && img.naturalWidth > 0 && img.onload) {
              img.onload(); 
            }
          }
          
          function processElement(element) { 
            if (!element.dataset.loaded) {
              loadImage(element, () => {
                document.dispatchEvent(new Event("lazyloaded"));
                element.dataset.loaded = 1; 
              });
            }
          }
          
          function onWindowLoad(callback) { 
            if (document.readyState === "complete") {
              callback(); 
            } else {
              window.addEventListener("load", callback);
            }
          }
          
          return { 
            initEarly: function () { 
              const processAll = () => { 
                document.querySelectorAll(".img.bg-cover:not(.lazyload)").forEach(processElement);
              }; 
              
              if (document.readyState !== "complete") { 
                const interval = setInterval(processAll, 150);
                onWindowLoad(() => { 
                  processAll();
                  clearInterval(interval); 
                });
              } else {
                processAll();
              }
            }, 
            callOnLoad: onWindowLoad, 
            initBgImages: function (callback) { 
              if (callback) {
                onWindowLoad(() => {
                  document.querySelectorAll(".img.bg-cover").forEach(processElement);
                });
              }
            }, 
            bgLoad: loadImage 
          }; 
        }();
        BunyadLazy.load.initEarly();
        /* ]]> */
      `}
          </Script>
    
    {/* jQuery Core */}
    <Script
            id="jquery-core-js"
            src="/js/f6927642ba9082ad8dc3ee9ebfa2ee4f.js"
            strategy="beforeInteractive"
          />
    
          {/* jQuery Migrate */}
          <Script
            id="jquery-migrate-js"
            src="/js/bc39a8b646d1336276bcbdd278bd276f.js"
            strategy="afterInteractive"
          />
    
    
    <Script id="bunyad-scheme-script" strategy="afterInteractive">
        {`
          var BunyadSchemeKey = 'bunyad-scheme-7';
          (() => {
            const d = document.documentElement;
            const c = d.classList;
            var scheme = localStorage.getItem(BunyadSchemeKey);
    
            if (scheme) {
              d.dataset.origClass = c;
              scheme === 'dark' 
                ? c.remove('s-light', 'site-s-light') 
                : c.remove('s-dark', 'site-s-dark');
              c.add('site-s-' + scheme, 's-' + scheme);
            }
          })();
        `}
      </Script>
      </head>
      <body className="home page-template page-template-page-templates page-template-no-wrapper page-template-page-templatesno-wrapper-php page page-id-6 no-sidebar has-lb has-lb-sm ts-img-hov-fade layout-normal elementor-default elementor-kit-1049 elementor-page elementor-page-6">
        <IntlProvider locale={locale}>
          <>
            {/* .main-wrap */}
            <div className="main-wrap">
              <div className="off-canvas-backdrop" />
              <div
                className="mobile-menu-container off-canvas hide-widgets-sm"
                id="off-canvas"
              >
                <div className="off-canvas-head">
                  <a href="#" className="close">
                    <span className="visuallyhidden">Close Menu</span>
                    <i className="tsi tsi-times" />
                  </a>
                  <div className="ts-logo">
                    <img
                      className="logo-mobile logo-image logo-image-dark"
                      src={`/${locale}/images/logo-ae.webp`}
                      width={210}
                      height={56}
                      alt="Abidjan Eco"
                    />
                    <img
                      className="logo-mobile logo-image"
                      src={`/${locale}/images/logo-ae.webp`}
                      width={210}
                      height={56}
                      alt="SmartMag Tech 1"
                    />
                  </div>
                </div>
                <div className="off-canvas-content">
                  <ul className="mobile-menu" />

                  <div className="spc-social-block spc-social spc-social-b smart-head-social">
                    <a
                      href={process.env.NEXT_PUBLIC_FACEBOOK_URL}
                      className="link service s-facebook"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <i className="icon tsi tsi-facebook" />{" "}
                      <span className="visuallyhidden">Facebook</span>
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL}
                      className="link service s-whatsapp"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <i className="fab fa-whatsapp" />{" "}{" "}
                      <span className="visuallyhidden">whatsapp</span>
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                      className="link service s-linkedin"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <i className="fab fa-linkedin-in" />{" "}{" "}
                      <span className="visuallyhidden">Linkedin</span>
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_TWITTER_URL}
                      className="link service s-twitter"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <i className="icon tsi tsi-twitter" />{" "}
                      <span className="visuallyhidden">X (Twitter)</span>
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_YOUTUBE_URL}
                      className="link service s-youtube"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <i className="fab fa-youtube" />{" "}
                      <span className="visuallyhidden">YouTube</span>
                    </a>
                    <a
                      href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
                      className="link service s-instagram"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <i className="icon tsi tsi-instagram" />{" "}
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
                </div>
              </div>

              {/* head desktop */}
              <DesktopHeadComponent />

              {/* head mobile */}
              <MobileHeadComponent />

              <div className="main-full">
                <div id="post-6" className="main-wrap">
                  {/*isTransitioning && <TransitionPage />*/}
                  {children}
                  <StickyFooter isVisible={showSticky} />
                  <CookieBanner /> {/* fonctionne côté client uniquement */}
                </div>
              </div>
            </div>
            <Footer isVisible={showSticky}/>
            {/* .main-wrap */}
          </>
          <div className="search-modal-wrap" data-scheme="">
            <div className="search-modal-box" role="dialog" aria-modal="true">
              <form
                method="get"
                className="search-form"
                action="#"
              >
                <input
                  type="search"
                  className="search-field live-search-query"
                  name="s"
                  placeholder="Chercher..."
                  defaultValue=""
                />
                <button type="submit" className="search-submit visuallyhidden">
                  Envoyer
                </button>
                {/*
                <p className="message">
                  Type above and press <em>Enter</em> to search. Press{" "}
                  <em>Esc</em> to cancel.{" "}
                </p>
                */}
              </form>
            </div>
          </div>

 <Script
        src="//client.cynomedia-africa.com/www/delivery/asyncjs.php"
        strategy="afterInteractive"
      />
          {/* smartmag-lazyload.js (chargement immédiat) */}
          <Script
            id="smartmag-lazyload-js"
            src="/js/059cf10036c1aff6209bc1476002b48d.js"
            strategy="beforeInteractive"
          />

          <Script
            id="smartmag-lazyload-js-extra"
            type="text/javascript"
            strategy="beforeInteractive" // Charge le script avant l'interactivité
          >
            {`
          /* <![CDATA[ */
          var BunyadLazyConf = { "type": "smart" };
          /* ]]> */
        `}
          </Script>

          {/* magnific-popup.js (defer équivalent) */}
          <Script
            id="magnific-popup-js"
            src="/js/26163b5c5f9f5b17b1a824a3bcf585c9.js"
            strategy="afterInteractive"
          />

          {/* theia-sticky-sidebar.js */}
          <Script
            id="theia-sticky-sidebar-js"
            src="/js/436c92d375871a4de2f9bca5482b318f.js"
            strategy="afterInteractive"
          />

          {/* smartmag-theme.js */}
          <Script
            id="smartmag-theme-js"
            src="/js/95d48ebe0fd227993325d142e6b718ef.js"
            strategy="afterInteractive"
          />

          <Script
            id="custom-script"
            type="text/javascript"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                "use strict";
                (() => {
                  if ([...document.querySelectorAll("script[defer]")].length && "complete" !== document.readyState) {
                    let t = document.readyState;
                    Object.defineProperty(document, "readyState", {
                      configurable: !0,
                      get() { return t },
                      set(e) { return t = e }
                    });
                    let e = !1;
                    document.addEventListener("DOMContentLoaded", () => {
                      t = "interactive";
                      e = !0;
                      document.dispatchEvent(new Event("readystatechange"));
                      e = !1;
                    });
                    document.addEventListener("readystatechange", () => {
                      e || "interactive" !== t || (t = "complete");
                    });
                  }
                })();
              `,
            }}
          />

          <Script id="debloat-config" strategy="beforeInteractive">
            {`var debloatConfig = { "cssDelayType": "interact", "jsDelayType": "interact", "jsDelayMax": "" };`}
          </Script>
        </IntlProvider>
      
       {/* Google Analytics - Script async */}
       <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6G7NCZPPCJ"
        />

        {/* Google Analytics - Initialisation */}
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6G7NCZPPCJ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
