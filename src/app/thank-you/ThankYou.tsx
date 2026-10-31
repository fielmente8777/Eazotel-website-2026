"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { contacts } from "../../../contact";

export default function ThankYou() {
  const [name, setName] = useState("");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("name");
    if (value) setName(value.slice(0, 60));
  }, []);

  return (
    <section className="min-h-[80vh] bg-[#05070d] text-white flex items-center">
      <div className="container mx-auto px-5 py-24 md:py-32 max-w-3xl space-y-8">
        <Link href="/" className="relative block w-36 aspect-[4/.75]" aria-label="Eazotel home">
          <Image src="/logo.png" alt="Eazotel" fill sizes="144px" className="object-contain object-left" />
        </Link>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Thank you{name ? `, ${name}` : ""}.
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            We&apos;ve got your request. Our team will call or WhatsApp you shortly to set up your free consultation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="rounded-lg bg-white text-[#0D54EB] font-semibold px-6 py-3">
            Back to website
          </Link>
          <a
            href={contacts.WhatsAppCta}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-white/20 bg-white/10 font-semibold px-6 py-3"
          >
            Chat on WhatsApp now
          </a>
        </div>
        <p className="text-white/60 text-sm">
          Prefer to call? {contacts.phone_1}
        </p>
      </div>
    </section>
  );
}
