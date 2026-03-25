import { WhyEazotelProps } from "@/@types/@landingPageType";

const WhyEazotelCard: React.FC<WhyEazotelProps["cards"][0]> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="px-4.5 py-4 rounded-[10px] bg-white border border-main-border">
      <div className="w-fit bg-[#E3ECFF] p-3 rounded-md mb-5">
        {icon}
      </div>
      <h3 className="text-primary md:text-xl text-[12px] font-semibold mb-2">{title}</h3>
      <p className="text-secondary max-md:text-[10px]">{description}</p>
    </div>
  );
};

export default WhyEazotelCard;
