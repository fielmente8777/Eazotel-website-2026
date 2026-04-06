import Image from "next/image";
import { CtaBtn } from "@/components/buttons/CtaBtn";
import { Container, Section } from "@/components/sectionComponants";
import AutoSliderTestimonial from "./slider/AutoSliderTestimonial";
import { SectionHeading } from "@/components/typography";
import { JSX } from "react";

interface MoreStoriesPropsType {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string;
  testimonials: {
    title: string;
    description: string;
  }[];
  cta: {
    label: string;
    href: string;
  };
}

const MoreStories: React.FC<MoreStoriesPropsType> = ({
  titleIcon,
  title,
  subTitle,
  description,
  testimonials,
  cta,
}) => {
  return (
    <Section
      defaultPadding={false}
      className="bg-background-black1 relative w-full xl:aspect-4/3 lg:aspect-4/3.5 md:aspect-4/5.75 sm:aspect-4/12 aspect-4/13"
    >
      <Image
        src="/Testimonials.png"
        alt="testimonial"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 bg-black/50">
        <Container className="lg:h-full my-auto max-lg:py-18">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center h-full">
            <div className="flex flex-col gap-4 my-auto">
              <SectionHeading
                title={title}
                subTitle={subTitle}
                setIcon={titleIcon}
                titleColor="white"
                subTitleColor="white"
                level={1}
                wrapperClassName="gap-3 "
                subTitleClassName="md:text-5xl!"
                titleWrapperClassName="rounded-full w-fit px-4 py-2  bg-[#FFFFFF29] backdrop-blur-md shadow-inner shadow-white/15 border-[0.1px] border-white/40"
              />

              <p
                className="text-white text-lg "
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>

              <CtaBtn
                type="link"
                label={cta.label}
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                icon="arrow2"
                iconClass="text-color-4"
                className="w-fit rounded-lg bg-white max-lg:hidden text-color-4 font-medium"
              />
            </div>
            <div className="overflow-hidden lg:h-full grid lg:gap-4 gap-6 lg:grid-cols-2 grid-cols-1 w-full">
              <AutoSliderTestimonial testimonials={testimonials} />
              <AutoSliderTestimonial testimonials={testimonials} dir={true} />
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default MoreStories;
