import Image from "next/image";
import { CtaBtn } from "../buttons/CtaBtn";

const LandingNav = () => {
  return (
    <header className="max_screen_width border border-main-border">
      <nav className="max_width py-3.75 flex items-center justify-between">
        <div className="md:w-35 w-25 aspect-[4/1.59] relative">
          <Image
            src="/Logo.png"
            alt="fielment logo"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <CtaBtn
          label="Get a Free Consulation"
          type="button"
          icon="arrow"
          iconClass="max-lg:w-6 text-primary"
          startIcon="whatsapp"
          startIconClass="max-lg:hidden"
          className="w-fit! rounded-full max-lg:text-xs! max-lg:px-2! max-lg:py-2 bg-[#1B1B1B] text-white"
        />
      </nav>
    </header>
  );
};

export default LandingNav;
