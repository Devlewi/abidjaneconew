"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

const LanguageSelectorComponent: React.FC = () => {
  const pathname = usePathname(); // chemin actuel
  const [language, setLanguage] = useState(() => {
    if (pathname.startsWith("/en")) return "en";
    if (pathname.startsWith("/fr")) return "fr";
    return "fr";
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    let newPathname = pathname;

    if (pathname.startsWith("/fr")) {
      newPathname = pathname.replace("/fr", `/${selectedLang}`);
    } else if (pathname.startsWith("/en")) {
      newPathname = pathname.replace("/en", `/${selectedLang}`);
    } else {
      newPathname = `/${selectedLang}${pathname}`;
    }

    // Forcer le rechargement complet de la page
    window.location.href = newPathname;
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
        backgroundColor: "#f8f8f8",
        cursor: "pointer",
        color: "#db2e44",
        fontWeight: 800,
      }}
    >
      <option value="fr">Français</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSelectorComponent;
