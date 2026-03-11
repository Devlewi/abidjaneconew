/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Liste d'exclusion (On ajoute ads.txt car il était en 302 dans tes logs)
  const excludedPaths = [
    '/sitemap.xml', 
    '/robots.txt', 
    '/favicon.ico',
    '/ads.txt',
    '/fonts/ts-icons4e17.woff2',
    '/js/f6927642ba9082ad8dc3ee9ebfa2ee4f.js',
    '/js/436c92d375871a4de2f9bca5482b318f.js',
    '/js/26163b5c5f9f5b17b1a824a3bcf585c9.js',
    '/js/95d48ebe0fd227993325d142e6b718ef.js',
    '/js/059cf10036c1aff6209bc1476002b48d.js',
    '/js/bec7ef33f65e3d23332c9bb50b07ff9a.js',
    '/js/bc39a8b646d1336276bcbdd278bd276f.js',
  ];

  // 2. SÉCURITÉ : On exclut TOUT ce qui commence par /js/ ou /fonts/ 
  // Même si le fichier n'est pas dans la liste au-dessus, on ne le redirige PAS.
  if (
    excludedPaths.includes(pathname) || 
    pathname.startsWith('/js/') || 
    pathname.startsWith('/fonts/') ||
    pathname.includes('.') // Si l'URL contient un point, c'est un fichier -> on laisse passer
  ) {
    return NextResponse.next();
  }

  // 3. Redirection /en vers /fr
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const suffix = pathname.startsWith("/en/") ? pathname.slice(4) : "";
    return NextResponse.redirect(new URL(`/fr/${suffix}`, request.url));
  }

  // 4. Forcer /fr pour les pages
  const pathLocale = i18n.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathLocale) {
    return NextResponse.redirect(new URL(`/fr${pathname}`, request.url));
  }

  return NextResponse.next();
}

// 5. MATCHER : On ajoute js et fonts ici pour que le middleware ne les touche même pas
export const config = {
  matcher: "/((?!api|_next/static|_next/image|js|fonts|img|favicon.ico).*)",
};