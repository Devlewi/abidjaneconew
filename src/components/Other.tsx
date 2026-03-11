"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Spinner from "@/app/ui/Spinner";


export default function Other() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname(); 


  
  useEffect(() => {
    // Déclenchez l'animation lors d'un changement de route
    setIsTransitioning(true);

    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 1000); // Temps correspondant à la durée de votre animation CSS

    return () => clearTimeout(timeout); // Nettoyez le timeout
  }, [pathname]);

  // On simule un délai pour l'animation de chargement.
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true); // Afficher le loader pendant un délai défini
    }, 500); // Délai de 500 ms pour afficher le loader

    return () => clearTimeout(timer);
  }, []);
  */

  useEffect(() => {
    // Remplacer la classe 'bbp-no-js' par 'bbp-js' lorsque le script est exécuté
    document.body.className = document.body.className.replace(
      "bbp-no-js",
      "bbp-js"
    );
  }, []); // Le tableau vide garantit que ce code s'exécute uniquement au montage du composant

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

  useEffect(() => {
    const BunyadSchemeKey = "bunyad-scheme-7";

    // Vérifier si le schéma (theme) est sauvegardé dans localStorage
    const scheme = localStorage.getItem(BunyadSchemeKey);

    if (scheme) {
      const d = document.documentElement;
      const c = d.classList;

      // Sauvegarder la classe d'origine
      //d.dataset.origClass = c;
      d.dataset.origClass = c.toString();

      // Appliquer ou supprimer les classes en fonction du thème
      if (scheme === "dark") {
        c.remove("s-light", "site-s-light");
        c.add("site-s-dark", "s-dark");
      } else {
        c.remove("s-dark", "site-s-dark");
        c.add("site-s-light", "s-light");
      }
    }
  }, []); // Le tableau vide assure que le code s'exécute uniquement au montage de la page


  useEffect(() => {
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return isTransitioning ? <Spinner /> : null;
}
