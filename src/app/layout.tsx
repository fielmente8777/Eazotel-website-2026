import { NavBar } from "@/components/navbars";
import { AppProvider } from "@/contextApi/AppContext";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sofia_Sans } from "next/font/google";
import "./globals.css";
import "./styles.scss";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Eazotel",
  description: "Eazotel: Best Hotel Booking & Hospitality Management Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${sofiaSans.variable} antialiased`}
      suppressHydrationWarning={true}
    >
      <body>
        <AppProvider>
          <NavBar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
