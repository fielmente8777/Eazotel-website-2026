import { BtnType } from "@/@types/@types";
import { ClientImages } from "@/utils/client";
import {
  BuiltForHotelsIcon,
  CalenderIcon,
  EmailIcon,
  FasterResponseTimeIcon,
  IncreaseDirectBookingIcon,
  MetaAdsIcon,
  MetaLeadsIcon,
  NoMoreMultipleTools,
  NoteIcon,
  StaffForgetIcon,
  WebsiteChatsIcon,
  WebsiteIcon,
  WhatsAppEnquiryIcon,
  WhatsAppIcon,
} from "@/utils/homePageIcons";
import {
  AutomationIcon,
  BoxIcon,
  ProblemSection,
  ResultIcon,
  StarIcon,
  StartIcon,
  TargetIcon,
  TestimonialIcon,
  WorkGraphIcon,
} from "@/utils/titleIcons";
import { contacts } from "../../../../contact";
import { data } from "@/utils/testimonialsData";

const btnType: BtnType = "link";
export const landingPageData = {
  bannerData: {
    title: "All-in-one Hotel CRM & Marketing Platform",
    subTitle: "One Dashboard for All Your Hotel Enquiries",
    description: [
      "Capture leads from Meta, WhatsApp, website chat, and Google—then convert them into direct bookings with Eazotel's hotel CRM.",
    ],
    images: ["/landing-page/Safari-bnr.png"],
    actions: [
      {
        type: btnType,
        target: "_blank",
        label: "Get a Free Demo",
        href: contacts.WhatsAppCta,
      },
      {
        type: btnType,
        target: "_blank",
        label: "See How It Works",
        href: contacts.WhatsAppCta,
      },
    ],
  },

  trustedData: {
    title: "Trusted by <span>120+ hotels</span> worldwide",
    clients: [
      "/logo/taj-logo.png",
      "/logo/radisson.png",
      "/logo/urbon-logo.png",
      "/logo/wabi-sabi-logo.png",
      "/logo/ramada-logo.png",
      "/logo/courtyard-logo.png",
      "/logo/hilten-logo.png",
      "/logo/baymont-logo.png",
      "/logo/hyatt-logo.png",
      "/logo/marriott-logo.png",
      "/logo/westin-logo.png",
      "/logo/accor-logo.png",
      "/logo/crystal-logo.png",
      "/logo/marriot-logo-2.png",
      "/logo/holidaylnn-logo.png",
      "/logo/redroof-logo.png",
      "/logo/sayaji-logo.png",
      "/logo/sarovar-logo.png",
      "/logo/itc-logo.png",
      "/logo/fortune-logo.png",
    ],
    cta: {
      type: btnType,
      target: "_blank",
      label: "Book a Demo",
      href: contacts.WhatsAppCta,
    },
  },

  problemSection: {
    titleIcon: <ProblemSection />,
    title: "The Problem",
    subTitle: "Hotels Lose Bookings Because Leads Are Scattered",
    description: [
      "Your team juggles multiple tools while guests wait. Every missed reply is a lost booking.",
    ],
    cards: [
      {
        title: "Meta leads go to one tool",
        description:
          "Facebook and Instagram enquiries get lost in ad manager notifications.",
        icon: <MetaLeadsIcon />,
        image: "/landing-page/problem-1.png",
      },
      {
        title: "WhatsApp enquiries go to another",
        description:
          "Guest messages sit unread on personal phones without tracking.",
        icon: <WhatsAppEnquiryIcon />,
        image: "/landing-page/problem-2.png",
      },
      {
        title: "Website chats are missed",
        description:
          "Live chat enquiries disappear when staff are offline or busy.",
        icon: <WebsiteChatsIcon />,
        image: "/landing-page/problem-3.png",
      },
      {
        title: "Staff forget to follow up",
        description:
          "Without reminders, hot leads go cold and bookings are lost.",
        icon: <StaffForgetIcon />,
        image: "/landing-page/problem-4.png",
      },
    ],
    note: {
      icon: <NoteIcon />,
      text: "Eazotel brings every guest conversation into one powerful dashboard so your team never misses a booking opportunity.",
    },
  },

  featuresSection: {
    titleIcon: <StartIcon />,
    title: "Features",
    subTitle: "Manage Every Guest Enquiry in <span>One Place</span>",
    description: [
      "All your channels, one dashboard. No more switching between tools.",
    ],
    cards: [
      {
        title: "Meta Lead Ads",
        description:
          "Capture Facebook and Instagram leads instantly into your CRM.",
        image: "/landing-page/feature-1.png",
      },
      {
        title: "WhatsApp",
        description:
          "Manage all guest WhatsApp conversations in one unified inbox.",
        image: "/landing-page/feature-2.png",
      },
      {
        title: "Website Live Chat",
        description: "Never miss a guest enquiry with real time website chat.",
        image: "/landing-page/feature-3.png",
      },
      {
        title: "Direct Website Forms",
        description:
          "Capture form submissions and route them to your sales team.",
        image: "/landing-page/feature-5.png",
      },
      {
        title: "Instagram & Messenger",
        description:
          "Track DMs and comments from social channels automatically.",
        image: "/landing-page/feature-4.png",
      },
    ],
  },

  modulesSection: {
    titleIcon: <BoxIcon />,
    title: "Modules",
    subTitle: "Core Eazotel Modules",
    description: [
      "Everything your hotel needs to capture, manage, and convert leads—all in one platform.",
    ],
    cards: [
      {
        title: "Conversational CRM",
        description:
          "Engage guests across channels with a unified inbox that captures every conversation and converts inquiries into bookings.",
        points: [
          "Unified guest chat inbox",
          "Guest communication history",
          "Lead tracking",
        ],
        image: "/landing-page/module-1.png",
      },
      {
        title: "Performance Marketing",
        description:
          "Run high-ROI campaigns across Google and Meta with real-time analytics and automated lead capture.",
        points: [
          "Google Ads management",
          "Meta Ads lead integration",
          "Campaign tracking",
        ],
        image: "/landing-page/module-2.png",
      },
      {
        title: "SEO for Hotels",
        description:
          "Dominate organic search results and drive qualified traffic directly to your booking engine.",
        points: [
          "Rank higher on Google",
          "Increase direct website traffic",
          "Track organic leads",
        ],
        image: "/landing-page/module-3.png",
      },
      {
        title: "High-Converting Websites",
        description:
          "Purpose-built hotel websites designed to maximize direct bookings and reduce OTA dependency.",
        points: [
          "Direct booking focused design",
          "Mobile-first experience",
          "Lead capture automation",
        ],
        image: "/landing-page/module-4.png",
      },
    ],
  },

  whySection: {
    titleIcon: <TargetIcon />,
    title: "Why Eazotel",
    subTitle: "Why Hotels Choose <span>Eazotel</span>",
    description: [
      "A unified platform built exclusively for hospitality teams to capture and convert more guests.",
    ],
    images: ["/landing-page/why-section.png", "/landing-page/Safari-1.png"],
    cards: [
      {
        title: "Increase Direct Bookings",
        description:
          "Convert more website visitors into confirmed guests with optimized booking ows.",
        icon: <IncreaseDirectBookingIcon />,
      },
      {
        title: "Faster Response Times",
        description:
          "AI powered replies ensure no guest inquiry goes unanswered, even at 2 AM.",
        icon: <FasterResponseTimeIcon />,
      },
      {
        title: "No More Multiple Tools",
        description:
          "Replace your CRM, chat tools, and marketing stack with one unified platform.",
        icon: <NoMoreMultipleTools />,
      },
      {
        title: "Built for Hotels",
        description:
          "Purpose built for hospitality — not a generic CRM forced into hotel workows.",
        icon: <BuiltForHotelsIcon />,
      },
    ],
  },

  automationSection: {
    titleIcon: <AutomationIcon />,
    title: "Automation",
    subTitle: "Automate Your Guest Communication",
    description: [
      "From first inquiry to confirmed booking — every step runs on autopilot.",
    ],
    items: [
      {
        title: "AI Chat Responses",
        description:
          "Instantly reply to guest queries with intelligent AI powered responses 24/7.",
        image: "/landing-page/automation-1.png",
      },
      {
        title: "WhatsApp Broadcasts",
        description: "Send targeted campaigns to segmented guest lists",
        image: "/landing-page/automation-2.png",
      },
      {
        title: "Auto Follow-ups",
        description: "Never lose a lead with timed follow up sequences",
        image: "/landing-page/automation-3.png",
      },
      {
        title: "Booking Reminders",
        description:
          "Reduce no shows with timely confirmation and reminder messages.",
        image: "/landing-page/automation-4.png",
      },
      {
        title: "Lead Status Tracking",
        description:
          "Track every lead from first enquiry through to confirmed booking.",
        image: "/landing-page/automation-5.png",
      },
    ],
  },

  resultsSection: {
    titleIcon: <ResultIcon />,
    title: "Results",
    subTitle: "Designed for growth, built for <span>Hotels</span>",
    description: [
      "The all-in-one platform to manage, convert, and maximize every enquiry",
      "No setup hassle | Works with your existing channels",
    ],
    stats: [
      {
        value: "2×",
        description: "Reply to guests instantly across all channels",
        label: "Faster Guest Response",
      },
      {
        value: "35%",
        description: "Turn more enquiries into confirmed bookings",
        label: "Smart Lead Conversion",
      },
      {
        value: "40%",
        description: "Drive more direct reservations without OTAs",
        label: "Direct Bookings",
      },
      {
        value: "1",
        description: "Manage all guest interactions from one dashboard",
        label: "Unified Enquiry Management",
      },
    ],
    images: [
      "/landing-page/result-1.png",
      "/landing-page/result-2.png",
      "/landing-page/result-3.png",
      "/landing-page/result-4.png",
      "/landing-page/result-5.png",
    ],
    cta: {
      label: "Get Started With Eazotel",
      href: contacts.WhatsAppCta,
    },
    note: "Trusted by 500+ hotels",
  },

  howItWorks: {
    titleIcon: <WorkGraphIcon />,
    title: "How It Works",
    subTitle: "How Eazotel Works",
    description: [
      "Get started in three simple steps — from connecting channels to converting bookings",
    ],
    steps: [
      {
        title: "Connect Channels",
        description:
          "Integrate WhatsApp, Meta Ads, Website Chat, and more in minutes.",
        items: [
          { title: "Whatsapp", icon: <WhatsAppIcon /> },
          { title: "Meta Ads", icon: <MetaAdsIcon /> },
          { title: "Website", icon: <WebsiteIcon /> },
          { title: "Email", icon: <EmailIcon /> },
        ],
        note: "All channels connected!",
      },
      {
        title: "Manage Leads",
        description:
          "Track every guest inquiry in a unified inbox with lead scoring.",
        items: [
          {
            title: "Mayank Singh",
            src: "/landing-page/23.png",
            number: "23",
            leadType: "Hot lead",
          },
          {
            title: "Priya Mehra",
            src: "/landing-page/12.png",
            number: "12",
            leadType: "Warm lead",
          },
          {
            title: "Ayush S",
            src: "/landing-page/54.png",
            number: "54",
            leadType: "New lead",
          },
        ],
      },
      {
        title: "Convert Bookings",
        description:
          "Close deals faster with automated follow ups and booking confirmations.",
        items: [
          { title: "Booking Confirmed!", icon: <CalenderIcon /> },
          { title: "Ocean View Suite Dec 24 28" },
        ],
      },
    ],
  },

  // check
  whoUseEazotel: {
    titleIcon: <StarIcon />,
    title: "For Every Property",
    subTitle: "Who Use Eazotel",
    description:
      "The platform that powers hospitality businesses of all sizes.",
    cards: [
      {
        title: "Hotel Groups",
        description: "Centralized lead management across multiple properties.",
        image: "/landing-page/who-use-1.png",
      },
      {
        title: "Resorts",
        description:
          "Manage high-volume inquiries and seasonal campaigns effortlessly.",
        image: "/landing-page/who-use-2.png",
      },
      {
        title: "Boutique Hotels",
        description: "Personalized guest experiences with smart CRM workflows.",
        image: "/landing-page/who-use-3.png",
      },
    ],
  },

  testimonialSection2: {
    titleIcon: <TestimonialIcon />,
    title: "Testimonials",
    subTitle: "What Our Customers Say",
    description:
      "Hotels across India use Eazotel to build better websites, increase direct bookings, and reduce OTA dependency.",
    testimonials: data,
    cta: {
      label: "Book a Free Consultation Call",
      href: contacts.WhatsAppCta,
    },
  },
  ctaData: {
    title: "Stop Losing Enquiries.<br />Start Converting Them.",
    description:
      "See how Eazotel can increase your direct bookings. Book a free demo today.",
    cta: {
      label: "Book a Demo",
      href: "",
    },
  },
  businessPartnersData: {
    title: "Our <span>Business</span> Partners",
    cards: [
      {
        imgSrc: "/partners/google-partner.png",
        title: "google-partner",
      },
      // {
      //   imgSrc: "/trello.png",
      //   title: "trello",
      // },
      {
        imgSrc: "/partners/meta-business-partner.png",
        title: "meta-business-partner",
      },
      {
        imgSrc: "/partners/zoho-corporation.png",
        title: "zoho-corporation",
      },
      {
        imgSrc: "/partners/aws.png",
        title: "aws",
      },
      {
        imgSrc: "/partners/Booking.Com.png",
        title: "Booking.Com",
      },
      {
        imgSrc: "/partners/razorpay.png",
        title: "razorpay",
      },
      // {
      //   imgSrc: "/slack.webp",
      //   title: "slack",
      // },
      {
        imgSrc: "/partners/agoda-logo.png",
        title: "agoda-logo",
      },
      {
        imgSrc: "/partners/airbnb-logo.png",
        title: "airbnb-logo",
      },
      {
        imgSrc: "/partners/goibibo-logo.png",
        title: "goibibo-logo",
      },
      {
        imgSrc: "/partners/makemytrip-logo.png",
        title: "makemytrip-logo",
      },
      {
        imgSrc: "/partners/cleartrip-logo.png",
        title: "cleartrip-logo",
      },
    ],
  },
};
