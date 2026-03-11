"use client";

import React, { useState, useEffect } from "react";
import { formatDuration, formatLocalizedDate } from "../utils/stringUtils";
import { FaEye } from "react-icons/fa";
import { getTranslation } from "../utils/i18n";
import Link from "next/link";
import dynamic from 'next/dynamic'
import he from "he";

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

interface VideoGridProps {
  dataVideos: Video[];
  locale: string;
}

const LiteYouTubeEmbed = dynamic(() => import('react-lite-youtube-embed'), { ssr: false });


function extractYoutubeId(url: string): string {
  const regex = /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

// Fonction utilitaire pour transformer une URL YouTube normale en URL embed
const getEmbedUrl = (url: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const id = match && match[2].length === 11 ? match[2] : null;
  return id ? `https://www.youtube.com/embed/${id}` : null;
};

export default function VideoGrid({ dataVideos, locale }: VideoGridProps) {
  const [isClient, setIsClient] = useState(false);

  const t = getTranslation(locale);
  const duration = t.duration || "";
  const videopath = t.videopath || "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="block-content">
      <div className="loop loop-grid loop-grid-sm grid grid-4 md:grid-2 xs:grid-1">
        {dataVideos.map((video, index) => {
          const embedUrl = getEmbedUrl(video.url_video);
          if (!embedUrl) return null; // Ignore si URL invalide

          return (
            <article
            key={video.id || index}
            className="l-post grid-post grid-base-post mb-0 lg:mb-10"
          >
          
              <div className="medium-media" style={{ marginBottom: 10 }}>
              <div className="video-wrapper" style={{ aspectRatio: "16/9" }}>
    {isClient && (
      <LiteYouTubeEmbed
        id={extractYoutubeId(embedUrl)} // On extrait l'ID à partir de l'URL complète
        title={he.decode(video.title)}
      />
    )}
  </div>
                {/*
                <div className="video-wrapper" style={{ aspectRatio: "16/9" }}>                
                  {isClient && (
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={video.title}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    
                  )}
                </div>
                */}
                <div className="content" style={{ marginTop: 20 }}>
                  <div className="post-meta post-meta-a has-below">
                    <div
                      className="post-meta-items meta-below"
                      style={{ marginBottom: "-5px" }}
                    >
                      <span
                        className="meta-item post-author"
                        style={{ color: "#fff", fontWeight: 800 }}
                      >
                        {formatLocalizedDate(video?.date || "", locale)}
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {duration}:{" "}
                        {isNaN(Number(video.duree_en_seconde))
                          ? "N/A"
                          : formatDuration(Number(video.duree_en_seconde))}
                      </span>
                    </div>

                    <h2
                      className="is-title post-title truncate-2-lines"
                      style={{ fontSize: 15 }}
                    >
                      <Link
                        href={`/${locale}/${videopath}/${video.slug}`}
                        style={{ color: "#fff", fontWeight: 700 }}
                      >
                        {he.decode(video.title)}
                      </Link>
                    </h2>
                    <div
                      className="post-meta-items meta-below"
                      style={{ marginBottom: "-5px" }}
                    >
                      <span
                        className="meta-item post-author"
                        style={{
                          color: "#fff",
                          fontWeight: 800,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaEye />
                        {video?.views ? `${video.views} vues` : "0 vue"}
                      </span>
                    </div>
                    {/**video.excerpt && (
                      <p
                        style={{ color: "#ccc", marginTop: 8 }}
                        className="truncate-3-lines"
                      >
                        {video.excerpt}
                      </p>
                    )**/}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <br/>
    </div>
  );
}
