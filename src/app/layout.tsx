import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import SmoothScroll from "@/providers/smooth-scroll";

import "./globals.css";

const bagoss = localFont({
  src: "./fonts/BagossTRIALVF.ttf",
  variable: "--font-bagoss",
  weight: "100 900",
  display: "swap",
});

const sohne = localFont({
  src: "./fonts/Sohne-Buch.otf",
  variable: "--font-sohne",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juicebox | Get a reality check",
  description:
    "Compare your thoughts on technology with current industry opinions.",
};

export const viewport: Viewport = {
  themeColor: "#0c0d10",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bagoss.variable} ${sohne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script>{`document.documentElement.classList.add("js")`}</script>
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
