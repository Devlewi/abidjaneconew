/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "../i18n-config";

const EXCLUDED_PATHS = new Set([
  '/sitemap.xml', 
  '/robots.txt', 
  '/favicon.ico',
  '/ads.txt',
  '/feed',
  '/site.webmanifest',
  '/sitemap.txt',
  '/sitemap-0.txt'
]);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // ==========================================
  // CORRECTION MAJEURE POUR LES SCRIPTS RELATIFS
  // ==========================================
  // Si l'URL contient malencontreusement "/js/" ou "/fonts/" au milieu à cause du thème
  if (pathname.includes('/js/') || pathname.includes('/fonts/')) {
    // On extrait uniquement la partie propre (ex: /js/059cf...js ou /fonts/ts-icons...)
    const cleanPathIndex = pathname.indexOf(pathname.includes('/js/') ? '/js/' : '/fonts/');
    const cleanPath = pathname.substring(cleanPathIndex);
    
    // On réécrit l'URL en interne vers le vrai dossier public (/public/js/... ou /public/fonts/...)
    return NextResponse.rewrite(new URL(`${cleanPath}${search}`, request.url));
  }

  // 2. FILTRE DES EXCLUSIONS STANDARD
  if (
    pathname.includes('.') || 
    pathname.startsWith('/api/') || 
    pathname.startsWith('/_next/') ||
    EXCLUDED_PATHS.has(pathname)
  ) {
    return NextResponse.next();
  }

  // 3. RACINE "/" -> REWRITE vers "/fr"
  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/fr${search}`, request.url));
  }

  // 4. REDIRECTION /en -> /fr
  if (pathname.startsWith("/en/") || pathname === "/en") {
    const newPath = pathname.replace("/en", "/fr");
    return NextResponse.redirect(new URL(`${newPath}${search}`, request.url), 301);
  }

  // 5. VÉRIFIER SI LA LOCALE EST PRÉSENTE
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 6. SI PAS DE LOCALE -> RECUPERATION DES LIENS MSN
  if (!pathnameHasLocale) {
    if (pathname !== "/Home") {
      return NextResponse.redirect(
        new URL(`/fr/article${pathname}${search}`, request.url),
        301
      );
    }

    return NextResponse.rewrite(
      new URL(`/fr${pathname}${search}`, request.url)
    );
  }

  return NextResponse.next();
}

// 7. CONFIG MATCHER ACCEPTE TOUT SAUF API ET SYSTEME POUR ENCAISSER LES REWRITES
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|ads.txt|feed|site.webmanifest).*)",
  ],
};