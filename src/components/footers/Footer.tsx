"use client";
import { usePathname } from "next/navigation";
import WebSiteFooter from "./WebSiteFooter";
import LandingFooter from "./LandingFooter";
import GooglePartnerBadge from "./GooglePartnerBadge";
const Footer = () => {
  const pathName = usePathname();
  const RenderFooter = WebSiteFooter;
  switch (pathName) {
    case "/thank-you/":
      return null;
    case "/landing-page/":
      return <><LandingFooter /><GooglePartnerBadge /></>;
    default:
      return <><RenderFooter /><GooglePartnerBadge /></>;
  }
};

export default Footer;
