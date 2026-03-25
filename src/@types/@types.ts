import { ClientData } from "@/utils/client";
import { JSX } from "react";

export type BtnType = "button" | "link";

export interface CtaBtnPropsType {
  label: string;
  href?: string;
  type: BtnType;
  target?: string;
}
export interface NavLinksProps {
  href: string;
  label: string;
  subLinks?: NavLinksProps[];
}

export interface BannerPropsType {
  imgSrc: string;
  title: string;
  subTitle: string;
  description: string;
}

export interface AboutCompanyPropsType {
  title: string;
  subTitle: string;
  description: string[];
  listData: string[];
  imgSrc: string[];
  linksData: {
    label: string;
    href: string;
  }[];
}

export type MarketingPartnersPropsType = {
  cards: {
    imgSrc: string;
    title: string;
  }[];
};

export interface ServingHospitalityPropsType {
  title: string;
  description: string[];
  cards: {
    imgSrc: string;
    title: string;
  }[];
}

export interface ServicesPropsType {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
  cards: {
    imgWrapperClassName?: string;
    imgClassName?: string;
    imgSrc: string;
    title: string;
    description: string;
  }[];
}

export interface howItWorksPropsType {
  title: string;
  subTitle: string;
  description: string[];
  cards: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
}

export interface ChooseUsPropsType {
  title: string;
  subTitle: string;
  cards: {
    icon: JSX.Element;
    title: string;
    subTitle: string;
    description: string;
    color: string;
  }[];
}

export interface OurWorkPropsType {
  title: string;
  subTitle: string;
  description: string;
  imagesSrc: string[];
  linksData: {
    label: string;
    href: string;
  }[];
}

export interface CountriesWeWorkedInPropsType {
  title: string;
  subTitle: string;
  imagesSrc: string[];
}

export interface MaximizeGrowthPropsType {
  title: string;
  subTitle: string;
  cards: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
  links: {
    label: string;
    href: string;
  }[];
}

export interface OurValuedClientsPropsType {
  title: string;
  cards: ClientData[];
}

export interface TestimonialsPropsType {
  title: string;
  subTitle: string;
  cards: {
    title: string;
    description: string;
  }[];
  links: {
    label: string;
    href: string;
  }[];
}

export interface FaqsPropsType {
  title: string;
  cards: {
    question: string;
    answer: string;
  }[];
}

export interface AddsCardsPropsType {
  title: string;
  description: string;
  links: {
    label: string;
    href: string;
  }[];
}
