
import SearchContent from "@/app/ui/SearchContent";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "CAMEROON ECO | SEARCH ENGINE",
  description: "Search and browse all the latest items available.",
};

export default function Page() {
  return <SearchContent />;
}
