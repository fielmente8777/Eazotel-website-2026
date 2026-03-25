"use client";
import { useState } from "react";

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  return (
    <div
      className={`pt-4 cursor-pointer transition-all duration-300 ease-in-out border-b border-[#EBE3E0]`}
    >
      <div
        className="flex justify-between items-center  pb-4"
        onClick={() => {
          setIsPinned((prev) => !prev);
          setIsOpen(true);
        }}
        onMouseEnter={() => {
          if (!isPinned) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (!isPinned) setIsOpen(false);
        }}
      >
        <h3
          className="text-primary text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: question }}
        ></h3>
        <button
          className={`duration-300 ease-in-out transition-all ${isOpen ? "rotate-180" : ""}`}
        >
          {isOpen ? <MinusIcon /> : <AddIcon />}
        </button>
      </div>

      {/* Height animation wrapper */}
      <div
        className={`grid ${isOpen ? "grid-rows-[1fr] pb-3.5" : "grid-rows-[0fr]"} transition-all duration-500 ease-in-out`}
      >
        <div className="overflow-hidden">
          <p
            className={` text-secondary  ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </div>
      </div>
    </div>
  );
};

export default Accordion;

export const DropDownIcon = ({ ...props }) => (
  <svg
    width={11}
    height={12}
    viewBox="0 0 11 12"
    fill="none"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_146_1059)">
      <path
        d="M5.64773 3.05927L10.2026 7.61418C10.4223 7.83386 10.4223 8.19002 10.2026 8.40968L9.67139 8.94094C9.45209 9.16024 9.09666 9.16066 8.87684 8.94187L5.24998 5.33203L1.62314 8.9419C1.40332 9.16068 1.04789 9.16026 0.828586 8.94096L0.297328 8.4097C0.0776484 8.19002 0.0776484 7.83386 0.297328 7.61421L4.85224 3.05929C5.0719 2.83961 5.42805 2.83961 5.64773 3.05927Z"
        fill="#AF8D83"
      />
    </g>
    <defs>
      <clipPath id="clip0_146_1059">
        <rect width="10.5" height={12} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const MinusIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.25 12.75C6.0375 12.75 5.85942 12.6781 5.71575 12.5342C5.57192 12.3904 5.5 12.2122 5.5 11.9997C5.5 11.7871 5.57192 11.609 5.71575 11.4655C5.85942 11.3218 6.0375 11.25 6.25 11.25H17.75C17.9625 11.25 18.1406 11.3219 18.2843 11.4658C18.4281 11.6096 18.5 11.7878 18.5 12.0003C18.5 12.2129 18.4281 12.391 18.2843 12.5345C18.1406 12.6782 17.9625 12.75 17.75 12.75H6.25Z"
      fill="#9EA3AB"
    />
  </svg>
);

export const AddIcon = () => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.25 12.75H6.25C6.0375 12.75 5.85942 12.6781 5.71575 12.5342C5.57192 12.3904 5.5 12.2122 5.5 11.9997C5.5 11.7871 5.57192 11.609 5.71575 11.4655C5.85942 11.3218 6.0375 11.25 6.25 11.25H11.25V6.25C11.25 6.0375 11.3219 5.85942 11.4658 5.71575C11.6096 5.57192 11.7878 5.5 12.0003 5.5C12.2129 5.5 12.391 5.57192 12.5345 5.71575C12.6782 5.85942 12.75 6.0375 12.75 6.25V11.25H17.75C17.9625 11.25 18.1406 11.3219 18.2843 11.4658C18.4281 11.6096 18.5 11.7878 18.5 12.0003C18.5 12.2129 18.4281 12.391 18.2843 12.5345C18.1406 12.6782 17.9625 12.75 17.75 12.75H12.75V17.75C12.75 17.9625 12.6781 18.1406 12.5342 18.2843C12.3904 18.4281 12.2122 18.5 11.9997 18.5C11.7871 18.5 11.609 18.4281 11.4655 18.2843C11.3218 18.1406 11.25 17.9625 11.25 17.75V12.75Z"
      fill="#0D54EB"
    />
  </svg>
);
