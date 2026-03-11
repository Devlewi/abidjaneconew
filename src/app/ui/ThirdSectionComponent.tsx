/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css"; // ajuste ce chemin selon ton projet
import { decodeHTML } from "../utils/stringUtils";
import { getTranslation } from "../utils/i18n";
import ThirdSectionBloc1Component from "./ThirdSectionBloc1Component";
import ThirdSectionBloc2Component from "./ThirdSectionBloc2Component";
import ThirdSectionBloc3Component from "./ThirdSectionBloc3Component";
import Link from "next/link";

{/*
  
interface Article {
  emplacement: number;
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  link: string;
  thumbnail: string;
  date: string;
  subcategory: {
    id: number;
    name: string;
    slug: string;
  };
}
  */}

// Objet avec clé d'emplacement et article associé

interface ThirdSectionComponentProps {
  locale: string;
  data: any; // Remplace `any` par un type plus précis si possible
}

const ThirdSectionComponent: React.FC<ThirdSectionComponentProps> = ({ locale, data }) => {
  //const [loading, setLoading] = useState(false); // L'état de chargement
  //console.log("CHECK DATA = ", data);
  


  const articleEmplacement1 = data.emplacement_1?.[0] || null;
  const articleEmplacement2 = data.emplacement_2?.[0] || null;
  const articleEmplacement3 = data.emplacement_3?.[0] || null;
  const articleEmplacement4 = data.emplacement_4?.[0] || null;
  const articleEmplacement5 = data.emplacement_5?.[0] || null;
  const articleEmplacement6 = data.emplacement_6?.[0] || null;
  const articleEmplacement7 = data.emplacement_7?.[0] || null;
  const articleEmplacement8 = data.emplacement_8?.[0] || null;
  //console.log(" articleEmplacement1 = ", articleEmplacement1);




  const t = getTranslation(locale); // locale = "fr" ou "en"
  const categoryPath = t.category || 'categorie';

  
  return (
    <section
      className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-8c5b8a1 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="8c5b8a1"
      data-element_type="section"
      style={{ marginTop: -60 }}
    >
      <div className="elementor-container elementor-column-gap-no">
        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-269aeb7"
          data-id="269aeb7"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-2382134 elementor-widget elementor-widget-smartmag-highlights"
              data-id={2382134}
              data-element_type="widget"
              data-widget_type="smartmag-highlights.default"
            >
              <div className="elementor-widget-container">
                <section
                  className="block-wrap block-highlights block-sc mb-none"
                  data-id={7}
                  data-is-mixed={1}
                >
                  {/* categorie emplacement 1 */}
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
                        width: 188,
                        textTransform: 'uppercase',
                        textAlign:'center'
                      }}
                      className="headin font-interBlack"
                    >
                      {decodeHTML(
                        articleEmplacement1?.subcategory?.name || ""
                      )}
                      {" "}
                      {/* Utilisation de subcategory */}
                    </h4>
                    {/* Ligne qui relie */}
                    <div
                      style={{
                        flexGrow: 1,
                        height: 1,
                        background: "#ccc",
                      }}
                    />
                    {/* Zone TOUT avec le lien */}
                    <Link 
                      href={`/${locale}/${categoryPath}/${articleEmplacement1?.subcategory.slug}`} 
                    style={{ color: "#db2e44" }}>
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
                      
                        {" "}
                        {/* Lien dynamique pour "TOUT" */}
                        {t.all}
                    </h4>
                      </Link>
                  </div>

                  <div className="block-content">
                    <div className="loops-mixed">
                      <div className="loop loop-grid loop-grid-base grid grid-1 md:grid-1 xs:grid-1">
                        {/* Emplacement 1 */}
                      <ThirdSectionBloc1Component locale={locale} articleEmplacement1={articleEmplacement1}/>
                      </div>

                      <div
                        className="loop loop-small loop-small-a loop-sep loop-small-sep grid grid-1 md:grid-1 sm:grid-1 xs:grid-1"
                        style={{
                          overflow: "visible !important",
                          marginTop: 0,
                        }}
                      >
                        <div style={{ marginTop: 20 }}></div>
                        <ThirdSectionBloc3Component locale={locale} articleEmplacement3={articleEmplacement3}/>
                        <ThirdSectionBloc3Component locale={locale} articleEmplacement3={articleEmplacement5}/>
                        <ThirdSectionBloc3Component locale={locale} articleEmplacement3={articleEmplacement7}/>
                        
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: "\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t",
          }}
        />

        <div
          className="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-ded5d6e"
          data-id="ded5d6e"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-81e61b8 elementor-widget elementor-widget-smartmag-highlights"
              data-id="81e61b8"
              data-element_type="widget"
              data-widget_type="smartmag-highlights.default"
            >
              <div className="elementor-widget-container">
                <section
                  className="block-wrap block-highlights block-sc mb-none"
                  data-id={13}
                  data-is-mixed={1}
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
                        width: 188,
                        textTransform: 'uppercase',
                        textAlign:'center'
                      }}
                      className="headin font-interBlack"
                    >
                      
                      {decodeHTML(
                        articleEmplacement2?.subcategory?.name || ""
                      )}
                      {" "}
                      {/* Utilisation de subcategory */}
                    </h4>
                    {/* Ligne qui relie */}
                    <div
                      style={{
                        flexGrow: 1,
                        height: 1,
                        background: "#ccc",
                      }}
                    />
                    {/* Zone TOUT avec le lien */}
                    <Link 
                    href={`/${locale}/${categoryPath}/${articleEmplacement2?.subcategory.slug}`}                           
                    style={{ color: "#db2e44" }}>
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
                          {" "}
                          {t.all}
                        </h4>
                      </Link>
                  </div>
                  <div className="block-content">
                    <div className="loops-mixed">
                      <div className="loop loop-grid loop-grid-base grid grid-1 md:grid-1 xs:grid-1">
                      
                      {/* Emplacement 2 */}
                      <ThirdSectionBloc2Component locale={locale} articleEmplacement2={articleEmplacement2} />                        

                      </div>
                      <div
                        className="loop loop-small loop-small-a loop-sep loop-small-sep grid grid-1 md:grid-1 sm:grid-1 xs:grid-1"
                        style={{
                          overflow: "visible !important",
                          marginTop: 0,
                        }}
                      >
                        <div style={{ marginTop: 20 }}></div>
                        <ThirdSectionBloc3Component locale={locale} articleEmplacement3={articleEmplacement4}/>
                        <ThirdSectionBloc3Component locale={locale} articleEmplacement3={articleEmplacement6}/>
                        <ThirdSectionBloc3Component locale={locale} articleEmplacement3={articleEmplacement8}/>
                        
                      </div>
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

export default ThirdSectionComponent;
