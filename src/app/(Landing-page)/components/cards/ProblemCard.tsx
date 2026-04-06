import { ProblemSectionProps } from "@/@types/@landingPageType";
import Image from "next/image";

const ProblemCard: React.FC<
  ProblemSectionProps["cards"][0] & { index: number }
> = ({ title, description, index, image }) => {
  return (
    <div className={`pt-10 lg:px-20 px-8 lg:pb-14.75 pb-10`}>
      <span className="text-[#ff824f] text-lg mb-5">0{index + 1}</span>
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-light ">{description}</p>
      <div className="w-full relative aspect-[4/1.82] mt-6">
        <Image src={image} alt={title} fill className="object-cover rounded-2xl border border-[#213354] border-inset" />
      </div>
    </div>
  );
};

export default ProblemCard;
