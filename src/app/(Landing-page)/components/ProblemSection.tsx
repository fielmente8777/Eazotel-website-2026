import { ProblemSectionProps } from "@/@types/@landingPageType";
import { Container, Section } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import ProblemCard from "./cards/ProblemCard";

const ProblemSection: React.FC<ProblemSectionProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  cards,
  note,
}) => {
  return (
    <Section className="bg-linear-to-b from-[#001631] from-0% to-[#00060b] to-40%">
      <Container className="md:space-y-6 space-y-4">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          setIcon={titleIcon}
          textCenter
          wrapperClassName="gap-4 md:max-w-[40rem] mx-auto"
          titleWrapperClassName="px-4 py-2 bg-[#192b42]/70 border-[0.1px] border-main-border/40 rounded-full backdrop-blur-md"
          titleColor="white"
          subTitleColor="white"
        />
        <p className="md:text-lg text-white text-center">{description[0]}</p>
        <div className="grid  md:grid-cols-2 mt-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`border-[#213354] ${index % 2 === 0 ? "md:border-r" : ""} ${index === 0 || index === 1 ? "border-b" : ""} ${index === 0 ? "bg-linear-to-t from-[#001631] from-0% to-[#00060b] to-40%" : index === 3 ? "bg-linear-to-b from-[#001631] from-0% to-[#00060b] to-40%" : ""}`}
            >
              {" "}
              <ProblemCard key={index} {...card} index={index} />
            </div>
          ))}
        </div>
      </Container>
      {/* <ProblemSlider cards={cards} /> */}
      <Container>
        <div className="flex items-center gap-4 px-8 py-2 bg-linear-to-r from-color-4/35 to-[#5770FF]/35 md:rounded-2xl rounded-md blur-effect max-w-157 md:mt-16 mt-6 mx-auto">
          <div className="">{note.icon}</div>
          <p className="text-white md:text-lg text-[10px] font-medium">
            {note.text}
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default ProblemSection;
