"use client";

import { useAppContext } from "@/contextApi/AppContext";
import { IoClose } from "react-icons/io5";
import { navLinks } from "./navLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileNav = () => {
  const { isMobileNavOpen, setIsMobileNavOpen } = useAppContext();
  const pathName = usePathname();

  // ✅ store active dropdown index
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileNavOpen(false);
  };

  return (
    <div
      className={`fixed top-0 h-dvh text-white bg-linear-to-t from-[#001631]/90 from-0% to-[#00060b]/90 to-40% backdrop-blur-md w-80 z-50 ${
        isMobileNavOpen ? "right-0" : "-right-full"
      } transition-all duration-300`}
    >
      <div className="px-6 py-8">
        <button
          className="float-right "
          onClick={() => setIsMobileNavOpen(false)}
        >
          <IoClose size={24} />
        </button>

        <nav className="flex flex-col gap-4 mt-10">
          {navLinks.map((link, index) => {
            const isActive = openDropdown === index;

            return (
              <ul key={index} className="text-lg">
                <li className="flex items-center justify-between">
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-nowrap font-semibold capitalize text-white text-base"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href || "#"}
                      className="text-nowrap font-semibold capitalize text-white"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* {link.subLinks && (
                    <button
                      onClick={() => handleDropdown(index)}
                      className="duration-300 transition-all ease-in-out"
                    >
                      <OutlineDrpopdown
                        className={`transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )} */}
                </li>

                {isActive && link.subLinks && (
                  <ul className="flex flex-col gap-4 mt-4">
                    {link.subLinks.map((subLink, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subLink.href || "#"}
                          className={`text-nowrap font-semibold capitalize ${
                            pathName === subLink.href
                              ? "text-secondary"
                              : "text-primary"
                          }`}
                        >
                          {subLink.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
