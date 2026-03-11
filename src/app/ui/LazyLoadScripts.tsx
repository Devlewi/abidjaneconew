'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function LazyLoadScripts() {
  useEffect(() => {
    const lazyloadRunObserver = () => {
      const lazyloadBackgrounds = document.querySelectorAll(`.e-con.e-parent:not(.e-lazyloaded)`);
      const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyloadBackground = entry.target as HTMLElement;
            if (lazyloadBackground) {
              lazyloadBackground.classList.add('e-lazyloaded');
            }
            lazyloadBackgroundObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '200px 0px 200px 0px' });

      lazyloadBackgrounds.forEach((lazyloadBackground) => {
        lazyloadBackgroundObserver.observe(lazyloadBackground);
      });
    };

    ['DOMContentLoaded', 'elementor/lazyload/observe'].forEach((event) => {
      document.addEventListener(event, lazyloadRunObserver);
    });

    return () => {
      ['DOMContentLoaded', 'elementor/lazyload/observe'].forEach((event) => {
        document.removeEventListener(event, lazyloadRunObserver);
      });
    };
  }, []);

  return (
    <>
      {/* Configuration globale */}
      <Script id="smartmag-lazyload-js-extra" strategy="beforeInteractive">
        {`var BunyadLazyConf = { "type": "smart" };`}
      </Script>

      {/* Script externes avec defer ou différé selon besoin */}
      <Script src="/js/059cf10036c1aff6209bc1476002b48d.js" id="smartmag-lazyload-js" strategy="afterInteractive" />
      <Script src="/js/3edef53dbd6c4f8a26ccade2bf2ebb5e.js" id="swiper-js" data-debloat-delay="1" strategy="afterInteractive" />
      <Script src="/js/26163b5c5f9f5b17b1a824a3bcf585c9.js" id="magnific-popup-js" strategy="lazyOnload" />
      <Script src="/js/436c92d375871a4de2f9bca5482b318f.js" id="theia-sticky-sidebar-js" strategy="lazyOnload" />
      <Script src="/js/95d48ebe0fd227993325d142e6b718ef.js" id="smartmag-theme-js" strategy="lazyOnload" />

      {/* Debloat config inline */}
      <Script id="debloat-config" strategy="beforeInteractive">
        {`var debloatConfig = { "cssDelayType": "interact", "jsDelayType": "interact", "jsDelayMax": "" };`}
      </Script>
    </>
  );
}
