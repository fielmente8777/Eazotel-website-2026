import { WhoUseEazotelProps } from "@/@types/@landingPageType";
import Image from "next/image";

const WhoUseEazotelCard: React.FC<
  WhoUseEazotelProps["cards"][0] & { imageWrapperClassName?: string }
> = ({ title, description, image, imageWrapperClassName }) => {
  return (
    <div className="bg-background-1 border-8 border-white rounded-xl overflow-hidden  ">
      <div className="px-5.25 py-6">
        <h3 className="text-primary text-xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-secondary ">{description}</p>
      </div>
      <div
        className={`w-full relative aspect-[4/2.35] rounded-[10px] overflow-hidden mt-5 border-2 border-white ${imageWrapperClassName}`}
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
};

export default WhoUseEazotelCard;
