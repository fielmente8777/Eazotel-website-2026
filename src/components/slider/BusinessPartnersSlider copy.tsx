"use client";

import { BusinessPartnersDataTypes } from "@/@types/@homeType";
import Image from "next/image";
import { Autoplay, FreeMode } from "swiper/modules";
import SwiperCarousel from "./SwiperCarousel";

interface Props {
  cards: BusinessPartnersDataTypes["cards"];
  wrapperClassName?: string;
  xlSlidesPerView?: number;
}

const BusinessPartnersSlider: React.FC<Props> = ({
  cards,
  wrapperClassName,
  xlSlidesPerView = 6,
}) => {
  return (
    <div
      className={`w-full block overflow-hidden demo ${wrapperClassName ? wrapperClassName : ""}`}
    >
      <SwiperCarousel
        data={cards || []}
        slidesPerView={2.5}
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
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: xlSlidesPerView,
          },
        }}
        renderSlide={(item, index) => (
          <div
            key={index}
            className="relative w-full lg:aspect-3/1.5 aspect-4/4 h-5rem rounded-xl flex justify-center items-center hover:shadow-lg shadow-slate-300 transition"
          >
            <Image
              src={item.imgSrc}
              fill
              priority={true}
              className="object-contain w-full h-full rounded-md px-6"
              alt={item.title}
            />
          </div>
        )}
      />
    </div>
  );
};

export default BusinessPartnersSlider;
