import { FeaturesProps } from "@/@types/@landingPageType";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import FeatureCard from "./cards/FeatureCard";
import FeaturesSlider from "./slider/FeaturesSlider";

const Features: React.FC<FeaturesProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  cards,
}) => {
  return (
    <SectionWithContainer containerClassName="md:space-y-4 space-y-3" sectionId="features">
      <SectionHeading
        title={title}
        subTitle={subTitle}
        setIcon={titleIcon}
        textCenter
        subTitleClassName="span-color-3"
        wrapperClassName="max-md:px-12"
        titleWrapperClassName="px-5 py-2 border border-main-border rounded-full"
      />
      <p className="md:text-lg text-center">{description[0]}</p>
      <div className="md:flex hidden flex-wrap justify-center gap-x-7 gap-y-13 mt-12">
        {cards.map((card, index) => (
          <FeatureCard key={index} {...card} />
        ))}
      </div>
      <FeaturesSlider cards={cards} />
    </SectionWithContainer>
  );
};

export default Features;
