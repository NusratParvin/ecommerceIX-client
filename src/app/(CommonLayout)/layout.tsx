import CompareBar from "@/components/shared/compare/compareBar";
import Footer from "@/components/shared/footer/footer";
import { SiteHeader } from "@/components/shared/navbar/siteHeader";
import ScrollToTop from "@/components/shared/scrollButton";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    // <Providers>
    <div className="text-3xl">
      <SiteHeader />
      <CompareBar />

      {children}
      <ScrollToTop />

      <Footer />
    </div>
    // </Providers>
  );
}
