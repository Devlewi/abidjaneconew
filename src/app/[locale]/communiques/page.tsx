import CommuniquesClient from "@/app/ui/CommuniquesClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "CAMEROUN ECO | Communiqués",
  description: "Retrouvez toutes les actualités en temps réel dans notre section Communiqués.",
};

export default async function CommuniquesPage({ params }: Props) {
  const { locale } = await params;

  return <CommuniquesClient locale={locale} />;
}
