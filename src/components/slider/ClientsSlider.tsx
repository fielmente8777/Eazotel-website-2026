"use client";

import { OurValuedClientsPropsType } from "@/@types/@types";
import SwiperCarousel from "./SwiperCarousel";
import Image from "next/image";
import { Autoplay, FreeMode } from "swiper/modules";

interface Props {
  cards: OurValuedClientsPropsType["cards"];
  wrapperClassName?: string;
  lgSlidePerView?: number;
}

const ClientsSlider: React.FC<Props> = ({
  cards,
  wrapperClassName,
  lgSlidePerView = 5,
}) => {
  return (
    <div className={`w-full block overflow-hidden demo ${wrapperClassName ? wrapperClassName : ""}`}>
      <SwiperCarousel
        data={cards}
        slidesPerView={3}
        spaceBetween={20}
        speed={5000}
        loop={true}
        modules={[Autoplay, FreeMode]}
        freeMode={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 4.5,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: lgSlidePerView,
          },
        }}
        renderSlide={(item, index) => (
          <div
            key={index}
            className="relative w-full lg:aspect-3/1.5 aspect-4/4 h-5rem rounded-xl flex justify-center items-center hover:shadow-lg shadow-slate-300 transition"
            style={{ background: item.className }}
          >
            <Image
              src={item.src}
              fill
              priority={true}
              className="object-contain w-full h-full p-2 rounded-md px-6 border border-[#E3E5E8]"
              alt={item.alt}
              sizes="100vw"
              style={{ background: item.className }}
            />
          </div>
        )}
      />
    </div>
  );
};

export default ClientsSlider;
