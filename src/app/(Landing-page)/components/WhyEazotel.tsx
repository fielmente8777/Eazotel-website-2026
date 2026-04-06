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
        titleWrapperClassName="px-5 py-2 border border-main-border rounded-full overflow-hidden"
      />
      <p className="md:text-lg text-center mx-auto md:max-w-[45%]">{description[0]}</p>
      <div className="bg-[#F5F6F8]  py-2 rounded-3xl shadow-inner md:mt-16 mt-8">
        <div className="lg:grid grid-cols-[1fr_.95fr] items-center gap-14">
          <div className="pt-2 rounded-[15.57px] lg:hidden mb-4">
            {/* mobile */}
            <div className="w-full relative aspect-[4/2.26] overflow-hidden rounded-[13.84px]">
              <Image
                src={images[1]}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:gap-5 gap-2 lg:pl-8 max-lg:px-4">
            {cards.map((card, index) => (
              <WhyEazotelCard key={index} {...card} />
            ))}
          </div>
          <div className="pl-2.5 py-2.5 rounded-l-[15.57px] lg:block hidden">
            <div className="w-full relative aspect-[4/3.2] xl:aspect-square overflow-hidden rounded-l-[13.84px]">
              <Image
                src={images[0]}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default WhyEazotel;
