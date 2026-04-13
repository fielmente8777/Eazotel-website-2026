import Link from "next/link";
import { Container } from "../sectionComponants";
import Image from "next/image";
import { websiteFooterData } from "./footerData";

const WebSiteFooter = () => {
  const currentYear = new Date().getFullYear();
  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="max_screen_width bg-[#0A0A0C] md:py-10 max-md:pt-10 max-md:pb-10">
      <Container className="relative after:absolute md:after:inset-0 max-md:after:top-6 max-md:after:left-4 max-md:after:w-[90%] after:bg-[url('/map.png')] after:bg-contain after:bg-no-repeat after:opacity-8 md:after:bg-center after:w-full after:h-full after:z-[-1]">
        <div className="grid lg:grid-cols-[1.2fr_2fr] md:grid-cols-[1.1fr_2fr] gap-8 md:gap-14">
          <div className="flex flex-col gap-6 max-w-xs w-full">
            <Link
              href="/"
              className="relative w-full max-w-[179px]  aspect-[4/.8]"
            >
              <Image
                src={websiteFooterData.logoSrc}
                alt="fielment logo"
                fill
                className="object-cover"
                priority
                loading="eager"
                sizes="100vw"
              />
            </Link>
            <p className="text-white text-lg">
              {websiteFooterData.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {websiteFooterData.listOfLinks.map((item, index) => (
              <div className="flex flex-col md:gap-6 gap-4" key={index}>
                <h3 className="text-white text-lg font-medium">{item.title}</h3>
                <ul className="flex flex-col md:gap-5 gap-4">
                  {item.links.map((link, index) => (
                    <li key={index}>
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={() => scrollToSection(link.href)}
                          className="text-[#FFFFFFB2] hover:text-secondary transition-all duration-300 ease-in-out cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[#FFFFFFB2] hover:text-secondary transition-all duration-300 ease-in-out cursor-pointer"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-[#484848] mt-8 mb-6"></div>
        <p className="text-white text-center ">
          © {currentYear} Eazotel. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default WebSiteFooter;
