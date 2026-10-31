"use client";

import { usePathname } from "next/navigation";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { contacts } from "../../../contact";

const WHATSAPP_TEXT =
  "Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Eazotel%20AI%20Hospitality%20Marketing%20Solutions";

/** Call and WhatsApp stacked at the bottom left; Zoho SalesIQ sits at the bottom right. */
export default function Whatsapp() {
  const pathname = usePathname();
  if (pathname === "/thank-you/") return null;

  const number = contacts.phone[0].replace(/\s+/g, "");

  return (
    <div
      role="group"
      aria-label="Contact Eazotel"
      className="fixed left-4 lg:left-10 z-20 flex flex-col items-start gap-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <a
        id="call-button"
        href={`tel:${number}`}
        aria-label="Call Eazotel"
        title="Call Eazotel"
        className="call-button flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#093A75] text-white shadow-2xl transition-colors hover:bg-[#1B2231] focus-visible:ring-2 focus-visible:ring-[#FD5C01] focus-visible:ring-offset-2"
      >
        <FaPhoneAlt size={22} aria-hidden="true" />
      </a>
      <a
        id="whatsapp-button"
        href={`https://wa.me/${number}?text=${WHATSAPP_TEXT}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="whatsapp-button flex h-12 w-12 flex-none items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition-colors hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-[#FD5C01] focus-visible:ring-offset-2"
      >
        <FaWhatsapp size={29} aria-hidden="true" />
      </a>
    </div>
  );
}
