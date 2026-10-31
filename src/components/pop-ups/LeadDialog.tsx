"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { LEAD_SUBMITTED_EVENT, markLeadPromptShown } from "@/lib/leadPrompt";

/** Native <dialog> so the form sits above SalesIQ and every floating control. */
export default function LeadDialog({ open, onClose, children, maxWidth = 820 }: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    markLeadPromptShown();
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    window.addEventListener(LEAD_SUBMITTED_EVENT, onClose);
    return () => {
      window.removeEventListener(LEAD_SUBMITTED_EVENT, onClose);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      <style>{`dialog[data-eazotel-lead-popup]::backdrop { background: rgba(5, 7, 13, .7); }`}</style>
      <dialog
        ref={dialogRef}
        data-eazotel-lead-popup="v1"
        aria-label="Free consultation"
        onCancel={onClose}
        onClose={onClose}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
        }}
        style={{ position: "fixed", inset: 0, margin: "auto", width: "calc(100% - 24px)", maxWidth, maxHeight: "calc(100dvh - 24px)", padding: 0, border: 0, borderRadius: 16, background: "#010101", color: "#fff", boxShadow: "0 24px 80px rgba(0,0,0,.45)", overflowY: "auto", overscrollBehavior: "contain" }}
      >
        {open && (
          <div style={{ position: "relative" }}>
            <button type="button" aria-label="Close consultation form" onClick={onClose}
              style={{ position: "absolute", top: 8, right: 8, zIndex: 2, width: 44, height: 44, display: "grid", placeItems: "center", border: 0, borderRadius: "50%", background: "rgba(255,255,255,.12)", color: "#fff", cursor: "pointer", fontSize: 28, lineHeight: 1 }}>
              <span aria-hidden="true">×</span>
            </button>
            {children}
          </div>
        )}
      </dialog>
    </>
  );
}
