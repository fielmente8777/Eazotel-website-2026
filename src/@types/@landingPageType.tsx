import { JSX } from "react";
import { CtaBtnPropsType } from "./@types";

export interface ProblemSectionProps {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  cards: {
    title: string;
    description: string;
    icon: JSX.Element;
  }[];
  note: {
    icon: JSX.Element;
    text: string;
  };
}

export interface FeaturesProps {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  cards: {
    title: string;
    description: string;
    image: string;
  }[];
}

export interface ModulesProps {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  cards: {
    title: string;
    description: string;
    points: string[];
    image: string;
  }[];
}

export interface WhyEazotelProps {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  images: string[];
  cards: {
    title: string;
    description: string;
    icon: JSX.Element;
  }[];
}

export interface AutomationPropsType {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export interface ResultsProps {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  stats: {
    value: string;
    label: string;
  }[];
  images: string[];
}

export interface HowItWorkProps {
  titleIcon: JSX.Element;
  title: string;
  subTitle: string;
  description: string[];
  steps: {
    title: string;
    description: string;
    items: {
      title: string;
      icon?: JSX.Element;
      src?: string;
      number?: string;
      leadType?: string;
    }[];
    note?: string;
  }[];
}
