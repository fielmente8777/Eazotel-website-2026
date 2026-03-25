import { AutomationPropsType } from "@/@types/@landingPageType";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import AutomationCard from "./cards/AutomationCard";
import AutomationSlider from "./slider/AutomationSlider";

const Automation: React.FC<AutomationPropsType> = ({
  titleIcon,
  title,
  subTitle,
  description,
  items,
}) => {
  return (
    <SectionWithContainer sectionClassName="automation-bnr" containerClassName="space-y-6">
      <SectionHeading
        title={title}
        subTitle={subTitle}
        setIcon={titleIcon}
        textCenter
        wrapperClassName="gap-4"
        titleWrapperClassName="title-glass-effect"
        titleColor="white"
        subTitleColor="white"
      />
      <p className="md:text-lg text-light text-center">{description[0]}</p>
      <div className="md:flex hidden flex-wrap justify-center gap-x-7 lg:gap-y-13 gap-y-7 mt-12">
        {items.map((card, index) => (
          <AutomationCard key={index} {...card} />
        ))}
      </div>
      <AutomationSlider cards={items} />
    </SectionWithContainer>
  );
};

export default Automation;
