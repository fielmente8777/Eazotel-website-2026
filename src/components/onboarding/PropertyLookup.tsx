"use client";

import { PropertyMatch, useLookupPropertyQuery } from "@/store/api/eazotelApi";
import {
  OnboardingForm,
  PROPERTY_CATEGORIES,
} from "@/store/slices/onboardingSlice";
import { COUNTRY_LIST } from "@/utils/countryMeta";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiLoader, FiMapPin, FiStar, FiX } from "react-icons/fi";

// Gmail etc. never match a hotel website, so skip the lookup for them.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.in",
  "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com",
  "aol.com", "rediffmail.com", "proton.me", "protonmail.com", "zoho.com",
  "ymail.com", "gmx.com", "mail.com",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isBusinessEmail = (email: string) =>
  EMAIL_RE.test(email) &&
  !FREE_EMAIL_DOMAINS.has(email.split("@")[1].toLowerCase());

const useDebounced = <T,>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

// gian's accommodation types -> this form's categories.
const toCategory = (type: string): string | undefined => {
  if (type === "Boutique Hotel") return "Boutique Stay";
  if (type === "Guest House") return "Homestay";
  return (PROPERTY_CATEGORIES as readonly string[]).includes(type)
    ? type
    : undefined;
};

// "+91 124 620 1531" -> { countryCode: "+91", countryIso: "IND", phone: "1246201531" }.
// Local numbers ("098765 43210") keep the selected country code. The
// listing's country settles shared codes (+1 is both USA and Canada).
const splitPhone = (raw: string, countryName: string) => {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return {};
  if (!raw.trim().startsWith("+")) return { phone: digits.replace(/^0+/, "") };
  const candidates = COUNTRY_LIST.filter((c) =>
    digits.startsWith(c.code.replace(/\D/g, ""))
  ).sort((a, b) => b.code.length - a.code.length);
  const longest = candidates[0];
  if (!longest) return { phone: digits };
  const match =
    candidates.find(
      (c) =>
        c.code === longest.code &&
        c.name.toLowerCase() === countryName.toLowerCase()
    ) ?? longest;
  return {
    countryCode: match.code,
    countryIso: match.iso3,
    phone: digits.slice(match.code.replace(/\D/g, "").length),
  };
};

export const matchToForm = (m: PropertyMatch): Partial<OnboardingForm> => {
  const d = m.details;
  const category = toCategory(d.accommodationType);
  return {
    hotelName: d.hotelName || m.title,
    ...(d.city && { city: d.city }),
    ...(d.state && { state: d.state }),
    ...(d.country && { country: d.country }),
    ...(d.pinCode && { pinCode: d.pinCode }),
    ...(category && { category }),
    ...splitPhone(d.hotelPhone, d.country),
  };
};

interface Props {
  hotelName: string;
  email: string;
  onPick: (match: PropertyMatch) => void;
}

/**
 * Finds the property on Google Maps while the hotel types its name (or from
 * the website domain of a work email) and offers to fill the details in.
 */
const PropertyLookup = ({ hotelName, email, onPick }: Props) => {
  const [picked, setPicked] = useState<PropertyMatch | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const name = useDebounced(hotelName.trim(), 700);
  const mail = useDebounced(email.trim().toLowerCase(), 700);

  // Stop searching once a match was picked and the name still matches it.
  const stillPicked = !!picked && picked.details.hotelName === hotelName;
  const idle = stillPicked || dismissed;

  const byEmail = useLookupPropertyQuery(
    { email: mail },
    { skip: idle || !isBusinessEmail(mail) }
  );
  const byName = useLookupPropertyQuery(
    { q: name },
    { skip: idle || name.length < 3 }
  );

  if (stillPicked) {
    return (
      <p className="flex items-start gap-2 rounded-lg border border-[#9EFF8E]/25 bg-[#9EFF8E]/10 px-3 py-2.5 text-sm text-white/85">
        <FiCheckCircle className="mt-0.5 shrink-0 text-[#9EFF8E]" />
        Details filled in from Google. You can check and edit them on the
        next step.
      </p>
    );
  }
  if (dismissed) return null;

  // An email-domain hit is a confident match, so it goes first.
  const seen = new Set<string>();
  const matches = [...(byEmail.data ?? []), ...(byName.data ?? [])]
    .filter((m) => m.placeId && !seen.has(m.placeId) && seen.add(m.placeId))
    .slice(0, 4);
  const emailIds = new Set((byEmail.data ?? []).map((m) => m.placeId));
  const loading = byName.isFetching || byEmail.isFetching;

  if (!matches.length) {
    return loading ? (
      <p className="flex items-center gap-2 text-xs text-white/50">
        <FiLoader className="animate-spin" /> Looking for your property…
      </p>
    ) : null;
  }

  const pick = (m: PropertyMatch) => {
    setPicked(m);
    onPick(m);
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-color-4/30 bg-color-4/[0.07] p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-white/90">
          Is this your property?
          {loading && <FiLoader className="animate-spin text-white/50" />}
        </span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hide suggestions"
          className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <FiX />
        </button>
      </div>
      <ul className="flex flex-col gap-1.5">
        {matches.map((m) => (
          <li key={m.placeId}>
            <button
              type="button"
              onClick={() => pick(m)}
              className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-[#1E1E1E] p-2.5 text-left transition-colors hover:border-color-4/60 focus-visible:border-color-4 focus-visible:outline-none"
            >
              {m.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.thumbnail}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 shrink-0 rounded-md object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/5 text-white/40">
                  <FiMapPin />
                </span>
              )}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="truncate">{m.title}</span>
                  {emailIds.has(m.placeId) && (
                    <span className="shrink-0 rounded-full bg-color-4/25 px-2 py-0.5 text-[10px] font-medium text-white/90">
                      Matches your email
                    </span>
                  )}
                </span>
                <span className="truncate text-xs text-white/55">
                  {m.fullAddress}
                </span>
              </span>
              {m.rating != null && (
                <span className="flex shrink-0 items-center gap-1 text-xs text-white/70">
                  <FiStar className="text-[#F5C451]" /> {m.rating}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-white/45">
        Pick yours to fill in the phone, type and location automatically.
      </p>
    </div>
  );
};

export default PropertyLookup;
