import { ClientData } from "@/utils/client";
import { StaticImageData } from "next/image";
import { JSX } from "react";
import { CtaBtnPropsType } from "./@types";

export interface BusinessPartnersDataTypes {
  title: string;
  cards: {
    imgSrc: string;
    title: string;
  }[];
}

export interface AboutCompanyDataTypes {
  src: string;
  title: string;
  subTitle: string;
  description: string[];
  listData: string[];
  stats: {
    number: string;
    label: string;
  }[];
  cta: {
    label: string;
    href: string;
  };
}

export interface IndustryWeServeDataTypes {
  title: string;
  subTitle: string;
  description?: string;
  cards: {
    imgSrc: string;
    title: string;
    desc: string;
  }[];
}

export interface ServicesDataTypes {
  title: string;
  subTitle: string;
  cards: {
    icon?: JSX.Element;
    title: string;
    description: string;
  }[];
}

export interface ProductsDataTypes {
  title: string;
  subTitle: string;
  description: string;
  cards: {
    icon?: JSX.Element;
    title: string;
    description: string;
  }[];
  cta?: CtaBtnPropsType;
}

export interface HowItWorksDataTypes {
  title: string;
  subTitle: string;
  cards: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
}

export interface WhyChooseUsDataTypes {
  title: string;
  subTitle: string;
  description: string[];
  cardsData: {
    src: string;
    heading: string;
    body: string;
    points?: string[];
    description?: string;
  }[];
}

export interface OurWorkDataTypes {
  title: string;
  subTitle: string;
  description: string;
  link: {
    label: string;
    href: string;
  };
  src: string;
}

export interface MaximizeGrowthDataTypes {
  title: string;
  subTitle: string;
  cards: {
    src: string;
    title: string;
    description: string;
  }[];
  link: {
    label: string;
    href: string;
  };
}

export interface MarketingExpertiseDataTypes {
  title: string;
  cards: {
    icon?: JSX.Element;
    title: string;
    subtitle: string;
  }[];
}

export interface ClientsDataTypes {
  title: string;
  clients: ClientData[];
}

export interface FaqsDataTypes {
  title: string;
  subTitle: string;
  card: {
    src: string;
    title: string;
    description: string;
    links: {
      label: string;
      href: string;
    };
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface BlogsDataTypes {
  title: string;
  subTitle: string;
  description: string;
  cards: {
    src: string | undefined | StaticImageData;
    title: string;
    date: string;
    slug: string;
    description: string;
  }[];
}

export interface TestimonialsDataTypes {
  title: string;
  subTitle: string;
  cards: {
    title: string;
    description: string;
  }[];
}

export interface UniqueSectionTypes {
  title: string;
  description: string[];
  images: string[];
  link: {
    label: string;
    href: string;
  };
}
