import { AutomationPropsType } from "@/@types/@landingPageType";
import Image from "next/image";

const AutomationCard: React.FC<AutomationPropsType["items"][0]> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="glassy-card backdrop-blur-lg! bg-white/6! rounded-2xl p-6 w-full lg:max-w-[400px] md:max-w-[330px]">
      <h3 className="text-white text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-light pr-6">{description}</p>
      <div className="w-full relative aspect-4/1.5 rounded-[10px] overflow-hidden mt-5">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
};

export default AutomationCard;
