"use client";

import {
  Country,
  countryFor,
  flagUrl,
  searchCountries,
} from "@/utils/countryMeta";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const Flag = ({ country }: { country: Country }) =>
  country.iso2 ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagUrl(country.iso2)}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      className="h-[15px] w-5 shrink-0 rounded-[2px] object-cover"
    />
  ) : (
    <span className="h-[15px] w-5 shrink-0 rounded-[2px] bg-white/10" />
  );

interface Props {
  code: string;
  iso3?: string;
  onChange: (country: Country) => void;
}

/** Dialling-code picker: flag + code button, searchable country list. */
const CountryCodePicker = ({ code, iso3, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = countryFor(code, iso3);
  const results = searchCountries(query);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  // Open on the current country; reset the search each time.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    const i = searchCountries("").findIndex((c) => c.iso3 === selected?.iso3);
    setActive(Math.max(i, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const pick = (country: Country) => {
    onChange(country);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) pick(results[active]);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={`Country code ${selected?.name ?? ""} ${code}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-full items-center gap-2 rounded-l-lg border-r border-white/10 py-3.5 pr-2.5 pl-3 text-white transition-colors hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none"
      >
        {selected && <Flag country={selected} />}
        <span className="text-sm tabular-nums">{code}</span>
        <FiChevronDown
          className={`text-[#9EA3AB] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          onKeyDown={onKeyDown}
          className="absolute top-full left-0 z-30 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-white/10 bg-[#1A1A1A] shadow-2xl shadow-black/50"
        >
          <div className="relative border-b border-white/10 p-2">
            <FiSearch className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#9EA3AB]" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Search country or code"
              aria-label="Search country"
              className="w-full rounded-lg bg-white/5 py-2 pr-3 pl-9 text-sm text-white outline-none placeholder:text-[#9EA3AB] focus:ring-2 focus:ring-color-4/40"
            />
          </div>
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-64 overflow-y-auto overscroll-contain py-1"
          >
            {results.map((c, i) => {
              const isSelected = c.iso3 === selected?.iso3;
              return (
                <li
                  key={c.iso3}
                  data-index={i}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => pick(c)}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm ${
                    i === active ? "bg-white/10" : ""
                  } ${isSelected ? "text-white" : "text-white/80"}`}
                >
                  <Flag country={c} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="shrink-0 text-xs text-[#9EA3AB] tabular-nums">
                    {c.code}
                  </span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-color-4" />
                  )}
                </li>
              );
            })}
            {!results.length && (
              <li className="px-3 py-6 text-center text-sm text-[#9EA3AB]">
                No country matches “{query}”
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryCodePicker;
