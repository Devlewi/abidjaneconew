"use client";

import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css"; // ajuste ce chemin selon ton projet
import VideoGrid from "./VideoGrid";
import { getTranslation } from "../utils/i18n";
import Link from "next/link";


type Video = {
  id: number;
  title: string;
  url_video: string; // URL YouTube complète
  excerpt?: string;
  link: string;
  slug: string;
  duree_en_seconde: string;
  reading_time: string;
  views: string;
  date: string;
};

interface Props {
  locale: string;
  videos: Video[];
}


// Fonction utilitaire pour extraire l'ID YouTube


const EighthSectionComponent: React.FC<Props> = ({ locale, videos }) => {

  const t = getTranslation(locale); // locale = "fr" ou "en"
  const featuredVidSlug = t.featuredVidSlug || '';
  const featuredvideo = t.featuredvideo || '';
  const all = t.all || '';


  //const view = t.view || "";
  //const articlePath = t.singulararticle || "article";

  //const categoryPath2 =locale === "fr" ? "idees-et-opinions-fr" : "ideas-opinions-en";
  //const reading = t.reading || "";

  return (
<>
<section
className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-aab5c4e elementor-section-boxed elementor-section-height-default elementor-section-height-default mt-[25px]"
data-id="aab5c4e"
data-element_type="section"
              >
                <div className="elementor-container elementor-column-gap-no">
                  <div
                    className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fdf4a3e"
                    data-id="fdf4a3e"
                    data-element_type="column"
                  >
                    <div className="elementor-widget-wrap elementor-element-populated">
                      <div
                        className="elementor-element elementor-element-bf116e3 elementor-widget elementor-widget-smartmag-grid"
                        data-id="bf116e3"
                        data-element_type="widget"
                        data-widget_type="smartmag-grid.default"
                      >
                        <div className="elementor-widget-container">
                          <section
                            className="block-wrap block-grid block-sc mb-none"
                            data-id={22}
                          >
                            <div
                              className="block-head block-head-e2 is-left term-color-56"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0,
                              }}
                            >
                              <h3
                                style={{
                                  background: "#db2e44",
                                  color: "white",
                                  padding: 10,
                                  borderRadius: 5,
                                  fontSize: 16,
                                  width: 190,
                                }}
                                className="headin font-interBlack"
                              >
                                <a href="#" className="text-[white]">{featuredvideo}</a>
                              </h3>
                              {/* Ligne qui relie */}
                              <div
                                style={{
                                  flexGrow: 1,
                                  height: 1,
                                  background: "#ccc",
                                }}
                              />
                              {/* Zone TOUT */}
                              <Link
                      href={`/${locale}/${featuredVidSlug}/`}
                      style={{ color: "#db2e44" }}
                    >
                              <h4
                                className="head-line"
                                style={{
                                  border: "1px solid #db2e44",
                                  borderRadius: 8,
                                  padding: "5px 10px",
                                  display: "inline-block",
                                  whiteSpace: "nowrap",
                                  fontSize: "13px !important",
                                  color: "#db2e44",
                                }}
                              >
                                {all}
                              </h4>
                              </Link>
                            </div>
                            <div className="block-content">
                              <div className="loop loop-grid loop-grid-sm grid grid-4 md:grid-2 xs:grid-1"></div>
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section
              className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-aab5c4e elementor-section-boxed elementor-section-height-default elementor-section-height-default pt-7 md:pt-0"
              data-id="aab5c4e"
              data-element_type="section"
              style={{ background: "#1f3162", marginBottom: 40, marginTop:-20 }}
            >
              <div className="elementor-container elementor-column-gap-no">
                <div
                  className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fdf4a3e"
                  data-id="fdf4a3e"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    <div
                      className="elementor-element elementor-element-bf116e3 elementor-widget elementor-widget-smartmag-grid"
                      data-id="bf116e3"
                      data-element_type="widget"
                      data-widget_type="smartmag-grid.default"
                    >
                      <div className="elementor-widget-container">
                        <section
                          className="block-wrap block-grid block-sc mb-none"
                          data-id={22}
                        >
                          <VideoGrid dataVideos={videos} locale={locale}/>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
</>
  );
};

export default EighthSectionComponent;
