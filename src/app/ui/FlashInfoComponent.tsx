"use client";

import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import he from "he";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css";

export type FlashInfo = {
  id: number;
  title: string;
  content: string;
  date: string;
  link: string;
  slug: string;
};

type FlashInfoComponentProps = {
  data: FlashInfo[];
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month} - ${hours}:${minutes}`;
}

export default function FlashInfoComponent({ data }: FlashInfoComponentProps) {
  const locale = useLocale();

  
  return (
    <section
  aria-labelledby="flash-heading"
  className="myCardSwiper mt-[50px] md:mt-[-30px]"
  style={{ background: "#1a2a54"}}
>

      <h2
        id="flash-heading"
        className="text-center mt-[10px] mb-[10px] md:mt-[12px] md:mb-[12px] font-interMedium text-white text-[14px] pt-0"
      >
        FLASH
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}        
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={`/${locale}/flash-info`} passHref>
              <div className="swiper-slide card p-0 hover:cursor-pointer">
                <h3 className="text-sm font-semibold text-white mb-0 font-interExtraBold mt-[-3px]" style={{fontSize:14}}>
                  {formatDate(item.date)}
                </h3>
                <p className="text-[14px] text-white mb-2 font-interMedium line-clamp-2">
                  {he.decode(item.title)}
                </p>
              </div>
            </Link>
            <br/>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
        <div className="swiper-button-prev" />
        <div className="swiper-button-next" />
        
      </Swiper>
      <h2
        id="flash-heading"
        className="text-center mt-[10px] mb-[10px] md:mt-[12px] md:mb-[14px] font-interMedium text-white text-[14px] pt-0 pb-1"
      >
        <div className="flex justify-center mb-4">
    <Link
      href={`/${locale}/flash-info`}
      passHref
      aria-label="Voir la suite des Flashs"
      className="inline-flex bg-white text-blue-900 rounded-full p-2 shadow-lg hover:bg-blue-900 hover:text-white transition items-center justify-center"
      style={{ width: 100, height: 30, textDecoration: "none" }}
    >
      →
    </Link>
  </div>

      </h2>


    </section>
  );
}
