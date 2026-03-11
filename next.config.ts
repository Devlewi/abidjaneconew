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
    ];
  },
};

export default nextConfig;
