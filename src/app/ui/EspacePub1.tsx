"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "../utils/i18n";

const EspacePub1: React.FC = () => {
  const params = useParams();
  const rawLocale = params?.locale;
  const locale = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale || "fr";

  const t = getTranslation(locale);
  const advertising = t.advertising || "";

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) return null;

  const cb = Math.floor(Math.random() * 99999999999); // Génère un cb unique pour éviter le cache

  
  return (
    <section className="bg-[#1a2a54] py-0 px-4 md:px-10 mb-20 md:mb-12 text-white h-[320px] md:h-[285px]">
      <center className="font-bold">{advertising}</center>
      <br />

      <div className="max-w-screen-xl mx-auto" style={{ marginTop: -15 }}>
        <div className="flex justify-center">
          {isMobile ? (
                //data-revive-zoneid="230"
                <ins
                  data-revive-zoneid="291"
                  data-revive-id="16a6633e0a24be5cdd88d46adf91ea32"
                ></ins>
              ) : (
                //data-revive-zoneid="229"
                <ins data-revive-zoneid="292" data-revive-id="16a6633e0a24be5cdd88d46adf91ea32"></ins>
                
              )}
        </div>
      </div>
    </section>
  );
};

export default EspacePub1;
