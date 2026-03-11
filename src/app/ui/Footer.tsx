"use client";

import Link from "next/link";
import { getTranslation } from "../utils/i18n";
import { useLocale } from "next-intl";
import he from "he";

// src/ui/Footer.js

type StickyFooterProps = {
  isVisible: boolean;
};

export default function Footer({ isVisible }: StickyFooterProps) {

  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL;
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL;
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL;
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL;
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
  const threadsUrl = process.env.NEXT_PUBLIC_THREADS_URL;
  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL;

  const locale = useLocale(); // ou via context, props, ou `useRouter().locale` selon ton setup

  const t = getTranslation(locale);
  const categoryPath = t.category || "";

  const mentionlegalslug = t.mentionlegalslug || "";
  const mentionlegaltxt = t.mentionlegaltxt || "";
  
  const dataprotectionslug = t.dataprotectionslug || "";
  const dataprotectiontxt = t.dataprotectiontxt || "";
  
  const cookietxt = t.cookietxt || "";
  const cookieslug = t.cookieslug || "";
  
  
  const privacytxt = t.privacytxt || "";
  const privacyslug = t.privacyslug || "";


  const menu = t.menu;
  const slugs = t.slugs;

  return (
    <footer className="main-footer cols-gap-lg footer-bold s-dark">
  <div
    className="lower-footer bold-footer-lower"
    style={{ background: "#db2e44", marginTop:-60 }}
  >
    <div
      className="ts-contain inner"
      style={{ display: "flow", width: "95%" }}
    >
      <div className="block-content">
        <div className="loop loop-grid loop-grid-sm grid grid-5 md:grid-2 xs:grid-1">
          <article className="l-post grid-post grid-sm-post">
            <div className="text-content">
              <div className="post-meta post-meta-a has-below">
                <h2 className="uppercase" style={{ fontSize: 18, fontWeight: 800 }}>{menu.eco}</h2>
                <ul>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.agro}`} style={{ color: "#fff", fontWeight: 700, fontSize:15 }}>
                    {he.decode(menu.agro)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.tech}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.tech)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.entreprises}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.entreprises)}
                    </Link>
                  </li>                  
                </ul>
              </div>
            </div>
          </article>
          <article className="l-post grid-post grid-sm-post">
            <div className="text-content">
              <div className="post-meta post-meta-a has-below">
                <h2 className="uppercase" style={{ fontSize: 18, fontWeight: 800 }}>{menu.finance}</h2>
                <ul>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.banques}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.banques)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.assurances}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.assurances)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.marches}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.marches)}
                    </Link>
                  </li>                  
                </ul>
              </div>
            </div>
          </article>
          <article className="l-post grid-post grid-sm-post">
            <div className="text-content">
              <div className="post-meta post-meta-a has-below">
                <h2 className="uppercase" style={{ fontSize: 18, fontWeight: 800 }}>{menu.infra}</h2>
                <ul>
                  <li>
                    <Link href={``} style={{ color: "#fff", fontWeight: 700 }}>
                    {he.decode(menu.btp)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.transports}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.transports)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.energie}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.energie)}
                    </Link>
                  </li>                  
                </ul>
              </div>
            </div>
          </article>
          <article className="l-post grid-post grid-sm-post">
            <div className="text-content">
              <div className="post-meta post-meta-a has-below">
                <h2 style={{ fontSize: 18, fontWeight: 800 }} className="uppercase">
                {he.decode(menu.decideurs)}
                </h2>
                <ul>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.energie}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    Succes Story
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.decideurs}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    Jeunes Talents
                    </Link>
                  </li>                  
                </ul>
              </div>
            </div>
          </article>
          <article className="l-post grid-post grid-sm-post">
            <div className="text-content">
              <div className="post-meta post-meta-a has-below">
                <h2 style={{ fontSize: 18, fontWeight: 800 }} className="uppercase">
                {he.decode(menu.tribune)}
                </h2>
                <ul>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.interview}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.interview)}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/${categoryPath}/${slugs.opinions}`} style={{ color: "#fff", fontWeight: 700, fontSize:15  }}>
                    {he.decode(menu.opinions)}
                    </Link>
                  </li>                  
                </ul>
              </div>
              <br />
              <div className="post-meta post-meta-a has-below">
                <Link href={`/${locale}/${categoryPath}/${slugs.decryptage}`}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }} className="uppercase">
                  {he.decode(menu.decryptage)}
                  </h2>                
                </Link>
              </div>
              <div className="post-meta post-meta-a has-below">
                <Link href={`/${locale}/${categoryPath}/${slugs.international}`}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }} className="uppercase">
                  {he.decode(menu.international)}
                  </h2>                
                </Link>
              </div>
              <div className="post-meta post-meta-a has-below">
                <Link href={`/${locale}/${categoryPath}/${slugs.pubreport}`}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }} className="uppercase">
                  {he.decode(menu.pubreport)}
                  </h2>                
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
      {/*br/><br/><br/><br/><br/><br/*/}
      {/*div class="copyright">
						&copy; 2025 ThemeSphere. Designed by <a href="https://theme-sphere.com/">ThemeSphere</a>. </div*/}
    </div>
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      flexWrap: "wrap",
      gap: 20,
      backgroundColor: "#c3233e"
    }}
  >
    <div className="spc-social-block spc-social spc-social-b smart-head-social">
    {facebookUrl && (
      <a
      href={facebookUrl}
      className="link service2 s-facebook"
      target="_blank"
      rel="nofollow noopener"
      style={{
        backgroundColor: "white",
        width: "30px",
        height: "30px"
      }}
    >
      <i
        className="icon tsi tsi-facebook"
        style={{ fontSize: 25, color: "#c3233e" }}
      />{" "}
      <span className="visuallyhidden">Facebook</span>
    </a>
)}
    {whatsappUrl && (
      <a
      href={whatsappUrl}
      className="link service2 s-facebook"
      target="_blank"
      rel="nofollow noopener"
      style={{
        backgroundColor: "white",
        width: "30px",
        height: "30px"
      }}
    >
      <i
        className="fab fa-whatsapp"
        style={{ fontSize: 25, color: "#c3233e" }}
      />{" "}
      <span className="visuallyhidden">Whatsapp</span>
    </a>
)}


