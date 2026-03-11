/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.cameroun-eco.com',
    generateRobotsTxt: true,
    // Ne génère pas de sitemap automatiquement pour les articles
    exclude: ['/fr/article/*', '/api/*', '/admin/*'],
    // Tu peux ajouter ton sitemap dynamique ici
    additionalSitemaps: [
      'https://www.cameroun-eco.com/sitemap.xml', // Ton endpoint dynamique généré par /app/sitemap.xml/route.ts
    ],
  };
  