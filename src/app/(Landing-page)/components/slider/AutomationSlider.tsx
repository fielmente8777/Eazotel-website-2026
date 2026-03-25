"use client";

import { AutomationPropsType } from "@/@types/@landingPageType";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { Autoplay, Pagination } from "swiper/modules";
import AutomationCard from "../cards/AutomationCard";

const AutomationSlider: React.FC<{ cards: AutomationPropsType["items"] }> = ({
  cards,
}) => {
  return (
    <div className="md:hidden w-full block overflow-hidden">
      <SwiperCarousel
        data={cards}
        slidesPerView={1}
        spaceBetween={16}
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, el: ".automation-pagination" }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={900}
        renderSlide={(card) => <AutomationCard {...card} />}
      />
      <div className="automation-pagination mt-4 flex justify-center items-center"></div>
    </div>
  );
};

export default AutomationSlider;
