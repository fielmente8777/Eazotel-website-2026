"use client";
import { TestimonialsDataTypes } from "@/@types/@homeType";
import SwiperCarousel from "./SwiperCarousel";
import { Autoplay, Navigation } from "swiper/modules";

interface Props {
  cards: TestimonialsDataTypes["cards"];
}
const TestimonialsSlider: React.FC<Props> = ({ cards }) => {
  return (
    <div className={`w-full`}>
      <SwiperCarousel
        data={cards}
        slidesPerView={1}
        spaceBetween={20}
        speed={3000}
        loop={true}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        renderSlide={(item) => <div></div>}
      />
    </div>
  );
};

export default TestimonialsSlider;
