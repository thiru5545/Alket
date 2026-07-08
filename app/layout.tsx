import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Alket | Intelligent Solutions, Engineered Around You",
  description: "Experience bespoke AI solutions from Alket. Purpose-built workflows, brand-trained generative AI suites, and predictive data intelligence models tailored specifically to your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="font-sans antialiased bg-[#0A0A0A]">{children}</body>
    </html>
  );
}
