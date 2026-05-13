"use client";

import Image from "next/image";
import { contacts } from "../../../contact";
import { CtaBtn } from "../buttons/CtaBtn";
import { navLinks } from "./navLinks";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/contextApi/AppContext";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

const Header = () => {
  const { setIsMobileNavOpen } = useAppContext();

  // const pathName = usePathname();

  // const paths = [
  //   "/about-fielmente-best-hospitality-marketing-agency/",
  //   "/services/",
  //   "/contact-us/",
  // ];

  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50); // threshold
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // onClick scroll to section

  const [showNavbar, setShowNavbar] = useState(true);

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const lastScrollY = useRef(0);

  // ✅ Detect screen size (below lg)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const handleResize = () => {
      setIsMobileOrTablet(mediaQuery.matches);
    };

    handleResize(); // initial check
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // ✅ Scroll logic ONLY for mobile/tablet
  useEffect(() => {
    if (!isMobileOrTablet) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileOrTablet]);

  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const cleanId = sectionId.replace("#", "");

    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scrollTarget", cleanId);
      router.push("/");
    } else {
      const el = document.querySelector(`#${cleanId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <div className="flex justify-center">
      <header
        className={`max_screen_width bg-[#020208] md:pt-4 pb-1 fixed z-50`}
      >
        {/* <header
        className={`max_screen_width bg-[#020208] md:pt-4 pb-1 ${
          isMobileOrTablet
            ? `fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
                showNavbar ? "translate-y-0" : "-translate-y-full"
              }`
            : "relative"
        }`}
      > */}
        <div>
          <nav className="max_width py-3 px-4! md:rounded-lg flex items-center bg-transparent! justify-between glassy-card">
            {/* logo */}
            <Link href="/" className="relative block w-36 aspect-[4/.75]">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </Link>

            {/* links */}
            <ul className="md:flex hidden items-center gap-3.5 text-white">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="p-2.5 cursor-pointer hover:text-color-4 transition-all duration-300 ease-in-out"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            {/* cta buttons */}
            <div className="flex gap-2">

              <CtaBtn
                label="Start For FREE"
                type="link"
                icon="arrow2"
                href={contacts.onboardingUrl}
                target="_blank"
                iconClass="bg-transparent! text-white"
                className="w-fit! bg-orange-500 max-md:py-2 max-md:px-4 max-md:hidden text-white border-none rounded-lg"
              />
              <CtaBtn
                label="Book a Demo"
                type="link"
                icon="arrow2"
                href={contacts.WhatsAppCta}
                iconClass="bg-transparent! text-white"
                className="w-fit! bg-color-4 max-md:py-2 max-md:px-4 max-md:hidden text-white border-none rounded-lg"
              />
            </div>


            {/* menu */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden text-white max-md:py-2"
            >
              <span className="sr-only">Toggle navigation</span>
              <MenuIcon />
            </button>
          </nav>
        </div>
      </header>
      <div />
      <MobileNav />

      <div className="pt-[55px] md:pt-[100px] lg:pt-[90px]" />
    </div>
  );
};

export default Header;

export const MenuIcon = () => (
  <svg
    width="40"
    height="18"
    viewBox="0 0 16 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.6875 10.3299C0.492708 10.3299 0.329465 10.264 0.197771 10.1321C0.0659237 10.0005 0 9.83713 0 9.64219C0 9.4474 0.0659237 9.28415 0.197771 9.15246C0.329465 9.02092 0.492708 8.95515 0.6875 8.95515H14.8958C15.0906 8.95515 15.2539 9.02099 15.3856 9.15269C15.5174 9.28454 15.5833 9.44793 15.5833 9.64287C15.5833 9.83767 15.5174 10.0009 15.3856 10.1326C15.2539 10.2641 15.0906 10.3299 14.8958 10.3299H0.6875ZM0.6875 5.85246C0.492708 5.85246 0.329465 5.78653 0.197771 5.65469C0.0659237 5.52284 0 5.35952 0 5.16473C0 4.96978 0.0659237 4.80654 0.197771 4.675C0.329465 4.54331 0.492708 4.47746 0.6875 4.47746H14.8958C15.0906 4.47746 15.2539 4.54338 15.3856 4.67523C15.5174 4.80708 15.5833 4.9704 15.5833 5.16519C15.5833 5.36013 15.5174 5.52338 15.3856 5.65492C15.2539 5.78661 15.0906 5.85246 14.8958 5.85246H0.6875ZM0.6875 1.37477C0.492708 1.37477 0.329465 1.30892 0.197771 1.17723C0.0659237 1.04538 0 0.881986 0 0.687041C0 0.49225 0.0659237 0.329007 0.197771 0.197312C0.329465 0.0657705 0.492708 0 0.6875 0H14.8958C15.0906 0 15.2539 0.0659237 15.3856 0.197771C15.5174 0.329465 15.5833 0.492785 15.5833 0.687729C15.5833 0.882521 15.5174 1.04576 15.3856 1.17746C15.2539 1.309 15.0906 1.37477 14.8958 1.37477H0.6875Z"
      fill="currentColor"
    />
  </svg>
);

export const ICon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.4535 6.50313L5.67624 14.2725C5.56083 14.3878 5.41583 14.4441 5.24124 14.4415C5.06652 14.4388 4.92145 14.3798 4.80603 14.2644C4.69076 14.149 4.63312 14.0053 4.63312 13.8333C4.63312 13.6614 4.69076 13.5177 4.80603 13.4023L12.5754 5.625H5.7452C5.56812 5.625 5.41965 5.56507 5.29978 5.44521C5.18006 5.32535 5.1202 5.17687 5.1202 4.99979C5.1202 4.82257 5.18006 4.67417 5.29978 4.55458C5.41965 4.43486 5.56812 4.375 5.7452 4.375H13.9502C14.1637 4.375 14.3426 4.44715 14.4869 4.59146C14.6313 4.7359 14.7035 4.91479 14.7035 5.12813V13.3333C14.7035 13.5104 14.6436 13.6588 14.5237 13.7785C14.4039 13.8984 14.2554 13.9583 14.0783 13.9583C13.9011 13.9583 13.7526 13.8984 13.6329 13.7785C13.5133 13.6588 13.4535 13.5104 13.4535 13.3333V6.50313Z"
      fill="currentColor"
    />
  </svg>
);
