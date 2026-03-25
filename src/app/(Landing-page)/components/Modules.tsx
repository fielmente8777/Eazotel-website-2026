import { ModulesProps } from "@/@types/@landingPageType";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import ModulesSlider from "./ModulesSlider";

const Modules: React.FC<ModulesProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  cards,
}) => {
  return (
    <SectionWithContainer sectionClassName="module-bg" sectionId="modules">
      <SectionHeading
        title={title}
        subTitle={subTitle}
        setIcon={titleIcon}
        textCenter
        wrapperClassName="md:gap-4 md:max-w-[40rem] mx-auto"
        titleWrapperClassName="title-glass-effect"
        titleColor="white"
        subTitleColor="white"
      />
        <p className="md:text-lg text-background-3 max-md:px-2 mt-3 text-sm text-center">{description[0]}</p>
      <ModulesSlider cards={cards} />
    </SectionWithContainer>
  );
};

export default Modules;
