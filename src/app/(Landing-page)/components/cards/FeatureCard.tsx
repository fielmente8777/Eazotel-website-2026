import { FeaturesProps } from "@/@types/@landingPageType";
import Image from "next/image";

const FeatureCard: React.FC<FeaturesProps["cards"][0]> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="lg:max-w-[420.8px] md:max-w-[300px] w-full flex flex-col gap-4">
      <div className="bg-[#F0F0F0] pt-4 px-4 rounded-t-2xl w-full">
        <div className="w-full aspect-4/3 overflow-hidden relative rounded-t-2xl ">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </div>
      <div className="text-center space-y-2 px-6">
        <h3 className="md:text-2xl text-lg text-primary font-semibold">{title}</h3>
        <p className="md:text-lg text-[13.95px] text-secondary">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
