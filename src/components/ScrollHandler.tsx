"use client";

import { useScrollToSection } from "@/hooks/useScrollToSection";

export default function ScrollHandler() {
  useScrollToSection();
  return null; // no UI needed
}