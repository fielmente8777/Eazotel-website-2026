"use client";
import { usePathname } from "next/navigation";
import WebSiteFooter from "./WebSiteFooter";
import LandingFooter from "./LandingFooter";
const Footer = () => {
  const pathName = usePathname();
  const RenderFooter = WebSiteFooter;
  switch (pathName) {
    case "/thank-you/":
      return null;
    case "/landing-page/":
      return <LandingFooter />;
    default:
      return <RenderFooter />;
  }
};

export default Footer;
