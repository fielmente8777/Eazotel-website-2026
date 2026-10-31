"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/contextApi/AppContext";
import useLeadPrompt from "@/hooks/useLeadPrompt";
import { isLeadThankYouPage } from "@/lib/leadPrompt";
import LeadDialog from "./LeadDialog";

const Form1 = dynamic(() => import("@/components/forms/Form1"));

const POINTS = [
  "Every WhatsApp, Meta, Google and website enquiry in one inbox",
  "AI replies to guests in seconds, 24/7",
  "14-day free trial. Works with your existing channels",
];

/**
 * The free-consultation popup. It opens after one minute of visible browsing or on
 * desktop exit intent (once per session), and whenever a "button" CtaBtn sets
 * isOpenPopupForm in AppContext.
 */
export default function PopupForm() {
  const { isOpenPopupForm, setIsOpenPopupForm } = useAppContext();
  const pathname = usePathname();
  const open = useCallback(() => setIsOpenPopupForm(true), [setIsOpenPopupForm]);
  const close = useCallback(() => setIsOpenPopupForm(false), [setIsOpenPopupForm]);
  useLeadPrompt(open);

  return (
    <LeadDialog open={isOpenPopupForm && !isLeadThankYouPage(pathname)} onClose={close}>
      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden md:flex flex-col justify-between gap-8 p-8 bg-[#093A75] text-white">
          <div className="relative w-36 aspect-[4/.75]">
            <Image src="/logo.png" alt="Eazotel" fill sizes="144px" className="object-contain object-left" />
          </div>
          <div className="space-y-5">
            <p className="text-2xl font-semibold leading-snug">See how many more bookings your hotel can take direct.</p>
            <ul className="space-y-3 text-white/85 text-sm">
              {POINTS.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#FD5C01]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Form1 stacked />
      </div>
    </LeadDialog>
  );
}
