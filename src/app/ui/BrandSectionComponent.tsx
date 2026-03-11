"use client";

import React from "react";
import "@/app/globals.css";
import BrandGrid from "./BrandGrid";

type Article = {
  id: number;
  title: string;
  slug: string;
  link: string;
  brand_name: string;
  brand_logo: string;
  date: string;
  thumbnail: string;
  featured_image: string;
  excerpt: string;
  photo_credit?: string;
  views: number;
};

interface Props {
  locale: string;
  articles: Article[];
}

const BrandSectionComponent: React.FC<Props> = ({ locale, articles }) => {
  
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
                                <a href="#" className="text-[white]">PARTENAIRE</a>
                              </h3>
                              {/* Ligne qui relie */}
                              
                              {/* Zone TOUT */}
                              
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
      className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default pt-7 md:pt-0"
      style={{ background: "#1f3162", marginBottom: 40, marginTop: -20 }}
    >
      <div className="elementor-container elementor-column-gap-no">
        <div className="elementor-column elementor-col-100 elementor-top-column">
          <div className="elementor-widget-wrap elementor-element-populated">
            <div className="elementor-widget-container">
              <section className="block-wrap block-grid block-sc mb-none">
                <BrandGrid dataArticles={articles} locale={locale} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default BrandSectionComponent;
