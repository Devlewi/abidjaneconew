// components/HreflangLinks.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';

const locales = ['fr', 'en'];
//const domain = 'https://siteco-frontend.vercel.app';
const domain = process.env.NEXT_PUBLIC_API_BASE_URL || "https://siteco-frontend.vercel.app";

const HreflangLinks = () => {
  const { asPath } = useRouter();

  return (
    <Head>
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${domain}/${locale}${asPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${domain}/fr${asPath}`} // ou ton defaultLocale
      />
    </Head>
  );
};

export default HreflangLinks;
