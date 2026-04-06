import { HowItWorkProps } from "@/@types/@landingPageType";
import Image from "next/image";

const HowItWorkCard: React.FC<
  HowItWorkProps["steps"][0] & { index: number }
> = ({ title, description, items, note, index }) => {
  return (
    <div className="text-white flex lg:flex-col md:gap-12 gap-4">
      <div>
        <span className="md:w-12 w-10 aspect-square bg-white/6 shadow-inner rounded-full flex items-center justify-center backdrop-blur-md">
          0{index}
        </span>
      </div>
      <div>
        <h3 className="font-semibold text-2xl mb-2">{title}</h3>
        <p className="text-[#cbcbcb]">{description}</p>
        <div className="md:mt-6 mt-4 border border-[#373737]  rounded-xl overflow-hidden backdrop-blur-md bg-[linear-gradient(145deg,#011632_0%,#00060b_100%)] md:p-5 p-4 flex flex-col items-center justify-center">
          {items && items.length > 0 && (
            <ul
              className={`flex w-full justify-center  ${index === 1 ? "flex-wrap gap-3" : index === 3 ? "w-full bg-[#171B22] rounded-lg bordr border-[#424242] flex-col items-center py-8" : "flex-col gap-3"}`}
            >
              {items.map((item, i) => (
                <li
                  key={i}
                  className={`flex items-center text-white px-2.5 py-1.25 gap-2.5  backdrop-blur-sm   rounded-xl overflow-hidden shadow-inner ${index === 1 ? " w-fit bg-white/3 rounded-full" : index === 2 ? " w-full bg-[#171B22] rounded-lg bordr border-[#424242]" : ""}`}
                >
                  {item.src && (
                    <span className="w-6.5 aspect-square rounded-full overflow-hidden relative">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </span>
                  )}
                  {item.icon && <span>{item.icon}</span>}{" "}
                  {item.title && (
                    <span
                      className={`max-md:text-sm text-xs${index === 3 ? (i === 0 ? "text-base font-semibold" : "text-sm") : ""}`}
                    >
                      {item.title}
                    </span>
                  )}
                  {item.leadType && (
                    <span
                      className={`md:text-[10px] text-[9px] ${i === 0 ? "text-[#FF6161]" : i === 1 ? "text-[#F5C451]" : "text-[#5E98F6]"}`}
                    >
                      {item.leadType}
                    </span>
                  )}
                  {item.number && (
                    <span className="ml-auto">{item.number}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {note && <p className="text-[#9EFF8E] text-center mt-6">{note}</p>}
        </div>
      </div>
    </div>
  );
};

export default HowItWorkCard;
