"use client";
import { FeaturesProps } from "@/@types/@landingPageType";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { Autoplay, Pagination } from "swiper/modules";
import FeatureCard from "../cards/FeatureCard";

const FeaturesSlider: React.FC<{ cards: FeaturesProps["cards"] }> = ({
  cards,
}) => {
  return (
    <div className="md:hidden w-full block overflow-hidden">
      <SwiperCarousel
        data={cards}
        slidesPerView={1}
        spaceBetween={16}
        modules={[Autoplay,Pagination]}
        pagination={{ clickable: true,el: ".feature-pagination" }}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={900}
        renderSlide={(card) => <FeatureCard {...card} />}
      />
      <div className="feature-pagination mt-4 flex justify-center items-center"></div>
    </div>
  );
};

export default FeaturesSlider;
