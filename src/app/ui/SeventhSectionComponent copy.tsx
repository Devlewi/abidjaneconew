/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css"; // ajuste ce chemin selon ton projet

interface Post {
  id: number;
  title: string;
  slug: string;
  post_type: string;
  views: number;
  // ajoute d'autres champs si besoin
}

interface NinthSectionComponentProps {
  most_viewed_content: Post[];
  locale?: string; // si tu utilises la locale
}

const NinthSectionComponent: React.FC<NinthSectionComponentProps> = ({
  most_viewed_content = [],
  locale,
}) => {
  return (
    <section
            className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-aab5c4e elementor-section-boxed elementor-section-height-default elementor-section-height-default"
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
                          <h4
                            style={{
                              background: "#db2e44",
                              color: "white",
                              padding: 10,
                              borderRadius: 5,
                              fontSize: 20,
                              width: 180,
                            }}
                            className="heading"
                          >
                            <a href="#">LES + LUS</a>
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
                            TOUT
                          </h4>
                        </div>
                        <div className="block-content">
                          <div className="loop loop-grid loop-grid-sm grid grid-4 md:grid-2 xs:grid-1">
                            <article className="l-post grid-post grid-sm-post">
                              <div className="text-content">
                                <div className="post-meta post-meta-a has-below">
                                  <h2 className="is-title post-title">
                                    <a
                                      href="#"
                                      style={{
                                        color: "#1f3162",
                                        fontWeight: 700,
                                      }}
                                    >
                                      GLOBELEQ procède à la réduction de la
                                      production des centrales électriques de
                                      Kribi et de Dibamba
                                    </a>
                                  </h2>
                                  <div
                                    className="post-meta-items meta-below"
                                    style={{
                                      background: "#db2e44",
                                      width: 160,
                                      color: "white",
                                      paddingLeft: 5,
                                      paddingBottom: 3,
                                    }}
                                  >
                                    <span className="meta-item date">
                                      <span className="date-link">
                                        <time
                                          className="post-date"
                                          dateTime="2021-01-14T16:25:00+00:00"
                                          style={{
                                            fontWeight: 800,
                                            fontSize: 10,
                                          }}
                                        >
                                          23 janvier
                                        </time>
                                      </span>
                                    </span>{" "}
                                    -
                                    <time
                                      className="post-date"
                                      dateTime="2021-01-14T16:25:00+00:00"
                                      style={{
                                        fontWeight: 800,
                                        fontSize: 10,
                                      }}
                                    >
                                      3 min de lecture
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </article>
                            <article className="l-post grid-post grid-sm-post">
                              <div className="text-content">
                                <div className="post-meta post-meta-a has-below">
                                  <h2 className="is-title post-title">
                                    <a
                                      href="#"
                                      style={{
                                        color: "#1f3162",
                                        fontWeight: 700,
                                      }}
                                    >
                                      GLOBELEQ procède à la réduction de la
                                      production des centrales électriques de
                                      Kribi et de Dibamba
                                    </a>
                                  </h2>
                                  <div
                                    className="post-meta-items meta-below"
                                    style={{
                                      background: "#db2e44",
                                      width: 160,
                                      color: "white",
                                      paddingLeft: 5,
                                      paddingBottom: 3,
                                    }}
                                  >
                                    <span className="meta-item date">
                                      <span className="date-link">
                                        <time
                                          className="post-date"
                                          dateTime="2021-01-14T16:25:00+00:00"
                                          style={{
                                            fontWeight: 800,
                                            fontSize: 10,
                                          }}
                                        >
                                          23 janvier
                                        </time>
                                      </span>
                                    </span>{" "}
                                    -
                                    <time
                                      className="post-date"
                                      dateTime="2021-01-14T16:25:00+00:00"
                                      style={{
                                        fontWeight: 800,
                                        fontSize: 10,
                                      }}
                                    >
                                      3 min de lecture
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </article>
                            <article className="l-post grid-post grid-sm-post">
                              <div className="text-content">
                                <div className="post-meta post-meta-a has-below">
                                  <h2 className="is-title post-title">
                                    <a
                                      href="#"
                                      style={{
                                        color: "#1f3162",
                                        fontWeight: 700,
                                      }}
                                    >
                                      GLOBELEQ procède à la réduction de la
                                      production des centrales électriques de
                                      Kribi et de Dibamba
                                    </a>
                                  </h2>
                                  <div
                                    className="post-meta-items meta-below"
                                    style={{
                                      background: "#db2e44",
                                      width: 160,
                                      color: "white",
                                      paddingLeft: 5,
                                      paddingBottom: 3,
                                    }}
                                  >
                                    <span className="meta-item date">
                                      <span className="date-link">
                                        <time
                                          className="post-date"
                                          dateTime="2021-01-14T16:25:00+00:00"
                                          style={{
                                            fontWeight: 800,
                                            fontSize: 10,
                                          }}
                                        >
                                          23 janvier
                                        </time>
                                      </span>
                                    </span>{" "}
                                    -
                                    <time
                                      className="post-date"
                                      dateTime="2021-01-14T16:25:00+00:00"
                                      style={{
                                        fontWeight: 800,
                                        fontSize: 10,
                                      }}
                                    >
                                      3 min de lecture
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </article>
                            <article className="l-post grid-post grid-sm-post">
                              <div className="text-content">
                                <div className="post-meta post-meta-a has-below">
                                  <h2 className="is-title post-title">
                                    <a
                                      href="#"
                                      style={{
                                        color: "#1f3162",
                                        fontWeight: 700,
                                      }}
                                    >
                                      GLOBELEQ procède à la réduction de la
                                      production des centrales électriques de
                                      Kribi et de Dibamba
                                    </a>
                                  </h2>
                                  <div
                                    className="post-meta-items meta-below"
                                    style={{
                                      background: "#db2e44",
                                      width: 160,
                                      color: "white",
                                      paddingLeft: 5,
                                      paddingBottom: 3,
                                    }}
                                  >
                                    <span className="meta-item date">
                                      <span className="date-link">
                                        <time
                                          className="post-date"
                                          dateTime="2021-01-14T16:25:00+00:00"
                                          style={{
                                            fontWeight: 800,
                                            fontSize: 10,
                                          }}
                                        >
                                          23 janvier
                                        </time>
                                      </span>
                                    </span>{" "}
                                    -
                                    <time
                                      className="post-date"
                                      dateTime="2021-01-14T16:25:00+00:00"
                                      style={{
                                        fontWeight: 800,
                                        fontSize: 10,
                                      }}
                                    >
                                      3 min de lecture
                                    </time>
                                  </div>
                                </div>
                              </div>
                            </article>
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

export default NinthSectionComponent;
