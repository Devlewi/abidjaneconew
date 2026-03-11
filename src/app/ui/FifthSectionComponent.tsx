/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/app/globals.css"; // ajuste ce chemin selon ton projet
import Link from "next/link";
import { getTranslation } from "../utils/i18n";
import FifthSectionBloc1Component from "./FifthSectionBloc1Component";
//import EspacePub300x600 from "./EspacePub300x600";
import { formatViews } from "../utils/stringUtils";
import { FiEye } from "react-icons/fi";
//import EspacePub300x600 from "./EspacePub300x1000";
import EspacePub300x1000 from "./EspacePub300x1000";
import he from "he";


interface Article {
  emplacement: number;
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  views: string;
  link: string;
  thumbnail: string;
  featured_image: string;
  date: string;
  photo_credit: string;
  subcategory: {
    id: number;
    name: string;
    slug: string;
  };
  reading_time?: number; // optionnel
  source?: string; // optionnel
}

interface Section56 {
  [key: string]: Article[];
}

interface FifthSectionProps {
  locale: string;
  section56: Section56;
  ideasOpinions: Article[];
}

const FifthSectionComponent: React.FC<FifthSectionProps> = ({
  locale,
  ideasOpinions,
  section56,
}) => {
  //console.log(locale);
  //console.log(data);
  const t = getTranslation(locale); // locale = "fr" ou "en"
  //const category = t.category || "";
  const view = t.view || "";
  const articlePath = t.singulararticle || "article";
  const idea = t.idea || "";
  const categoryPath = t.category || "categorie";
  const source = t.source || "";
  const categoryPath2 =
    locale === "fr" ? "idees-et-opinions-fr" : "ideas-opinions-en";
  const reading = t.reading || "";
  //const latest = t.latest || '';
  //const articl = t.articles || '';
  //console.log("section56 = ", section56);

  //const articleEmplacement1 = section56.emplacement_1?.[0] || null;
  //const articleEmplacement2 = section56.emplacement_2?.[0] || null;
  //const articleEmplacement3 = section56.emplacement_3?.[0] || null;
  //const articleEmplacement4 = section56.emplacement_4?.[0] || null;
  //const articleEmplacement5 = section56.emplacement_5?.[0] || null;
  //const articleEmplacement6 = section56.emplacement_6?.[0] || null;
  //const [loading, setLoading] = useState(true); // L'état de chargement

  //console.log("emplacement_1 = ", articleEmplacement1);

  return (
    <section
      className="has-el-gap el-gap-default elementor-section elementor-top-section elementor-element elementor-element-c487622 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="c487622"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-no">
        {/* LEFT */}
        <div
          className="elementor-column elementor-col-33 col-gauche elementor-top-column elementor-element elementor-element-fe3a797 main-sidebar main-sidebar ts-stiky-col"
          data-id="fe3a797"
          data-element_type="column"
          style={{ marginTop: -60 }}
        >
          <div className="elementor-widget-wrap elementor-element-populated md:mb-0 mb-32">
            <div
              className="elementor-element elementor-element-c1d96a9 elementor-widget elementor-widget-smartmag-highlights"
              data-id="c1d96a9"
              data-element_type="widget"
              data-widget_type="smartmag-highlights.default"
            >
              <div className="elementor-widget-container">
                <section
                  className="block-wrap block-highlights block-sc"
                  data-id={19}
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
                        fontSize: 12,
                        width: 160,
                      }}
                      className="headin font-interBlack"
                    >
                      <a href="#" className="text-[white]">
                        &nbsp;&nbsp;&nbsp;&nbsp;{idea}&nbsp;&nbsp;&nbsp;&nbsp;
                      </a>
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
                    <Link
                      href={`/${locale}/${categoryPath}/${categoryPath2}/`}
                      style={{ color: "#db2e44" }}
                    >
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
                        {t.all}
                      </h4>
                    </Link>
                  </div>
                  <div className="block-content">
                    <div className="loops-mixed">
                    {ideasOpinions.length === 0 ? (
    <div className="text-left text-gray-500 py-0">
      Aucun article disponible pour le moment.
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>):(<></>)
    }

                      <div className="loop loop-grid loop-grid-base grid grid-1 md:grid-1 xs:grid-1 ">
                        {ideasOpinions.map((post, index) => (
                          <article
  key={index}
  className="l-post small-post small-a-post m-pos-left"
  style={{ marginBottom: -25 }}
>

<div className="small-media relative w-full md:w-32">
  <Link
    href={`/${locale}/${articlePath}/${post.slug}`}
    title={post.title}
    className="block"
  >
    <div
      className="w-full bg-cover bg-center bg-no-repeat overflow-hidden rounded-lg min-h-[300px] md:min-h-[120px]"
      style={{
        backgroundImage: `url(${post.featured_image || "/fr/images/default1-img.webp"})`,
      }}
    />

    {/* Crédit photo superposé en bas à gauche */}
    {post.photo_credit && (
      <div
        className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-[10px] px-2 py-1 rounded z-50 max-w-[90%] truncate"
        title={post.photo_credit}
      >
        {post.photo_credit}
      </div>
    )}
  </Link>
</div>


  <div className="content">
    {/* Le reste de ton contenu reste inchangé */}
    <div className="post-meta post-meta-a post-meta-left has-below">
      <h4 className="is-title post-title truncate-2-lines">
        <Link
          href={`/${locale}/${articlePath}/${post.slug}`}
          style={{
            color: "#db2e44",
            fontWeight: 700,
            fontSize: "11px !important",
          }}
        >
          {he.decode(post.title) || "Titre non disponible"}
        </Link>
      </h4>
      <div className="post-meta-items meta-below mt-[-5px] mb-[5px]  truncate-2-lines">
        <span className="meta-item date">
          <span className="date-link">
            <time
              className="post-date text-[#1f3162] font-bold"
              dateTime="2021-01-13T15:47:07+00:00"
            >
              {source}: {he.decode(post.source || "")}
            </time>
          </span>
        </span>
      </div>
      <div className="post-meta-items meta-below">
        <span className="meta-item date">
          <span className="date-link text-[#1f3162]">
            <time
              className="post-date text-[10px]"
              dateTime="2021-01-13T15:47:07+00:00"
            >
              <i className="fa fa-clock" style={{ paddingRight: 5 }} />
              {post.reading_time} {reading}
            </time>
          </span>
        </span>
      </div>
      <div className="post-meta-items meta-below mt-[4px] mb-[5px]">
        <span className="meta-item date">
          <span className="date-link">
            <time
              className="post-date text-[#1f3162] font-bold flex items-center text-[10px]"
              dateTime="2021-01-13T15:47:07+00:00"
            >
              <FiEye className="mr-1" />
              {formatViews(post.views)} {view}
            </time>
          </span>
        </span>
      </div>
    </div>
  </div>
</article>

                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div
          className="elementor-column elementor-col-33 col-centre elementor-top-column elementor-element elementor-element-fe3a797 main-sidebar main-sidebar ts-stick-col"
          data-id="fe3a797"
          data-element_type="column"
          style={{ marginTop: -40 }}
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <div
              className="elementor-element elementor-element-c1d96a9 elementor-widget elementor-widget-smartmag-highlights"
              data-id="c1d96a9"
              data-element_type="widget"
              data-widget_type="smartmag-highlights.default"
            >
              <div className="elementor-widget-container">
                <section
                  className="block-wrap block-highlights block-sc"
                  data-id={19}
                  data-is-mixed={1}
                >
                  <div className="block-content">
                    <div className="loops-mixed">
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.article-category-label {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ttop: -10px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tleft: -0px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tbackground-color: #1f3162;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t/* bleu vif */\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tcolor: white;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tpadding: 4px 10px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tborder-radius: 5px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfont-size: 12px;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tz-index: 5;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t.medium-media {\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t/* important pour que le label se positionne par rapport à l’image */\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
                        }}
                      />
                      <div className="loop loop-grid loop-grid-base grid-new grid-2 md:grid-2 xs:grid-1">
                        <FifthSectionBloc1Component
                          locale={locale}
                          articleEmplacement1={
                            section56.emplacement_1?.[0] || null
                          }
                        />

                        <FifthSectionBloc1Component
                          locale={locale}
                          articleEmplacement1={
                            section56.emplacement_2?.[0] || null
                          }
                        />
                        <FifthSectionBloc1Component
                          locale={locale}
                          articleEmplacement1={
                            section56.emplacement_3?.[0] || null
                          }
                        />
                        <FifthSectionBloc1Component
                          locale={locale}
                          articleEmplacement1={
                            section56.emplacement_4?.[0] || null
                          }
                        />
                        <FifthSectionBloc1Component
                          locale={locale}
                          articleEmplacement1={
                            section56.emplacement_5?.[0] || null
                          }
                        />
                        <FifthSectionBloc1Component
                          locale={locale}
                          articleEmplacement1={
                            section56.emplacement_6?.[0] || null
                          }
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT ts-sticky-col*/}
        <div
            className="hidden md:block elementor-column elementor-col-33 col-droite elementor-top-column elementor-element elementor-element-fe3a797 main-sidebar"
          data-id="fe3a797"
          data-element_type="column"
          style={{ marginTop: -40 }}
        >
          <div className="elementor-widget-wrap elementor-element-populated hidden md:block ">
            <div
              className="elementor-element elementor-element-c8dd485 elementor-widget elementor-widget-smartmag-codes hidden md:block "
              data-id="c8dd485"
              data-element_type="widget"
              data-widget_type="smartmag-codes.default"
            >
              <div className="elementor-widget-container hidden md:block ">
                <div className="a-wrap">
                  {" "}
                  <EspacePub300x1000 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSectionComponent;
