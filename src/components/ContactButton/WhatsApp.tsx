"use client";

import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { contacts } from "../../../contact";

function Whatsapp() {
  const pathname = usePathname();

  const ukNo = "+447438375533";
  // const indNo = contacts.phone[1];
  const indNo =
    contacts.phone.length > 1 ? contacts.phone[1] : contacts.phone[0];

  // Pages where button should be on right side
  const rightSidePaths = [
    // "/UK/",
    // "/USA/",
    // "/dubai-restaurant/",
    // "/landing-page/",
    "/test/",
  ];

  // Hide button on thank you page
  if (pathname === "/thank-you/") {
    return null;
  }

  // Check if current path starts with any right-side path
  const isRightSide = rightSidePaths.some((path) => pathname.startsWith(path));

  // Decide number based on path
  const selectedNumber = pathname.startsWith("/UK/") ? ukNo : indNo;

  const formattedNumber = selectedNumber.replace(/\s+/g, "");

  const whatsappUrl = `https://wa.me/${formattedNumber}?text=Hello%20I%20would%20like%20to%20know%20more%20about%20Fielmente%20Hospitality%20Marketing%20Agency`;

  return (
    <div
      className={`fixed z-20 cursor-pointer ${
        isRightSide
          ? "lg:right-10 right-4 bottom-10"
          : "lg:left-10 left-4 bottom-10"
      }`}
    >
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full flex shadow-2xl items-center justify-center bg-green-500 hover:bg-green-600 transition-all hover:shadow-2xl"
      >
        <FaWhatsapp size={29} color="white" />

        {/* 👇 Hidden text for GTM & accessibility */}
        <span className="sr-only">Chat on WhatsApp</span>
      </Link>
    </div>
  );
}

export default Whatsapp;
