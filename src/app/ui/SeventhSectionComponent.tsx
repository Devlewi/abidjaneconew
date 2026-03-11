"use client";
import * as he from "he";
import Link from "next/link";
import React from "react";
import { formatDuration } from "../utils/stringUtils";
import { FiEye } from "react-icons/fi";
import { getTranslation } from "../utils/i18n";

interface Post {
  id: number;
  title: string;
  slug: string;
  post_type: string;
  views: number;
  date: string;
  path: string;
  duree_en_seconde: string;
  reading_time: string;
  // autres champs si besoin
}

interface SeventhSectionComponentProps {
  most_viewed_content: Post[];
  locale?: string;
}

const SeventhSectionComponent: React.FC<SeventhSectionComponentProps> = ({
  most_viewed_content = [], 
  locale,
}) => {

//const t = getTranslation(locale);
const t = getTranslation(locale ?? "fr");

  //const pressreleases = t.pressreleases || "";
  const mostread = t.mostread || "";
  const view = t.view || "";
  const reading = t.reading || "";
  return (
    <section
      className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-aab5c4e elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="aab5c4e"
      data-element_type="section"
      style={{ marginTop: -0 }}
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
                        width: 180,
                      }}
                      className="headin font-interBlack"
                    >
                      <Link href="#" className="text-[white]">{mostread}</Link>
                    </h3>
                  </div>

                  <div className="block-content">
                    {/* Grille responsive avec Tailwind */}
                    <div className="loop loop-grid loop-grid-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                      {most_viewed_content.map((post) => (
                        <article
                          key={post.id}
                          className="l-post grid-post grid-sm-post p- rounded-md bg-white"
                          // border si besoin : border border-gray-300
                        >
                          <div className="text-content">
                            <div className="post-meta post-meta-a has-below">
                              <h2 className="is-title post-title text-lg font-bold">
                                <Link
                                  href={`${locale}${post.path + "/" || "#"}${post.slug}`}
                                  className="text-[#1f3162] no-underline"
                                  style={{ fontSize: 16, fontWeight: "700" }}
                                >
                                  {he.decode(post.title)}
                                </Link>
                              </h2>
                              <div className="flex items-center text-sm text-[#1f3162] mt-1 mb-4 font-medium">
                                <FiEye className="mr-1.5" />
                                {post.views} {view}
                              </div>

                              <div className="post-meta-items meta-below bg-[#db2e44] w-[190px] text-white pl-1.5 pb-1">
                                <span className="meta-item date">
                                  <span className="date-link">
                                    <time
                                      className="post-date font-extrabold text-xs"
                                      dateTime={post.date}
                                    >
                                      {new Date(post.date).toLocaleDateString(
                                        locale || undefined,
                                        {
                                          day: "2-digit",
                                          month: "long",
                                          year: "numeric",
                                        }
                                      )}
                                    </time>
                                  </span>
                                </span>
                                {" - "}

                                <time
                                  className="post-date font-extrabold text-xs"
                                  dateTime={post.date}
                                >
                                  {post.post_type === "featured_video" &&
                                  post.duree_en_seconde
                                    ? `Durée : ${
                                        isNaN(Number(post.duree_en_seconde))
                                          ? "N/A"
                                          : formatDuration(
                                              Number(post.duree_en_seconde)
                                            )
                                      }`
                                    : post.reading_time
                                    ? `${post.reading_time} ${reading}`
                                    : ""}
                                </time>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
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

export default SeventhSectionComponent;
