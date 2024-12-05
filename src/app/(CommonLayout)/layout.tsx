import Footer from "@/components/shared/footer/footer";
import { SiteHeader } from "@/components/shared/navbar/siteHeader";
import Providers from "@/lib/providers";
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
