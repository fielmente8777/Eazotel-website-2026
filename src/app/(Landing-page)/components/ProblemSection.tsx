import { ProblemSectionProps } from "@/@types/@landingPageType";
import { Container, Section } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import ProblemCard from "./cards/ProblemCard";
import ProblemSlider from "./slider/ProblemSlider";

const ProblemSection: React.FC<ProblemSectionProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  cards,
  note,
}) => {
  return (
    <Section className="bg-background-black-1">
      <Container className="md:space-y-6 space-y-4">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          setIcon={titleIcon}
          textCenter
          wrapperClassName="gap-4 md:max-w-[40rem] mx-auto"
          titleWrapperClassName="title-glass-effect"
          titleColor="white"
          subTitleColor="white"
        />
        <p className="md:text-lg text-white text-center">{description[0]}</p>
        <div className="md:grid hidden lg:grid-cols-4 md:grid-cols-2 gap-6 mt-16">
          {cards.map((card, index) => (
            <ProblemCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </Container>
      <ProblemSlider cards={cards} />
      <Container>
        <div className="flex items-center gap-4 px-8 py-2 bg-linear-to-r from-color-4/35 to-[#5770FF]/35 md:rounded-2xl rounded-md blur-effect max-w-157 md:mt-16 mt-6 mx-auto">
          <div className="">{note.icon}</div>
          <p className="text-white md:text-lg text-[10px] font-medium">{note.text}</p>
        </div>
      </Container>
    </Section>
  );
};

export default ProblemSection;
