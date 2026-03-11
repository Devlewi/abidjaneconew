'use client';

import React from 'react';

export default function LanguageSwitcher() {
  /*
  const handleLanguageSwitch = (lang: 'fr' | 'en') => {
    const currentPath = window.location.pathname;

    let newPath = currentPath;

    if (currentPath.startsWith('/fr')) {
      newPath = currentPath.replace('/fr', `/${lang}`);
    } else if (currentPath.startsWith('/en')) {
      newPath = currentPath.replace('/en', `/${lang}`);
    } else {
      newPath = `/${lang}${currentPath}`;
    }

    // 🔁 Recharge la page vers la nouvelle langue
    window.location.href = newPath;
  };*/

  const handleLanguageSwitch = (lang: 'fr' | 'en') => {
    // 🔁 Redirige vers la page d'accueil de la langue choisie avec un rechargement complet
    window.location.replace(`/${lang}`);
  };

  return (
    <div className="flex items-center space-x-1 text-[13px] font-medium">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleLanguageSwitch('fr');
        }}
        className="px-0 py-0.5 text-white hover:text-red-600"
      >
        FR
      </a>
      <span className="text-gray-400">|</span>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleLanguageSwitch('en');
        }}
        className="px-0 py-0.5 text-white hover:text-red-600"
      >
        EN
      </a>
    </div>
  );
}
