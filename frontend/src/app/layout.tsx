import type { Metadata } from "next";
import { Noto_Sans_Thai, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Fallback for Thai glyphs (recipient names, bank names) that Poppins doesn't cover.
const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: "LSYM | Let's Save Your Money",
  description: "AI-powered expense tracker for Thai bank slips",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${notoSansThai.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
