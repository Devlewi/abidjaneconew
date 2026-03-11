"use client";

import Link from "next/link";
import { getTranslation } from "../utils/i18n";

type NavComponentProps = {
  locale: string;
};

export default function NavComponent({ locale }: NavComponentProps) {
  const t = getTranslation(locale);
  const categoryPath = t.category || "categorie";

  const menu = t.menu;
  const slugs = t.slugs;

  return (
    <nav className="navigation navigation-main nav-hov-a ">
      <ul id="menu-main-menu" className="menu font-interExtraBold">
        <li className="menu-item">
          <Link href={`/${locale}`} aria-current="page">{menu.home}</Link>
        </li>        

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.eco}`} className="">{menu.eco}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.agro}`} className="font-interMedium">{menu.agro}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.tech}`}className="font-interMedium">{menu.tech}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.entreprises}`}className="font-interMedium">{menu.entreprises}</Link></li>
          </ul>
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.finance}`}>{menu.finance}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.banques}`} className="font-interMedium">{menu.banques}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.assurances}`} className="font-interMedium">{menu.assurances}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.marches}`} className="font-interMedium">{menu.marches}</Link></li>
          </ul>
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.infra}`}>{menu.infra}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.btp}`} className="font-interMedium">{menu.btp}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.transports}`} className="font-interMedium">{menu.transports}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.energie}`} className="font-interMedium">{menu.energie}</Link></li>
          </ul>
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.decideurs}`}>{menu.decideurs}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.succes}`} className="font-interMedium">{menu.succes}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.talents}`} className="font-interMedium">{menu.talents}</Link></li>
          </ul>
        </li>

        <li className="menu-item menu-item-has-children">
          <Link href={`/${locale}/${categoryPath}/${slugs.tribune}`}>{menu.tribune}</Link>
          <ul className="sub-menu">
            <li><Link href={`/${locale}/${categoryPath}/${slugs.interview}`} className="font-interMedium">{menu.interview}</Link></li>
            <li><Link href={`/${locale}/${categoryPath}/${slugs.opinions}`} className="font-interMedium">{menu.opinions}</Link></li>
          </ul>
        </li>

        <li className="menu-item">
          <Link href={`/${locale}/${categoryPath}/${slugs.decryptage}`}>{menu.decryptage}</Link>
        </li>

        <li className="menu-item">
          <Link href={`/${locale}/${categoryPath}/${slugs.international}`}>{menu.international}</Link>
        </li>
        <li className="menu-item">
          <Link href={`/${locale}/${categoryPath}/${slugs.pubreport}`}>{menu.pubreport}</Link>
        </li>
      </ul>
    </nav>
  );
}
