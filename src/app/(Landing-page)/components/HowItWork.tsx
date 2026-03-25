import { HowItWorkProps } from "@/@types/@landingPageType";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import HowItWorkCard from "./cards/HowItWorkCard";

const HowItWork: React.FC<HowItWorkProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  steps,
}) => {
  return (
    <SectionWithContainer sectionClassName="how-it-work" sectionId="how-it-works">
      <div className="grid lg:grid-cols-[1fr_.4fr] gap-6 items-center">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          setIcon={titleIcon}
          wrapperClassName="gap-4"
          titleWrapperClassName="title-glass-effect w-fit"
          titleColor="white"
          subTitleColor="white"
        />
        <p className="md:text-lg text-white">{description[0]}</p>
      </div>
      <div className="grid lg:grid-cols-3 lg:gap-36 gap-8 md:mt-16 mt-8 relative">
        <div className="lg:w-full w-px lg:h-px md:h-[530px] h-[600px] absolute top-6 max-lg:left-6 max-md:left-5 bg-[#384255]"></div>
        {steps.map((step, index) => (
          <HowItWorkCard key={index} {...step} index={index + 1} />
        ))}
      </div>
    </SectionWithContainer>
  );
};

export default HowItWork;
