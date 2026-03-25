import { JSX } from "react";
import Headings from "./Headings";

interface SectionHeadingProps {
  title?: string;
  subTitle?: string;

  level?: 1 | 2 | 3 | 4 | 5 | 6; // base level (title)
  subLevel?: 2 | 3 | 4 | 5 | 6; // optional override

  textCenter?: boolean;
  mdTextCenter?: boolean;
  smTextCenter?: boolean;
  titleColor?: string;
  subTitleColor?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  icon?: boolean;
  icon2?: boolean;
  setIcon?: JSX.Element;
  logo?: boolean;
  fontPrimary?: boolean;
  titleWrapperClassName?: string;
  iconClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subTitle,
  icon2 = false,
  setIcon,
  icon = icon2 ? false : false,
  textCenter = false,
  titleColor,
  subTitleColor,
  smTextCenter = false,
  mdTextCenter = false,
  wrapperClassName = "",
  titleClassName = "",
  subTitleClassName = "",
  level,
  subLevel,
  titleWrapperClassName = "",
  iconClassName = "",
}) => {
  const titleLevel = level ?? 2;
  const subTitleLevel = subLevel ?? Math.min(titleLevel + 1, 6);

  return (
    <div className={`flex flex-col gap-1 icon ${wrapperClassName}`}>
      {title && (
        <div
          className={`${icon && "flex items-center gap-2"} ${icon2 && "flex items-center gap-2"} ${setIcon && "flex items-center gap-2"} ${textCenter && "mx-auto"} ${titleWrapperClassName}`}
        >
          {icon && (
            <span className={iconClassName}>
              <IconBox />
            </span>
          )}
          {icon2 && (
            <span className={iconClassName}>
              <IconBox2 />
            </span>
          )}
          {setIcon && <span className={iconClassName}>{setIcon}</span>}
          <Headings
            level={titleLevel}
            heading={title}
            className={`${titleClassName} ${
              mdTextCenter ? "md:text-center" : ""
            } ${textCenter ? "text-center" : ""} ${
              smTextCenter ? "max-md:text-center" : ""
            } ${
              titleColor ? `text-${titleColor}` : "text-secondary"
            }  text-sm font-bold`}
          />
        </div>
      )}
      {subTitle && (
        <Headings
          level={subTitleLevel}
          className={`md:text-[2.5rem]/[3rem] text-xl font-semibold ${subTitleClassName} ${subTitleColor ? `text-${subTitleColor}` : "text-primary"} ${
            mdTextCenter ? "md:text-center" : ""
          } ${textCenter ? "text-center mx-auto" : ""} ${
            smTextCenter ? "max-md:text-center" : ""
          }`}
          heading={subTitle}
        />
      )}
    </div>
  );
};

export default SectionHeading;

export const IconBox = () => (
  <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={10} height={10} rx={2} fill="url(#paint0_radial_1_4727)" />
    <defs>
      <radialGradient
        id="paint0_radial_1_4727"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(5 5) rotate(90) scale(5)"
      >
        <stop stopColor="#91A4E8" />
        <stop offset={1} stopColor="#0F31AA" />
      </radialGradient>
    </defs>
  </svg>
);

export const IconBox2 = () => (
  <svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={10} height={10} rx={2} fill="url(#paint0_radial_88_21799)" />
    <defs>
      <radialGradient
        id="paint0_radial_88_21799"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(5 5) rotate(90) scale(5)"
      >
        <stop stopColor="#F8D897" />
        <stop offset={1} stopColor="#AA570F" />
      </radialGradient>
    </defs>
  </svg>
);
