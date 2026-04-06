import { ResultsProps } from "@/@types/@landingPageType";
import { Container, Section } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import { CtaBtn } from "../../../components/buttons/CtaBtn";

const Results: React.FC<ResultsProps> = ({
  titleIcon,
  title,
  subTitle,
  description,
  stats,
  cta,
  note,
}) => {
  return (
    <Section className="bg-background-1">
      <Container className="space-y-4">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          setIcon={titleIcon}
          textCenter
          titleWrapperClassName="px-5 py-2 border border-main-border rounded-full"
          wrapperClassName="gap-2"
        />
        <p className="md:text-lg text-secondary text-center">
          {description[0]}
        </p>
      </Container>
      <Container className="flex flex-col gap-12 items-center">
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 md:mt-12 mt-8 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col bg-white md:p-6 p-4 gap-2"
            >
              <p className="md:text-lg text-sm text-secondary font-semibold">
                {stat.label}
              </p>
              <span
                className="md:text-[56px] text-3xl text-primary font-semibold mt-18"
                dangerouslySetInnerHTML={{ __html: stat.value }}
              ></span>
              <p className="max-md:text-sm text-tertiary">{stat.description}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <CtaBtn
            label={cta.label}
            href={cta.href}
            target="_blank"
            type="link"
            icon="arrow2"
            iconClass="bg-color-4! text-white"
            className="bg-color-4 mx-auto text-white w-fit rounded-lg"
          />
          <p className="md:text-lg text-secondary text-center">
            {description[1]}
          </p>
          <p className="flex items-center justify-center gap-2 md:text-lg text-color-4">
            <span className="flex items-center ">
              {Array.from({ length: 5 }, (_, index) => (
                <Foo key={index} />
              ))}
            </span>
            {note}
            <span>
              <Foo2 />
            </span>
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default Results;

export const Foo = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0006 13.0703L7.19771 15.2082C7.07702 15.3011 6.9491 15.3441 6.81396 15.3371C6.67883 15.3302 6.55785 15.2914 6.45105 15.2209C6.34424 15.1505 6.26195 15.0519 6.20417 14.9253C6.14653 14.7987 6.14438 14.6623 6.19771 14.5159L7.27313 11.0063L4.5648 9.06881C4.43549 8.98436 4.35403 8.87457 4.32042 8.73943C4.28681 8.60429 4.29244 8.47638 4.3373 8.35568C4.38216 8.23499 4.45667 8.13159 4.56084 8.04548C4.66501 7.9595 4.79028 7.91652 4.93667 7.91652H8.30521L9.40126 4.3011C9.45473 4.15485 9.5357 4.04165 9.64417 3.96152C9.75251 3.88138 9.87133 3.84131 10.0006 3.84131C10.1299 3.84131 10.2488 3.88138 10.3571 3.96152C10.4656 4.04165 10.5465 4.15485 10.6 4.3011L11.696 7.91652H15.0646C15.211 7.91652 15.3363 7.9595 15.4404 8.04548C15.5446 8.13159 15.6191 8.23499 15.664 8.35568C15.7088 8.47638 15.7145 8.60429 15.6808 8.73943C15.6472 8.87457 15.5658 8.98436 15.4365 9.06881L12.7281 11.0063L13.8035 14.5159C13.8569 14.6623 13.8547 14.7987 13.7971 14.9253C13.7393 15.0519 13.657 15.1505 13.5502 15.2209C13.4434 15.2914 13.3224 15.3302 13.1873 15.3371C13.0522 15.3441 12.9242 15.3011 12.8035 15.2082L10.0006 13.0703Z"
      fill="#FFBE19"
    />
  </svg>
);

export const Foo2 = () => (
  <svg
    width={19}
    height={19}
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.7817 6.17797L5.39331 13.5589C5.28367 13.6684 5.14592 13.7219 4.98006 13.7194C4.81408 13.7169 4.67626 13.6608 4.56661 13.5512C4.4571 13.4415 4.40234 13.305 4.40234 13.1417C4.40234 12.9783 4.4571 12.8418 4.56661 12.7322L11.9475 5.34375H5.45882C5.29059 5.34375 5.14955 5.28682 5.03568 5.17295C4.92194 5.05908 4.86507 4.91803 4.86507 4.7498C4.86507 4.58144 4.92194 4.44046 5.03568 4.32685C5.14955 4.21312 5.29059 4.15625 5.45882 4.15625H13.2536C13.4564 4.15625 13.6263 4.2248 13.7634 4.36189C13.9006 4.49911 13.9692 4.66905 13.9692 4.87172V12.6667C13.9692 12.8349 13.9123 12.9759 13.7984 13.0896C13.6846 13.2035 13.5435 13.2604 13.3753 13.2604C13.2069 13.2604 13.0659 13.2035 12.9521 13.0896C12.8385 12.9759 12.7817 12.8349 12.7817 12.6667V6.17797Z"
      fill="#0D54EB"
    />
  </svg>
);
