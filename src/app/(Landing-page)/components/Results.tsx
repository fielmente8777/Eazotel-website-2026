import { ResultsProps } from "@/@types/@landingPageType";
import { Container, Section } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";

const Results: React.FC<ResultsProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  stats,
  images,
}) => {
  return (
    <Section>
      <Container className="space-y-4">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          setIcon={titleIcon}
          textCenter
          titleWrapperClassName="px-5 py-2 border border-main-border rounded-full"
          wrapperClassName="gap-2"
        />
        <p className="md:text-lg text-center">{description[0]}</p>
      </Container>
      <div className="results-bg mx-4 md:mt-16 mt-8 md:pt-[62px] pt-4 md:pb-16 pb-4">
        <Container className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-45">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col text-white">
              <span className="md:text-[56px] text-2xl font-semibold">{stat.value}</span>
              <p className="max-md:text-[10px] font-semibold">{stat.label}</p>
            </div>
          ))}
        </Container>
        <div className="md:mt-12 mt-6 grid grid-cols-5 lg:gap-4 gap-1 px-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full relative aspect-[4/4] overflow-hidden lg:rounded-2xl rounded-xs"
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Results;
