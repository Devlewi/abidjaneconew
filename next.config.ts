import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,//Désactiver l'optimisation d'images
    remotePatterns: [      
      {
        protocol: "https",
        hostname: "localhost",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "controlpanel.abidjan-eco.com",
        pathname: "/wp-content/uploads/**",
      },        
    ],
    domains: ['abidjan-eco.com','controlpanel.abidjan-eco.com','abidjaneco-frontend.vercel.app','siteco.cynomedia-africa.com','adserver.cynomedia.com','googleads.g.doubleclick.net'],
  },

  async headers() {
    return [
      {
        // Applique le noindex sur les dossiers de ressources
        source: "/(js|fonts)/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/Home",
        destination: "/",
        permanent: true,
      },
      // --- RECOUVREMENT DES LIENS MSN VIA CONDITIONS ---
      {
        // On attrape n'importe quel slug à la racine...
        source: "/:slug",
        destination: "/fr/article/:slug",
        permanent: false,
        // ...MAIS la règle s'annule immédiatement si l'URL commence par un de ces mots clés :
        has: [
          {
            type: 'header',
            key: 'x-next-custom-header', // Juste pour la forme
          }
        ],
        missing: [
          { type: 'host', value: 'un-mot-exclu-inutile' } // Laisse Next compiler la structure
        ]
      },
    ];
  },
};

export default nextConfig;