{linkedinUrl && (
   <a
   href={linkedinUrl}
   className="link service2 s-linkedin"
   target="_blank"
   rel="nofollow noopener"
   style={{
     backgroundColor: "white",
     width: "30px",
     height: "30px"
   }}
 >
   <i
     className="fab fa-linkedin-in"
     style={{ fontSize: 25, color: "#c3233e" }}
   />{" "}
   <span className="visuallyhidden">(Linkedin)</span>
 </a>
)}



{twitterUrl && (
      <a
      href={twitterUrl}
      className="link service2 s-twitter"
      target="_blank"
      rel="nofollow noopener"
      style={{
        backgroundColor: "white",
        width: "30px",
        height: "30px"
      }}
    >
      <i
        className="icon tsi tsi-twitter"
        style={{ fontSize: 25, color: "#c3233e" }}
      />{" "}
      <span className="visuallyhidden">X (Twitter)</span>
    </a>

)}
     
     {linkedinUrl && (
   <a
   href={youtubeUrl}
   className="link service2 s-youtube"
   target="_blank"
   rel="nofollow noopener"
   style={{
     backgroundColor: "white",
     width: "30px",
     height: "30px"
   }}
 >
   <i
     className="icon tsi tsi-youtube-play"
     style={{ fontSize: 25, color: "#c3233e" }}
   />
   <span className="visuallyhidden">(Youtube)</span>
 </a>
)}
     

     {instagramUrl && (
      <a
      href={instagramUrl} 
      className="link service2 s-instagram custom-override"
      target="_blank"
      rel="nofollow noopener"
    >
      <i className="icon tsi tsi-instagram" style={{ fontSize: 25, color: "#c3233e" }} />
      <span className="visuallyhidden">Instagram</span>
    </a>
    
)}     
    
     {threadsUrl && (
    <a
                      href={process.env.NEXT_PUBLIC_THREADS_URL}
                      className="link service2 s-instagram custom-override"
                      target="_blank"
                      rel="nofollow noopener"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                fill="#c3233e" 
                  width="25"    
                  height="25"   
              >
                <path d="M331.5 235.7c2.2 .9 4.2 1.9 6.3 2.8 29.2 14.1 50.6 35.2 61.8 61.4 15.7 36.5 17.2 95.8-30.3 143.2-36.2 36.2-80.3 52.5-142.6 53l-.3 0c-70.2-.5-124.1-24.1-160.4-70.2-32.3-41-48.9-98.1-49.5-169.6l0-.5C17 184.3 33.6 127.2 65.9 86.2 102.2 40.1 156.2 16.5 226.4 16l.3 0c70.3 .5 124.9 24 162.3 69.9 18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4-29.2-35.8-73-54.2-130.5-54.6-57 .5-100.1 18.8-128.2 54.4-26.2 33.3-39.8 81.5-40.3 143.2 .5 61.7 14.1 109.9 40.3 143.3 28 35.6 71.2 53.9 128.2 54.4 51.4-.4 85.4-12.6 113.7-40.9 32.3-32.2 31.7-71.8 21.4-95.9-6.1-14.2-17.1-26-31.9-34.9-3.7 26.9-11.8 48.3-24.7 64.8-17.1 21.8-41.4 33.6-72.7 35.3-23.6 1.3-46.3-4.4-63.9-16-20.8-13.8-33-34.8-34.3-59.3-2.5-48.3 35.7-83 95.2-86.4 21.1-1.2 40.9-.3 59.2 2.8-2.4-14.8-7.3-26.6-14.6-35.2-10-11.7-25.6-17.7-46.2-17.8l-.7 0c-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1l.8 0c62.6 .4 99.9 39.5 103.7 107.7l-.2 .2 .1 0zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3 25.6-1.4 54.6-11.4 59.5-73.2-13.2-2.9-27.8-4.4-43.4-4.4-4.8 0-9.6 .1-14.4 .4-42.9 2.4-57.2 23.2-56.2 41.8l-.1 .1z" />
              </svg>
                      {" "}
                      <span className="visuallyhidden">Threads</span>
                    </a>
    
)}     
  
    </div>
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      flexWrap: "wrap",
      gap: 20,
      background: "#db2e44"
    }}
  >
    <center>
    <div className="footer-legal-links" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontWeight: 800 }}>© 2026 Abidjan Eco</span>
          <span>|</span>
          <Link href={`/${locale}/${mentionlegalslug}`} style={{ color: "white", fontWeight: 800 }}>
            {mentionlegaltxt}
          </Link>
          <span>|</span>
          <Link href={`/${locale}/${dataprotectionslug}`} style={{ color: "white", fontWeight: 800 }}>
            {dataprotectiontxt}
          </Link>
          <span>|</span>
          <Link href={`/${locale}/${cookieslug}`} style={{ color: "white", fontWeight: 800 }}>
            {cookietxt}
          </Link>
          <span>|</span>
          <Link href={`/${locale}/${privacyslug}`} style={{ color: "white", fontWeight: 800 }}>
            {privacytxt}
          </Link>
        </div>
    </center>
  </div>
  <>
  {/* Sur desktop : si isVisible true, affiche 7 <br/> */}
  {isVisible && (
    <div className="hidden sm:block">
      <br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  )}

  {/* Sur mobile (sm = small devices, ici en dessous sm) : toujours afficher 5 <br/> */}
  <div className="block sm:hidden">
    <br/><br/><br/><br/><br/>
  </div>
</>


</footer>

  );
}
