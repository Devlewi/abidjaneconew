"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTranslation } from "../utils/i18n";
//import Script from "next/script";

const EspacePub2: React.FC = () => {
  const params = useParams();
  const rawLocale = params?.locale;
  const locale = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale || "fr";

  const t = getTranslation(locale);
  //const advertisespace = t.advertisespace || '';
  const advertising = t.advertising || '';

  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  //const [adLoaded, setAdLoaded] = useState(false); // état pour savoir si la pub a été chargée

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Script Revive
    const script = document.createElement("script");
    script.src = "//adserver.cynomedia.com/www/delivery/asyncjs.php";
    script.async = true;
    
    /*
    script.onload = () => {
      // délai pour laisser le temps au contenu de l'iframe de s'afficher
      setTimeout(() => {
        const iframe = document.querySelector("ins iframe");
        if (iframe && iframe.clientHeight > 0) {
          setAdLoaded(true);
        }
      }, 1000);
    };*/
    document.body.appendChild(script);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) return null;

  return (
    <>



<section className="bg-[#1a2a54] py-0 px-4 md:px-10 mb-20 text-white h-[320px] md:h-[285px]">
      <center className="font-bold">{advertising}</center>
      <br />
      {/*isClient && <div>Je suis côté client !</div>}
      {isMobile && <div>Je suis côté mobile !</div>*/}

      <div className="max-w-screen-xl mx-auto" style={{marginTop:-15}}>
        <div className="flex justify-center">          
              {isMobile ? (
                //data-revive-zoneid="230"
                <ins
                  data-revive-zoneid="237"
                  data-revive-id="16a6633e0a24be5cdd88d46adf91ea32"
                ></ins>
              ) : (
                //data-revive-zoneid="229"
                <ins
                  data-revive-zoneid="236"
                  data-revive-id="16a6633e0a24be5cdd88d46adf91ea32"
                ></ins>                
                
              )}
          
        </div>        
      </div>
    </section>
    </>
  );
};

export default EspacePub2;
