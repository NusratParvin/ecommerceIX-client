import Footer from "@/components/shared/footer/footer";
import { SiteHeader } from "@/components/shared/navbar/siteHeader";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    // <Providers>
    <div className="text-3xl">
      <SiteHeader />
      {children}
      <Footer />
    </div>
    // </Providers>
  );
}
