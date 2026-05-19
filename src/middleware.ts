/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. EXCLUSIONS : On laisse passer les fichiers statiques, API et fichiers système
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api/') || 
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/js/') ||
    pathname.startsWith('/fonts/') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/ads.txt'
  ) {
    return NextResponse.next();
  }

  // 2. RACINE "/" -> REWRITE vers "/fr"
  // L'URL reste https://votre-site.com/ mais affiche le contenu de /fr
  // C'est indispensable pour que Google Search Console ne voit pas de redirection sur l'accueil
  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/fr${search}`, request.url));
  }

  // 3. REDIRECTION /en -> /fr (Si le site est passé en français)
  // Utilise 301 (Permanent) pour que Google transfère le SEO de l'anglais vers le français
  if (pathname.startsWith("/en/") || pathname === "/en") {
    const newPath = pathname.replace("/en", "/fr");
    return NextResponse.redirect(new URL(`${newPath}${search}`, request.url), 301);
  }

  // 4. VÉRIFIER SI LA LOCALE EST PRÉSENTE
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 5. SI PAS DE LOCALE -> REWRITE vers "/fr"
  // Exemple: /mon-article devient /fr/mon-article de manière invisible pour l'utilisateur
  if (!pathnameHasLocale) {
    return NextResponse.rewrite(
      new URL(`/fr${pathname}${search}`, request.url)
    );
  }

  return NextResponse.next();
}

// 6. MATCHER : On exclut les dossiers ressources pour optimiser les performances
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|js|fonts|img|favicon.ico|robots.txt|sitemap.xml|ads.txt).*)"],
};


