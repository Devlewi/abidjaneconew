"use client";

import React from "react";
import he from 'he';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css"; // ajuste ce chemin selon ton projet
import Link from "next/link";
import { getTranslation } from "../utils/i18n";


export interface Article {
  id: number;
  title: string;
  slug: string;
  link: string;
  date: string;
  thumbnail: string | false;
  fichier_image_pdf?: {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
  };
}

type Communique = {
  id: number;
  title: string;
  slug: string;
  link: string;
  date: string;
  thumbnail: boolean | string; // selon votre usage
  fichier_pdf_image: string;
  views: number;
};

type SixthSectionProps = {
  locale: string;
  communiques: Communique[];
};


const SixfthSectionComponent: React.FC<SixthSectionProps> = ({ locale, communiques }) => {
  const t = getTranslation(locale); // locale = "fr" ou "en"
  const communiquePath = t.pressreleasespath || '';
  const pressreleases = t.pressreleases || '';
  const communiquesingPath = t.pressreleasesingpath || "";
  const all = t.all || '';
  //const articlePath = t.singulararticle || "article";

  //console.log(communiques);
  if (!communiques.length) {
    return <>
    <section
            className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-aab5c4e elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="aab5c4e"
            data-element_type="section"
            style={{ marginTop: -70 }}
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
                          <h4
                            style={{
                              background: "#db2e44",
                              color: "white",
                              padding: 10,
                              borderRadius: 5,
                              fontSize: 16,
                              width: 180,
                            }}
                            className="headin font-interBlack"
                          >
                            <a href="#" className="uppercase text-[white]">{pressreleases}</a>
                          </h4>
                          {/* Ligne qui relie */}
                          <div
                            style={{
                              flexGrow: 1,
                              height: 1,
                              background: "#ccc",
                            }}
                          />
                          {/* Zone TOUT */}
                          <Link href={`/${locale}/${communiquePath}/`}>
                          <h4
                            className="head-line font-interMedium"
                            style={{
                              border: "1px solid #db2e44",
                              borderRadius: 8,
                              padding: "5px 10px",
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              fontSize: 15,
                              color: "#db2e44",
                            }}
                          >
                            {all}
                          </h4>
                          </Link>
                          
                        </div>
                        <div className="block-content">
                          <div className="loop loop-grid loop-grid-sm grid grid-3 md:grid-2 xs:grid-1">
                            
                          Aucun communiqué disponible pour le moment !   
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </>;
  }


  return (
    <section
            className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-aab5c4e elementor-section-boxed elementor-section-height-default elementor-section-height-default"
            data-id="aab5c4e"
            data-element_type="section"
            style={{ marginTop: -70 }}
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
                          <h4
                            style={{
                              background: "#db2e44",
                              color: "white",
                              padding: 10,
                              borderRadius: 5,
                              fontSize: 16,
                              width: 180,
                            }}
                            className="headin font-interBlack"
                          >
                            <a href="#" className="uppercase text-[white]">{pressreleases}</a>
                          </h4>
                          {/* Ligne qui relie */}
                          <div
                            style={{
                              flexGrow: 1,
                              height: 1,
                              background: "#ccc",
                            }}
                          />
                          {/* Zone TOUT */}
                          <Link href={`/${locale}/${communiquePath}/`}>
                          <h4
                            className="head-line font-interMedium"
                            style={{
                              border: "1px solid #db2e44",
                              borderRadius: 8,
                              padding: "5px 10px",
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              fontSize: 15,
                              color: "#db2e44",
                            }}
                          >
                            {all}
                          </h4>
                          </Link>
                          
                        </div>
                        <div className="block-content">
                          <div className="loop loop-grid loop-grid-sm grid grid-3 md:grid-2 xs:grid-1">
                            
                          {communiques.map((item, index) => {

const dateObj = new Date(item.date);
const formattedDate = dateObj.toLocaleDateString(locale, {
  day: "numeric",
  month: "long",
});


        return (
          <article key={item.id} className="l-post grid-post grid-sm-post mb-6">
            <div className="content with-number-icon flex">
              <div className="number-circle mr-4 font-bold text-xl text-blue-900">
                {index + 1}
              </div>

              <div className="text-content" style={{marginLeft:-15}}>
                <div className="post-meta post-meta-a has-below">
                  <div className="post-meta-items meta-below">
                    <span className="meta-item date">
                      <span className="date-link">
                        <time
                          className="post-date"
                          dateTime={item.date}
                          style={{ fontWeight: 800, fontSize: 14 }}
                        >
                          {formattedDate}
                        </time>
                      </span>
                    </span>
                  </div>

                  <h2 className="is-title post-title mt-0 truncate-3-lines">
                    <Link
                      href={`/${locale}/${communiquesingPath}/${item.slug}`}
                      rel="noopener noreferrer"
                      style={{
                        color: "#1f3162",
                        fontWeight: 700,
                        marginBottom: "-4px",
                        display: "block",
                      }}
                    >
                      {he.decode(item.title)}
                    </Link>

                    <time
                      className="post-date"
                      dateTime={item.date}
                      style={{
                        fontWeight: 800,
                        fontSize: 10,
                        color: "gray",
                        marginTop: "10px",
                        display: "block",
                      }}
                    >
                      <i className="fa fa-clock" /> 3 min de lecture
                    </time>
                  </h2>
                </div>
              </div>
            </div>
          </article>
        );
      })}
                            
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
  );
};

export default SixfthSectionComponent;
