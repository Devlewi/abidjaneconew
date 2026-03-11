// Composant Client (avec `use client`)

"use client";

import Script from "next/script";
import React, { useEffect } from "react";

const ClientComponent = () => {
 
  useEffect(() => {
    // Fonction lazyloadRunObserver
    const lazyloadRunObserver = () => {
      // Sélectionne les éléments à lazyloader
      const lazyloadBackgrounds = document.querySelectorAll(
        ".e-con.e-parent:not(.e-lazyloaded)"
      );

      // Crée un nouvel IntersectionObserver pour observer les éléments
      const lazyloadBackgroundObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const lazyloadBackground = entry.target;
              if (lazyloadBackground) {
                lazyloadBackground.classList.add("e-lazyloaded"); // Ajoute la classe une fois l'élément visible
              }
              lazyloadBackgroundObserver.unobserve(entry.target); // Arrête l'observation de cet élément
            }
          });
        },
        { rootMargin: "200px 0px 200px 0px" }
      ); // Définit la marge de déclenchement de l'observation

      // Applique l'observer sur chaque élément
      lazyloadBackgrounds.forEach((lazyloadBackground) => {
        lazyloadBackgroundObserver.observe(lazyloadBackground);
      });
    };

    // Écoute les événements DOMContentLoaded et elementor/lazyload/observe
    const events = ["DOMContentLoaded", "elementor/lazyload/observe"];

    events.forEach((event) => {
      document.addEventListener(event, lazyloadRunObserver);
    });

    // Nettoyage lorsque le composant est démonté
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, lazyloadRunObserver);
      });
    };
  }, []); // Ce code s'exécute une seule fois après le montage du composant

  

  useEffect(() => {
    // Définir la configuration globale après le montage du composant
    window.BunyadLazyConf = { type: "smart" };

    // Vous pouvez ajouter d'autres logiques si nécessaire pour ce script.
  }, []); // Ce code s'exécute une seule fois après le montage du composant

  return (
    <>
    {/*
          <link rel="stylesheet" href="https://unpkg.com/swiper@8/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper@8/swiper-bundle.min.js"></script>
    */}
    

      
    
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
    
     {/* Theia Sticky Sidebar */}
     <Script
            type="text/javascript"
            id="theia-sticky-sidebar-js"
            src="/js/bec7ef33f65e3d23332c9bb50b07ff9a.js"
            defer
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
    </>
  );
};

export default ClientComponent;
