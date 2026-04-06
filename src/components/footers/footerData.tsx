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
  description: "All-in-one hotel CRM and marketing platform that turns enquiries into direct bookings.",
  listOfLinks: [
    {
      title: "Product",
      links: [
        {
          label: "Features",
          href: "",
        },
        {
          label: "Modules",
          href: "",
        },
        {
          label: "How it works",
          href: "",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          label: "About",
          href: "",
        },
        {
          label: "Privacy Policy",
          href: "",
        },
        {
          label: "Contact",
          href: "",
        },
      ],
    },
    {
      title: "Get Started",
      links: [
        {
          label: "Book a demo",
          href: "",
        },
        {
          label: "Whatsapp",
          href: "",
        },
      ],
    },
  ],
};
