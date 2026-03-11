/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const TwoBlocInverse = () => {
  return (
    <div className="bg-[#dee9f4] py-0">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-stretch">
        {/* Colonne droite (image) */}
        <div className="lg:w-1/2">
          <img
            src="/images/home.png"
            alt="Vue Hilton Restauration"
            className="w-ful h-full object-cover transform scale-125"
            style={{ marginLeft: -50 }}
          />
        </div>

        {/* Colonne gauche */}
        {/* Colonne gauche */}
<div className="lg:w-1/2 bg-[#dee9f4] ml-20 p-20 flex flex-col justify-center items-center text-center">
  <h2 className="text-6xl font-bold text-[#2e76bc] mb-4">
    CARRIÈRES
  </h2>
  <div className="w-24 h-1 bg-[#2e76bc] mb-6"></div>
  <p className="text-3xl text-[#2e76bc] mb-6">
    400 personnes investies et partageant quotidiennement la même passion.
  </p>
  <Link href="/offres" passHref>
    <button className="bg-white text-[#2e76bc] border border-[#2e76bc] px-6 py-3 rounded-md hover:bg-[#2e76bc] hover:text-white transition-colors">
      VOIR PLUS
    </button>
  </Link>
</div>

      </div>
    </div>
  );
};

export default TwoBlocInverse;
