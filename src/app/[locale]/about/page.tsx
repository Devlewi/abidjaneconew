"use client"; // Pour indiquer que ce composant est destiné au rendu côté client

import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="m-5">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1>{t("aboutTitle")}</h1>
      <p>ENGLISH</p>
      <p>{t("aboutDescription")}</p>
    
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  );
}
