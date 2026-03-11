import FlashInfoClient from "@/app/ui/FlashInfoClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "CAMEROUN ECO | Flash Info",
  description: "Retrouvez toutes les actualités en temps réel dans notre section Flash Info.",
};

export default async function FlashInfoPage({ params }: Props) {
  const { locale } = await params;

  return <FlashInfoClient locale={locale} />;
}
