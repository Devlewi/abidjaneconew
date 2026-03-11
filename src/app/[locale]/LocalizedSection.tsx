'use client'; // Indiquer que ce composant est destiné au côté client

import { useEffect, useState } from 'react';

const LocalizedSection = ({ locale }: { locale: string }) => {
  const [language, setLanguage] = useState<string>('');

  useEffect(() => {
    // Logique pour charger la langue en fonction du locale
    setLanguage(locale === 'fr' ? 'Français' : 'English');
  }, [locale]);

  return <div>Langue actuelle: {language}</div>;
};

export default LocalizedSection;
