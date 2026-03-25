"use client";
import { ModulesProps } from "@/@types/@landingPageType";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import Image from "next/image";
import { useState } from "react";
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

const ModulesSlider: React.FC<{ cards: ModulesProps["cards"] }> = ({
  cards,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="grid xl:grid-cols-2 md:mt-16 mt-4">
      <div className="w-full block overflow-hidden">
        <div className="xl:aspect-4/1.5 mt-4 block overflow-hidden">
          <SwiperCarousel
            data={cards}
            onSwiper={setThumbsSwiper}
            loop={true}
            slidesPerView={1.5}
            spaceBetween={5}
            watchSlidesProgress
            slideToClickedSlide
            breakpoints={{
              768: {
                direction: "horizontal",
                slidesPerView: 2.5,
              },
              1024: {
                direction: "horizontal",
                slidesPerView: 3.2,
              },
              1280: {
                direction: "vertical",
                slidesPerView: cards.length,
              },
            }}
            modules={[Thumbs]}
            direction="horizontal"
            className="h-full"
            renderSlide={(sector, index) => (
              <button
                className={`max-xl:w-full text-white text-nowrap  md:text-xl max-xl:justify-center font-semibold flex items-center gap-2 px-5 py-2.5 rounded-[10px] hover:bg-[#2F38647D] duration-300 ease-in-out transition-all  ${index === activeIndex ? "text-color4 bg-[#2F38647D]" : ""}`}
              >
                {sector.title}
              </button>
            )}
          />
        </div>
      </div>
      <div className="w-full block overflow-hidden">
        <SwiperCarousel
          data={cards}
          slidesPerView={1}
          loop
          modules={[Navigation, Thumbs, Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
        //   autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={16}
          speed={1000}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper?.realIndex)}
          navigation={{
            nextEl: ".sector-next",
            prevEl: ".sector-prev",
          }}
          renderSlide={(sector) => (
            <div className="md:space-y-4 text-white py-6 px-4">
              <h3 className="md:text-3xl text-lg font-semibold">{sector.title}</h3>
              <p className="max-md:text-sm">{sector.description}</p>
              <div className="flex flex-wrap my-6 gap-4">
                {sector.points.map((item, index) => (
                  <p key={index} className="py-2.25 px-4 md:text-sm text-[10px] text-nowrap rounded-full w-fit transparent-shadow">
                    {item}
                  </p>
                ))}
              </div>
              <div className="md:rounded-[21px] rounded-[11px] md:px-8 px-4 md:py-6 py-3.5 bg-[#1F212F] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <div className="w-full relative aspect-[4/1.75] md:rounded-xl rounded-md  overflow-hidden">
                  <Image
                    src={sector.image}
                    alt={sector.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ModulesSlider;
