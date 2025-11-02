import type { Metadata } from "next";
import "./globals.css";
// import { Josefin_Sans } from "next/font/google";
import Providers from "@/lib/providers";
import { Play } from "next/font/google";
// import { Montserrat } from "next/font/google";

const play = Play({
  // subsets: ["latin"],
  // weight: ["100", "300", "400", "700"],
  // variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"], // Play only has 400 & 700
  variable: "--font-play",
});

// const montserrat = Montserrat({
// subsets: ["latin"],
// weight: ["100", "300", "400", "700"],
// variable: "--font-montserrat",

// });

// const josefinSans = Josefin_Sans({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "700"],
//   variable: "--font-josefin-sans",
// });

export const metadata: Metadata = {
  title: "IX",
  description: "Shop Anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${play.variable}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
