/* eslint-disable prefer-const */
"use client";
import { useEffect } from 'react';

const LazyLoadComponent = () => {
  useEffect(() => {
    // Fonction pour observer et charger les arrière-plans lazy load
    const lazyloadRunObserver = () => {
      const lazyloadBackgrounds = document.querySelectorAll('.e-con.e-parent:not(.e-lazyloaded)');
      const lazyloadBackgroundObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let lazyloadBackground = entry.target;
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

    // Événements sur lesquels nous allons écouter
    const events = ['DOMContentLoaded', 'elementor/lazyload/observe'];
    events.forEach((event) => {
      document.addEventListener(event, lazyloadRunObserver);
    });

    // Nettoyage de l'effet pour éviter les fuites de mémoire
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, lazyloadRunObserver);
      });
    };
  }, []); // [] signifie que l'effet ne s'exécute qu'une seule fois, lors du montage du composant

  return (
    <div>
      {/* Contenu de votre composant ici */}
      <p>Lazy load component</p>
    </div>
  );
};

export default LazyLoadComponent;
