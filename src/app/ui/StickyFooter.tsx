"use client";

import { useState, useEffect } from "react";
import Styles from "./styles/StickyFooter.module.css";

type StickyFooterProps = {
  isVisible: boolean;
};

const StickyFooter = ({ isVisible }: StickyFooterProps) => {
  const [visible, setVisible] = useState(isVisible);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Si on ferme le sticky, on cache localement
  if (!visible) return null;

  return (
    <div className={Styles.stickyFooter}>
      <div className={Styles.footerContent}>
        <center>
          {isMobile ? (
            <ins data-revive-zoneid="233" data-revive-id="97f3bbebf0ebdc5eed163b8fac6171c8" />
          ) : (
            <ins data-revive-zoneid="232" data-revive-id="97f3bbebf0ebdc5eed163b8fac6171c8" />
          )}

          <script async src="//client.cynomedia-africa.com/www/delivery/asyncjs.php"></script>

          <button
            onClick={() => setVisible(false)}
            style={{
              position: "absolute",
              right: 10,
              top: -10,
              width: 0,
              height: 32,
              borderRadius: "50%",
              fontSize: 15,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          >
            ×
          </button>
        </center>
      </div>
    </div>
  );
};

export default StickyFooter;
