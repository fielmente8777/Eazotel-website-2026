import type { Metadata } from "next";
import ThankYou from "./ThankYou";

// Shown after a consultation form is sent: keep it out of search results.
export const metadata: Metadata = {
  title: "Thank You | Eazotel",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://eazotel.com/thank-you/" },
};

export default function Page() {
  return <ThankYou />;
}
