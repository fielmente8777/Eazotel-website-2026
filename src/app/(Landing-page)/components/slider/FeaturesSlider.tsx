"use client";
import { FeaturesProps } from "@/@types/@landingPageType";
import SwiperCarousel from "@/components/slider/SwiperCarousel";
import Image from "next/image";
import { Autoplay, EffectCoverflow } from "swiper/modules";

const FeaturesSlider: React.FC<{ cards: FeaturesProps["cards"] }> = ({
  cards,
}) => {
  return (
    <div className=" w-full block overflow-hidden max-sm:px-4">
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
          stretch: -10, // keep spacing natural
          depth: 100, // pushes side slides back
          modifier: 1, // 🔥 THIS makes center BIG
          slideShadows: false,
        }}
        breakpoints={{
          768: {
            coverflowEffect: {
              stretch: -50,
              depth: 120,
              modifier: 2,
            },
            slidesPerView: 1.5,
          },
        }}
        renderSlide={(card) => (
          <div className="flex flex-col gap-4 w-full">
            <div className="w-full aspect-4/2 overflow-hidden relative rounded-3xl">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-2 px-6">
              <div className="flex items-center gap-4">
                <h3 className="md:text-2xl text-lg text-primary font-semibold">
                  {card.title}
                </h3>
                <span>
                  <Foo />
                </span>
              </div>
              <p className="md:text-lg text-[13.95px] text-secondary">
                {card.description}
              </p>
            </div>
          </div>
        )}
      />
      <div className="feature-pagination mt-4 flex justify-center items-center"></div>
    </div>
  );
};

export default FeaturesSlider;

export const Foo = () => (
  <svg
    width={29}
    height={29}
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.2791 9.31788L8.13528 20.4504C7.96991 20.6155 7.76214 20.6962 7.51199 20.6925C7.26163 20.6887 7.05377 20.6041 6.88839 20.4387C6.72321 20.2733 6.64062 20.0675 6.64062 19.8211C6.64062 19.5747 6.72321 19.3688 6.88839 19.2035L18.0209 8.05964H8.23409C7.98036 8.05964 7.76762 7.97377 7.59587 7.80202C7.42432 7.63028 7.33855 7.41753 7.33855 7.1638C7.33855 6.90986 7.42432 6.69722 7.59587 6.52587C7.76762 6.35433 7.98036 6.26855 8.23409 6.26855H19.9908C20.2966 6.26855 20.553 6.37194 20.7597 6.57871C20.9667 6.78568 21.0702 7.04201 21.0702 7.34768V19.1047C21.0702 19.3584 20.9843 19.571 20.8126 19.7426C20.6408 19.9143 20.4281 20.0002 20.1744 20.0002C19.9204 20.0002 19.7077 19.9143 19.5361 19.7426C19.3648 19.571 19.2791 19.3584 19.2791 19.1047V9.31788Z"
      fill="#0D54EB"
    />
  </svg>
);
