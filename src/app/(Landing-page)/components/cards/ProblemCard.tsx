import { ProblemSectionProps } from "@/@types/@landingPageType";

const ProblemCard: React.FC<ProblemSectionProps["cards"][0]> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="glassy-card backdrop-blur-lg! bg-white/6! rounded-2xl p-6">
      <div className="glassy-card w-fit bg-transparent! p-3 rounded-[10px] mb-5">
        {icon}
      </div>
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-light ">{description}</p>
    </div>
  );
};

export default ProblemCard;
