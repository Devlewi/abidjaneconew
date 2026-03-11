import CommuniquesClient from "@/app/ui/CommuniquesClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "CAMEROON ECO | Press releases",
  description: "Find all the latest news in real time in our Press releases section.",
};

export default async function CommuniquesPage({ params }: Props) {
  const { locale } = await params;

  return <CommuniquesClient locale={locale} />;
}
