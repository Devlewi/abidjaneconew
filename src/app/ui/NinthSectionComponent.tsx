/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css";
import LanguageSelectorComponent from "./LanguageSelectorComponent";
import { getTranslation } from "../utils/i18n";
import { usePathname } from "next/navigation";
import { subscribeToNewsletter } from "../services/api";

const NinthSectionComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const pathname = usePathname(); // ex: "/fr/contact"
  const locale = pathname?.split("/")[1] || "fr"; // prendre le premier segment après /


  const t = getTranslation(locale); // locale = "fr" ou "en"
  const newslettertxt = t.newslettertxt || '';
  const newsletterbtn = t.newsletterbtn || '';
  
  const congratulatetitle = t.congratulatetitle || '';
  const congratulatemsg = t.congratulatemsg || '';
  const errortitle = t.errortitle || '';
  const errormsg = t.errormsg || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Veuillez entrer un email.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await subscribeToNewsletter(email); // ✨ Appel via service

      //const text = await response.text();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: `${congratulatetitle}`,
          text: `${congratulatemsg}`,//text || 
          confirmButtonColor: "#1f3162",  // couleur bleu thème
        });
        setEmail(""); // reset input
      } else {
        Swal.fire({
          icon: "error",
          title: `${errortitle}`,
          text: `${errormsg}`,//text || 
          confirmButtonColor: "#1f3162",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur réseau",
        text: "Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#1f3162] py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-8 rounded-lg">
          {/* Logo + Sélecteur de langue */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <img
              src="/images/logo-tr-ae.png"
              alt="Logo"
              className="w-[155px] h-[36px] md:w-[280px] md:h-[65px] object-contain"
            />
            {/*
            Gestion des langues
            <LanguageSelectorComponent />
            */}
          </div>

          {/* Formulaire d’abonnement */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-end"
          >
            <input
              type="email"
              placeholder={`${newslettertxt}`}
              className="p-2 rounded-md text-base w-[60%] md:w-[300px] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#db2e44] text-white rounded-md text-xs font-bold hover:opacity-90"
              disabled={loading}
            >
              
              {loading ? "Envoi..." : `${newsletterbtn}`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NinthSectionComponent;
