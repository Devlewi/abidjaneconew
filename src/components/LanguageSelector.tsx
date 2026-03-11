/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();

  const getLocaleFromPath = () => {
    const match = pathname.match(/^\/(fr|en)/);
    return match ? match[1] : "fr";
  };

  const [language, setLanguage] = useState(getLocaleFromPath());

  useEffect(() => {
    setLanguage(getLocaleFromPath());
  }, [pathname]);

  const handleLanguageChange = async (selectedLanguage: string) => {
    if (selectedLanguage === language) return;

    const currentLocale = language;
    const newLocale = selectedLanguage;

    const segments = pathname.split("/").filter(Boolean); // remove empty
    const currentSlug = segments[2]; // ex: /fr/article/[slug] → index 2
    const currentType = segments[1]; // 'article' ou 'post'

    if ((currentType === "article" || currentType === "post") && currentSlug) {
      // Appelle l'API pour obtenir le slug traduit
      try {
        const res = await fetch(
          `https://site-vulnerable.coach-lewi.com/wp-json/custom/v1/slug-translation?slug=${currentSlug}&from=${currentLocale}&to=${newLocale}`
        );
        const data = await res.json();

        if (data.slug) {
          const translatedSlug = data.slug;
          const translatedType = newLocale === "fr" ? "article" : "post";
          router.push(`/${newLocale}/${translatedType}/${translatedSlug}`);
        } else {
          // fallback : redirige juste à la racine
          router.push(`/${newLocale}`);
        }
      } catch (error) {
        console.error("Erreur de traduction de slug :", error);
        router.push(`/${newLocale}`);
      }
    } else {
      // cas général : change juste la langue dans l'URL
      const newPathname = pathname.replace(/^\/(fr|en)/, `/${newLocale}`);
      router.push(newPathname);
    }

    setLanguage(newLocale);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} />
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-transparent text-white border-none outline-none cursor-pointer"
      >
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>
  );
}
