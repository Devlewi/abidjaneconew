/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const FiveBlocks = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6 lg:p-20">
      {/* Bloc 1 : Actualité */}
      <div className=" p-6 rounded-lg flex flex-col justify-between lg:ml-[-40px] mt-[-23px]">
        <h3 className="text-5xl lg:text-6xl font-bold text-[#2e76bc]">
          Actualité
        </h3>
      </div>

      {/* Bloc 2 : NOS PROJETS */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32">
        <img
          src="/images/icon1.png"
          alt="Icon"
          className="w-16 h-16 lg:w-44 lg:h-44 mb-0"
        />
        <div className="text-center">
          <h3 className="text-lg lg:text-[27px] font-semibold">NOS PROJETS</h3>
          <p className="text-sm lg:text-[20px] mt-2">
            La construction d’un 2ème hôtel de classe internationale
          </p>
          <div className="flex items-center justify-center mt-2">
            <FaCalendarAlt className="text-white mr-2" size={50} />
            <p className="text-sm lg:text-[20px] mt-4">24 Mars 2025</p>
          </div>
          <p className="mt-2 text-sm lg:text-base">Voir plus</p>
        </div>
      </div>

      {/* Bloc 3 : AUTRE INFO */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32">
        <img
          src="/images/icon2.png"
          alt="Icon"
          className="w-16 h-16 lg:w-44 lg:h-44 mb-0"
        />
        <div className="text-center">
          <h3 className="text-lg lg:text-[27px] font-semibold">NOS PROJETS</h3>
          <p className="text-sm lg:text-[20px] mt-2">
            La construction d’un 2ème hôtel de classe internationale
          </p>
          <div className="flex items-center justify-center mt-2">
            <FaCalendarAlt className="text-white mr-2" size={50} />
            <p className="text-sm lg:text-[20px] mt-4">24 Mars 2025</p>
          </div>
          <p className="mt-2 text-sm lg:text-base">Voir plus</p>
        </div>
      </div>

      {/* Bloc 4 : AUTRE INFO */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32">
        <img
          src="/images/icon3.png"
          alt="Icon"
          className="w-16 h-16 lg:w-44 lg:h-44 mb-0"
        />
        <div className="text-center">
          <h3 className="text-lg lg:text-[27px] font-semibold">NOS PROJETS</h3>
          <p className="text-sm lg:text-[20px] mt-2">
            La construction d’un 2ème hôtel de classe internationale
          </p>
          <div className="flex items-center justify-center mt-2">
            <FaCalendarAlt className="text-white mr-2" size={50} />
            <p className="text-sm lg:text-[20px] mt-4">24 Mars 2025</p>
          </div>
          <p className="mt-2 text-sm lg:text-base">Voir plus</p>
        </div>
      </div>

      {/* Bloc 5 : AUTRE INFO */}
      <div className="bg-[#2e76bc] p-2 w-full rounded-3xl shadow-lg flex flex-col justify-center items-center text-white relative z-20 transform sm:-translate-y-32">
        <img
          src="/images/icon4.png"
          alt="Icon"
          className="w-16 h-16 lg:w-40 lg:h-40 mb-0"
        />
        <div className="text-center">
          <h3 className="text-lg lg:text-[27px] font-semibold">NOS PROJETS</h3>
          <p className="text-sm lg:text-[20px] mt-2">
            La construction d’un 2ème hôtel de classe internationale
          </p>
          <div className="flex items-center justify-center mt-2">
            <FaCalendarAlt className="text-white mr-2" size={50} />
            <p className="text-sm lg:text-[20px] mt-4">24 Mars 2025</p>
          </div>
          <p className="mt-2 text-sm lg:text-base">Voir plus</p>
        </div>
      </div>
    </div>
  );
};

export default FiveBlocks;
