import React from "react";
import SixLastPostListComponent from "./SixLastPostListComponent"; // adapte le chemin si besoin
//import EspacePub300x600 from "./EspacePub300x600";
//import EspacePub300x1000 from "./EspacePub300x1000";
import EspacePub300x600 from "./EspacePub300x1000";


interface SidebarLatestPostsProps {
  locale: string;
  latest: string;
  articles: string;
}

const SidebarLatestPosts: React.FC<SidebarLatestPostsProps> = ({ locale, latest, articles }) => {
  return (
    <aside className="lg:col-span-4 mt-8">
      <div className="sticky">
        <div className="block-head block-head-ac block-head-c is-left">
          <h4 className="heading">
            {latest} <span className="text-[#db2e44]">{articles}</span>
          </h4>
        </div>

        <SixLastPostListComponent locale={locale} />

        <br />
        <br />{/*-170 */}
        <EspacePub300x600 />
        {/*
        <div className="ml-0 md:ml-[0px]">          
        </div>
        */}
        <br />
        <br />
      </div>
    </aside>
  );
};

export default SidebarLatestPosts;
