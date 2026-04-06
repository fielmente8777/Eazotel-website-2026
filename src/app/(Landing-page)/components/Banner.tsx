import { CtaBtnPropsType } from "@/@types/@types";
import { CtaBtn } from "@/components/buttons/CtaBtn";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";

interface Props {
  title: string;
  subTitle: string;
  description: string[];
  images: string[];
  actions: CtaBtnPropsType[];
}

const Banner: React.FC<Props> = ({
  title,
  subTitle,
  description,
  images,
  actions,
}) => {
  return (
    <SectionWithContainer sectionClassName="bnr" >
      <div className="flex flex-col md:gap-7 gap-4">
        <SectionHeading
          title={title}
          subTitle={subTitle}
          textCenter
          titleColor="white"
          subTitleColor="white"
          titleClassName="title-glass-effect max-md:text-xs"
          subTitleClassName="md:text-[54px]/[60px] text-[28px]"
          wrapperClassName="gap-6 md:max-w-[45rem] mx-auto"
          level={1}
        />
        <p className="md:text-lg text-white text-center lg:max-w-[45%] mx-auto">
          {description[0]}
        </p>
        <div className="flex items-center justify-center md:gap-4 gap-2">
          {actions.map((action, index) => (
            <CtaBtn
              label={action.label}
              href={action.href}
              type={action.type}
              target={action.target}
              key={index}
              icon={index === 1 ? "arrow2" : "none"}
              iconClass="bg-transparent!"
              className={`rounded-lg border-none max-md:text-sm max-md:px-4  ${index === 0 ? "bg-white text-color-4 max-md:h-12" : "bg-white/10 backdrop-blur-md text-white shadow-inner"}`}
            />
          ))}
        </div>
        <div className="md:max-w-227.5 mt-8 w-full mx-auto relative aspect-[4/2.4] lg:aspect-[4/2.4] rounded-2xl overflow-hidden">
          <Image
            src={images[0]}
            alt="banner"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Banner;
