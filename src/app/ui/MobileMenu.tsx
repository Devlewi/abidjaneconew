/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | number | null>(null);


  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSubMenu = (menuId: string | number) => {
    setOpenSubMenu((prev) => (prev === menuId ? null : menuId));
  };
  

  return (
    <div>
      {/* Bouton hamburger */}
      <button onClick={toggleMenu} className="offcanvas-toggle has-icon">
        <span className="hamburger-icon hamburger-icon-a">
          <span className="inner" />
        </span>
      </button>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "80vw",
            minWidth: "320px",
            maxWidth: "370px",
            height: "100%",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            background: "#fff",
            boxShadow: "4px 0 10px rgba(0,0,0,0.4)",
            animation: "slideIn 0.3s ease forwards",
          }}
        >
          {/* Entête */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Link href="" className="logo-link ts-logo logo-is-image">
              <img
                src="/images/logo4.jpg"
                alt="SmartMag Logo"
                className="logo-image"
                style={{ height: "40px", objectFit: "contain" }}
              />
            </Link>
            <button
              onClick={toggleMenu}
              style={{
                fontSize: "1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Fermer le menu"
            >
              ✖
            </button>
          </div>

          {/* Corps du menu */}
          <div style={{ flex: 1, padding: "1rem" }}>
            <ul className="mobile-menu">
              <li className="menu-item">
                <a href="index.html">À la une</a>
              </li>

              {/* Politique */}
              <h1 className="text-[red] text-sm">Hello Tailwind!</h1>

              <li className="menu-item menu-item-has-children">
                <a href="#" onClick={() => toggleSubMenu(3159)}>
                  Politique
                </a>
                <span className="chevron">
                  <i className="tsi tsi-chevron-down" />
                </span>
                {openSubMenu === 3159 && (
                  <ul className="sub-menu">
                    <li className="menu-item menu-item-has-children">
                      <a
                        target="_blank"
                        href="#"
                      >
                        item 1 politique
                      </a>
                      <span className="chevron">
                        <i className="tsi tsi-chevron-down" />
                      </span>
                      <ul className="sub-menu">
                        <li className="menu-item">
                          <a
                            target="_blank"
                            href="#"
                          >
                            sub item 1
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
              </li>

              {/* Économie */}
              <li className="menu-item menu-item-has-children">
                <a href="#" onClick={() => toggleSubMenu(577)}>
                  Économie
                </a>
                <span className="chevron">
                  <i className="tsi tsi-chevron-down" />
                </span>
                {openSubMenu === 577 && (
                  <ul className="sub-menu">
                    <li className="menu-item menu-item-has-children">
                      <a
                        target="_blank"
                        href="#"
                      >
                        item 1 economic
                      </a>
                      <span className="chevron">
                        <i className="tsi tsi-chevron-down" />
                      </span>
                      <ul className="sub-menu">
                        <li className="menu-item">
                          <a
                            target="_blank"
                            href="#"
                          >
                            sub item 1
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
