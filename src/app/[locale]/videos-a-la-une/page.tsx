import VideosAlaUneClient from "@/app/ui/VideosAlaUneClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "CAMEROUN ECO | Vidéos à la une",
  description: "Retrouvez toutes les actualités en temps réel dans notre Vidéos à la une.",
};

export default async function VideosalaunePage({ params }: Props) {
  const { locale } = await params;

  return <VideosAlaUneClient locale={locale} />;
}
