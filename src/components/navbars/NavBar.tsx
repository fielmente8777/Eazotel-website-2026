"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import LandingNav from "./LandingNav";


const NavBar = () => {
  const pathName = usePathname();
  const RenderNavBar = Header;

  switch (pathName) {
    case "/thank-you/":
      return null;
    case "/landing-page/":
      return <LandingNav />;
    default:
      return (
        <>
          <RenderNavBar />
        </>
      );
  }
};

export default NavBar;
