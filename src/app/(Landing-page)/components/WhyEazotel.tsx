import { WhyEazotelProps } from "@/@types/@landingPageType";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";
import WhyEazotelCard from "./cards/WhyEazotelCard";

const WhyEazotel: React.FC<WhyEazotelProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  images,
  cards,
}) => {
  return (
    <SectionWithContainer containerClassName="space-y-4">
      <SectionHeading
        title={title}
        subTitle={subTitle}
        setIcon={titleIcon}
        textCenter
        subTitleClassName="span-color-3"
        wrapperClassName=""
        titleWrapperClassName="px-5 py-2 border border-main-border rounded-full"
      />
      <p className="md:text-lg text-center mx-auto md:max-w-[45%]">{description[0]}</p>
      <div className="bg-[#F5F6F8] lg:pl-[57px] lg:py-[82px] p-2.5 md:p-5 rounded-3xl shadow-inner mt-16">
        <div className="lg:grid grid-cols-[1fr_.95fr] items-center gap-14">
          <div className="bg-[#ADC7FF] p-2.5 rounded-[15.57px] lg:hidden mb-6">
            <div className="w-full relative aspect-[4/2.26] overflow-hidden rounded-[13.84px]">
              <Image
                src={images[1]}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:gap-5 gap-2">
            {cards.map((card, index) => (
              <WhyEazotelCard key={index} {...card} />
            ))}
          </div>
          <div className="bg-[#ADC7FF] pl-2.5 py-2.5 rounded-l-[15.57px] lg:block hidden">
            <div className="w-full relative aspect-[4/3.2] overflow-hidden rounded-l-[13.84px]">
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default WhyEazotel;
