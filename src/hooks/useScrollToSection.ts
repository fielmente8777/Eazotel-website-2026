"use client";

import { useEffect } from "react";

export const useScrollToSection = () => {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");

    if (!target) return;

    let attempts = 0;

    const tryScroll = () => {
      const el = document.querySelector(`#${target}`);

      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        sessionStorage.removeItem("scrollTarget");
      } else if (attempts < 10) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  }, []);
};