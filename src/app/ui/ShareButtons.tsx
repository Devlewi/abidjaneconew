
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

type ShareButtonsProps = {
  post: {
    title: string;
    link: string;
    slug: string; // nécessaire car utilisé dans le composant
  };
  locale: string;
  singulararticle: string;
};


const ShareButtons: React.FC<ShareButtonsProps> = ({ locale, singulararticle, post }) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const encodedTitle = encodeURIComponent(post.title);
  const encodedURL = encodeURIComponent(
    `${baseUrl}/${locale}/${singulararticle}/${post.slug}`
  );
//https://siteco.cynomedia-africa.com/wp-json/custom/v1/featuredvideo/
  return (
    <div className="flex items-center gap-3 mb-6">
      <Link
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#3b5998] hover:bg-[#2d4373] text-white px-3 py-1.5 rounded-md text-sm"
      >
        <FaFacebookF /> Facebook
      </Link>
      <Link
        href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#1da1f2] hover:bg-[#0d95e8] text-white px-3 py-1.5 rounded-md text-sm"
      >
        <FaTwitter /> Twitter
      </Link>
      <Link
        href={`https://wa.me/?text=${encodedTitle}%20${encodedURL}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebc59] text-white px-3 py-1.5 rounded-md text-sm"
      >
        <FaWhatsapp /> WhatsApp
      </Link>
    </div>
  );
};


export default ShareButtons;
