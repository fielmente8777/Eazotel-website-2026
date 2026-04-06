"use client";

import { WhoUseEazotelProps } from "@/@types/@landingPageType";
import { Container } from "@/components/sectionComponants";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import WhoUseEazotelCard from "../cards/WhoUseEazotelCard";
const WhoUseEazotelSlider: React.FC<{ cards: WhoUseEazotelProps["cards"] }> = ({
  cards,
}) => {
  cards = [...cards, ...cards, ...cards];
  return (
    <div className="relative w-full overflow-hidden mt-10">
      <Container>
        <SwiperCarousel
          data={cards}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0, // no tilt (clean look like your design)
            stretch: -8, // keep spacing natural
            depth: 100, // pushes side slides back
            modifier: 1, // 🔥 THIS makes center BIG
            slideShadows: false,
          }}
          breakpoints={{
            768: {
              coverflowEffect: {
                stretch: -50,
                depth: 105,
              },
              slidesPerView: 3,
            },
          }}
          renderSlide={(card, ind) => (
            <WhoUseEazotelCard
              {...card}
              imageWrapperClassName={ind === 0 ? "border-none" : ""}
            />
          )}
        />
      </Container>
      <div className="lg:absolute lg:top-1/2 lg:inset-x-0 max_screen_width w-full flex "></div>
    </div>
  );
};

export default WhoUseEazotelSlider;
