import { WhoUseEazotelProps } from "@/@types/@landingPageType";
import {
  Container,
  Section
} from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import WhoUseEazotelSlider from "./slider/WhoUseEazotelSlider";

const WhoUseEazotel: React.FC<WhoUseEazotelProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  cards,
}) => {
  return (
    <Section className="space-y-4 bg-background-1">
      <Container className="space-y-4">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          setIcon={titleIcon}
          textCenter
          subTitleClassName="span-color-3"
          wrapperClassName=""
          titleWrapperClassName="px-5 py-2 border border-main-border rounded-full"
        />
        <p className="md:text-lg text-center mx-auto md:max-w-[45%]">
          {description}
        </p>
      </Container>
      <WhoUseEazotelSlider cards={cards} />
    </Section>
  );
};

export default WhoUseEazotel;
