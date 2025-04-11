import type { Metadata } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  preload: true,
});

const oswald = localFont({
  src: "../../public/assets/fonts/OswaldVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-oswald",
  preload: true,
});

export const metadata: Metadata = {
  title: "BLACK PINK IN YOUR AREA",
  description: "블랙핑크",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} ${oswald.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
