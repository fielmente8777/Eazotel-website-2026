import { contacts } from "../../../contact";

interface FooterLinksType {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

interface WebsiteFooterDataType {
  logoSrc: string;
  description: string;
  listOfLinks: FooterLinksType[];
}

export const websiteFooterData: WebsiteFooterDataType = {
  logoSrc: "/logo.png",
  description:
    "All-in-one hotel CRM and marketing platform that turns enquiries into direct bookings.",
  listOfLinks: [
    {
      title: "Product",
      links: [
        {
          label: "Features",
          href: "#features",
        },
        {
          label: "Modules",
          href: "#modules",
        },
        {
          label: "How it works",
          href: "#how-it-works",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          label: "Blogs",
          href: "/blogs",
        },
        {
          label: "Pricing",
          href: "/pricing",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
        },
        {
          label: "Terms of Service",
          href: "/terms-of-service",
        },
        {
          label: "Data Deletion Policy",
          href: "/data-deletion",
        },
        // {
        //   label: "Contact",
        //   href: "",
        // },
      ],
    },
    {
      title: "Get Started",
      links: [
        {
          label: "Book a demo",
          href: contacts.WhatsAppCta,
        },
        {
          label: "Our Services",
          href: "https://www.fielmente.com",
        },
        // {
        //   label: "Whatsapp",
        //   href: "",
        // },
      ],
    },
  ],
};
