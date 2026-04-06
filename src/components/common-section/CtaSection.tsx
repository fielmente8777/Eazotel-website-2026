import Image from "next/image";
import { SectionWithContainer } from "../sectionComponants";
import { CtaBtn } from "../buttons/CtaBtn";
import { SectionHeading } from "../typography";

interface Props {
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
}
const CtaSection: React.FC<Props> = ({ title, description, cta }) => {
  return (
    <SectionWithContainer>
      <div className="w-full relative xl:aspect-[4/1.2] lg:aspect-4/1.25 md:aspect-4/1.75 aspect-square bg-background-black1 rounded-3xl overflow-hidden">
        <Image src="/content.png" alt="hero" fill className="object-cover" />
        <div className="absolute inset-0 flex items-center justify-center z-20 max-lg:px-4">
          <div className="space-y-8">
            <SectionHeading
              subTitle={title}
              subTitleColor="white"
              subLevel={2}
              textCenter
            />

            <p className="text-white font-medium max-w-140 mx-auto w-full text-center lg:text-lg">
              {description}
            </p>
            <CtaBtn
              type="button"
              label={cta.label}
              className="border-none mx-auto w-full max-w-60 rounded-lg bg-color-4 text-white"
            />
          </div>
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default CtaSection;
