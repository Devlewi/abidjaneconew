"use client"
import { useState, useEffect } from "react";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTranslation } from "../utils/i18n";


import { CSSProperties } from "react";

const baseStyle: CSSProperties = {
  background: "#17223b",
  color: "#fff",
  padding: "0.2rem 0.75rem",
  fontSize: "13px",
  boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
  lineHeight: "1.3",
};

const mobileStyle: CSSProperties = {
  background: "#17223b",
  color: "#fff",
  padding: "0.05rem 0.5rem",
  fontSize: "11px",
  boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
  display: "block",
  textAlign: "center",
  lineHeight: "1.1",
  paddingTop:20
};

const CookieBanner = () => {

  
  const params = useParams();

  const localeParam = params.locale;
  const locale = Array.isArray(localeParam) ? localeParam[0] : localeParam ?? "fr";

  const t = getTranslation(locale);
  const cookietxtaccept = t.cookietxtaccept || "";
  const cookietxknowmore = t.cookietxknowmore || "";
  const cookietxtinfo = t.cookietxtinfo || "";
  const cookieslug = t.cookieslug || "";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fonction qui vérifie la largeur de l'écran
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Style commun
  
  
  return (
    <CookieConsent
      location="bottom"
      buttonText={`${cookietxtaccept}`}
      cookieName="mySiteCookieConsent"
      style={isMobile ? mobileStyle : baseStyle}
      buttonStyle={{
        backgroundColor: "#db2e44",
        color: "#fff",
        fontSize: "12px",
        border: "none",
        borderRadius: "3px",
        padding: "0px 10px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      expires={150}
    >
 <div style={{fontSize:15}}>
  {cookietxtinfo}.{" "}
  <Link
    href={`/${locale}/${cookieslug}`}
    style={{
      color: "#fff",
      textDecoration: "underline",
      fontWeight: "500",
      display: "inline", // ou "inline-block"
      marginBottom: 0,   // ou supprimer si pas besoin
      fontSize:15
    }}
  >
    {cookietxknowmore}
  </Link>
</div>

    </CookieConsent>
  );
};

export default CookieBanner;
