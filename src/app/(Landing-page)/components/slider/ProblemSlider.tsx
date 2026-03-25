"use client";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import ProblemCard from "../cards/ProblemCard";
import { Autoplay } from "swiper/modules";
import { ProblemSectionProps } from "@/@types/@landingPageType";

const ProblemSlider: React.FC<{ cards: ProblemSectionProps["cards"] }> = ({
  cards,
}) => {
  return (
    <div className="md:hidden w-full pl-4 mt-6">
      <SwiperCarousel
        data={cards}
        slidesPerView={1.18}
        spaceBetween={16}
        modules={[Autoplay]}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={900}
        renderSlide={(card) => <ProblemCard {...card} />}
      />
    </div>
  );
};

export default ProblemSlider;
