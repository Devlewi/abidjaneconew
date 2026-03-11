// src/app/not-found.tsx
import type { Metadata } from "next";
import NotFoundClient from "../ui/NotFoundClient";


export const metadata: Metadata = {
  title: "Contenu Non Trouvé",
  description: "Désolé, le contenu que vous cherchez n'existe pas.",
};

export default function NotFound() {
  return <NotFoundClient />;
}
