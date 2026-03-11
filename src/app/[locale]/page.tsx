import { Metadata } from "next";

import "../globals.css";

import EspacePub1 from "../ui/EspacePub1";
import FlashInfoComponent from "../ui/FlashInfoComponent";
import ThirdSectionComponent from "../ui/ThirdSectionComponent";
import FifthSectionComponent from "../ui/FifthSectionComponent";
import SixfthSectionComponent from "../ui/SixfthSectionComponent";
import SeventhSectionComponent from "../ui/SeventhSectionComponent";
import EighthSectionComponent from "../ui/EighthSectionComponent";
import NinthSectionComponent from "../ui/NinthSectionComponent";
import EspacePub2 from "../ui/EspacePub2";
import PubReportageSectionComponent from "../ui/PubReportageSectionComponent";
import BrandSectionComponent from "../ui/BrandSectionComponent";
//import { getTranslation } from "../utils/i18n";


//const siteDomain = "https://siteco-frontend.vercel.app";
const siteDomain = process.env.NEXT_PUBLIC_API_BASE_URL || "";
//const locales = ["fr", "en"];

type Props = {
  params: Promise<{ locale: string }>;
};




export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const alternates: Metadata['alternates'] = {
    languages: {
      fr: `${siteDomain}/fr`,
      en: `${siteDomain}/en`,
      "x-default": `${siteDomain}/fr`,
    },
  };

  return {
    title: locale === "en" ? "Abidjan ECO | HOME" : "ABIDJAN ECO | ACCUEIL",
    description:
      locale === "en"
        ? "Abidjan ECO is your economic news portal dedicated to Abidjan"
        : "Abidjan ECO est votre portail d'information économique dédié à Abidjan",

    // Icônes de navigation
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },

    //  Langues alternatives
    alternates,

    // Balises Open Graph pour Facebook, WhatsApp, etc.
    openGraph: {
      title: locale === "en" ? "Abidjan ECO | HOME" : "ABIDJAN ECO | ACCUEIL",
      description:
        locale === "en"
          ? "Abidjan ECO is your economic news portal dedicated to Abidjan"
          : "ABIDJAN ECO est votre portail d'information économique dédié au ABIDJAN",
      url: `${siteDomain}/${locale}`,
      siteName: "ABIDJAN ECO",
      type: "website",
      images: [
        {
          url: `${siteDomain}/${locale}/images/og-image.png`, // 🔧 Met une vraie image (1200x630px)
          width: 1200,
          height: 630,
          alt: "Aperçu ABIDJAN Eco",
        },
      ],
    },

    // Twitter card (aperçu sur Twitter/X)
    twitter: {
      card: "summary_large_image",
      title: locale === "en" ? "Abidjan ECO | HOME" : "ABIDJAN ECO | ACCUEIL",
      description:
        locale === "en"
          ? "Abidjan ECO is your economic news portal dedicated to Abidjan"
          : "ABIDJAN ECO est votre portail d'information économique dédié au ABIDJAN",
      images: [`${siteDomain}/${locale}/images/og-image.png`],
    },
  };
}



export default async function Home({ params }: Props) {
  //const { locale } = params;
  const { locale } = await params;

  //console.log("LANGUE ACTUELLE = ", locale);

  //const apiUrl = `https://siteco.cynomedia-africa.com/wp-json/custom/v1/homepage/data/${locale}`;
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/custom/v1/homepage/data/${locale}`;


  // Un seul appel nécessaire
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  //const t = getTranslation(locale); // locale = "fr" ou "en"
  //const advertising = t.advertising || '';  
  const data = await res.json();

  // Extraction des sous-données
  const latestFlashInfos = data.latest_flash_infos || [];
  const section38Data = data.section38.data || {};
  const latestIdeasOpinions = data.latest_ideas_opinions || [];
  const latestCommuniques = data.latest_communiques || [];
  const brandData = data.brand_articles || [];
  const section56Data = data.section56 || {};
  const latestVideos = data.featured_videos || {};
  const most_viewed_posts = data.most_viewed_posts || {};
  const latestPubliciteReportage = data.latest_publicite_reportage_articles || {};

  //console.log("most_viewed_posts = ", most_viewed_posts);
  //console.log("section38Data = ", section38Data);
  return (
    <>
      <div
        id="post-6"
        className="page-content post-6 page type-page status-publish"
      >
        <div
          data-elementor-type="wp-page"
          data-elementor-id={6}
          className="elementor elementor-6"
        >
          {/* section 1 */}
          {/*<center className="mt-[15px] mb-[15px] md:mt-[40px] md:mb-[40px] font-interMedium">
            FLASH
          </center>*/
         } 
         <br/>
          {/* test */}
          {/*
          <center className="mt-[15px] mb-[15px] md:mt-[40px] md:mb-[40px]">
            <h1 className="font-interBlack text-4xl">Titre en Inter Black</h1>
            <h1 className="font-interExtraBold text-4xl">Titre en Inter Black</h1>
            <p className="font-interMedium text-base">Paragraphe Medium</p>
            <span className="font-interRegular text-sm">Texte Regular</span>
          </center>
          */}
          {/* test */}

          {/* Slider Container section 3*/}
          {/* on va recuperer la data globale et affecter a chaque component la data dont il a besoin */}
          <FlashInfoComponent data={latestFlashInfos} />

          {/* section 2 */}
          <div className="mt-[-12px] mb-[15px] md:mt-[-15px] md:mb-[20px] font-interMedium">

          </div>
          <EspacePub1 />

          {/* section 3 */}
          {/*<ThirdSectionComponent locale={locale} />*/}
          {/* section 4 le bloc des 8 emplacements*/}
          <ThirdSectionComponent locale={locale} data={section38Data} />
          
          {/*
          <div style={{ marginTop: -40, marginBottom: 40 }}>
            <center>{advertising}</center>
          </div>
          */}
          <EspacePub2 />

          {/* section 5 idees et opinions les 6 emplacements...*/}
          {/*<FifthSectionComponent locale={locale} data={ideasOpinionsData}/>*/}
          <FifthSectionComponent
            locale={locale}
            ideasOpinions={latestIdeasOpinions}
            section56={section56Data}
          />

          {/* section 6 <SixfthSectionComponent communiques={latestCommuniques} />*/}
          {/* <SixfthSectionComponent /> */}
          <SixfthSectionComponent
            locale={locale}
            communiques={latestCommuniques}
          />

          {/* section 8: Branding */}
          <BrandSectionComponent 
            locale={locale}
            articles={brandData}/>

          {/* section 7 les plus lus*/}
          <SeventhSectionComponent locale={locale} most_viewed_content={most_viewed_posts}/>

          {/* section 8: videos a la une */}
          <EighthSectionComponent 
            locale={locale}
            videos={latestVideos}/>

          {/* section 8: publicite reportage */}
          <PubReportageSectionComponent
            locale={locale}
            dataPost={latestPubliciteReportage}/>


          {/* section 12 : */}
          <NinthSectionComponent/>
        </div>
      </div>
    </>
  );
}
