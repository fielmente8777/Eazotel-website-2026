"use client";

import { GOOGLE_CLIENT_ID } from "@/store/api/eazotelApi";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_URL = "https://accounts.google.com/gsi/client";
// Google draws its button at a fixed pixel width, up to 400.
const MAX_BUTTON_WIDTH = 400;

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize(config: { client_id: string; callback: (response: { credential: string }) => void }): void;
          renderButton(parent: HTMLElement, options: Record<string, unknown>): void;
        };
      };
    };
  }
}

/** The email in Google's sign-in token, only to pre-fill a form; nexon verifies the token itself. */
export const emailFromGoogleToken = (credential: string): string | null => {
  try {
    const part = credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(part), (c) => c.charCodeAt(0));
    const email = (JSON.parse(new TextDecoder().decode(bytes)) as { email?: unknown }).email;
    return typeof email === "string" ? email : null;
  } catch {
    return null;
  }
};

interface GoogleAuthButtonProps {
  /** Google's wording: "Sign up with Google" or "Sign in with Google" */
  mode: "signup" | "signin";
  onCredential: (credential: string) => void;
  onLoadError: () => void;
}

/** Google's own button. It is drawn in Google's frame, so a page can't style its inside. */
const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ mode, onCredential, onLoadError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  // the latest callback, so a re-render doesn't draw the button again
  const callback = useRef(onCredential);
  useEffect(() => {
    callback.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    const googleId = window.google?.accounts.id;
    const container = containerRef.current;
    if (!ready || !googleId || !container) return;

    googleId.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: ({ credential }) => callback.current(credential),
    });

    // Draw again whenever the space changes, or it overflows after a resize or rotation.
    let drawnWidth = 0;
    const observer = new ResizeObserver(() => {
      const width = Math.min(container.clientWidth, MAX_BUTTON_WIDTH);
      if (width === drawnWidth || width === 0) return;
      drawnWidth = width;
      container.replaceChildren();
      googleId.renderButton(container, {
        theme: "filled_black",
        size: "large",
        text: mode === "signup" ? "signup_with" : "signin_with",
        shape: "rectangular",
        logo_alignment: "center",
        width,
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [ready, mode]);

  return (
    <>
      <Script src={GOOGLE_SCRIPT_URL} onReady={() => setReady(true)} onError={onLoadError} />
      <div ref={containerRef} className="flex h-10 w-full justify-center overflow-hidden" />
    </>
  );
};

/** "or" between the Google button and the email form. */
export const OrDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 text-xs text-white/50">
    <span className="h-px flex-1 bg-white/10" />
    {label}
    <span className="h-px flex-1 bg-white/10" />
  </div>
);

export default GoogleAuthButton;
