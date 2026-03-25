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
import { BoxIcon, ProblemSection, StartIcon } from "@/utils/titleIcons";
import { contacts } from "../../../../contact";

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
      { type: btnType, target: "_blank", label: "Get a Free Demo", href: contacts.WhatsAppCta },
      { type: btnType, target: "_blank", label: "See How It Works", href: contacts.WhatsAppCta },
    ],
  },

  trustedData: {
    title: "Trusted by <span>120+ hotels</span> worldwide",
    clients: ClientImages,
  },

  problemSection: {
    titleIcon: <ProblemSection />,
    title: "Problem Section",
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
      },
      {
        title: "WhatsApp enquiries go to another",
        description:
          "Guest messages sit unread on personal phones without tracking.",
        icon: <WhatsAppEnquiryIcon />,
      },
      {
        title: "Website chats are missed",
        description:
          "Live chat enquiries disappear when staff are offline or busy.",
        icon: <WebsiteChatsIcon />,
      },
      {
        title: "Staff forget to follow up",
        description:
          "Without reminders, hot leads go cold and bookings are lost.",
        icon: <StaffForgetIcon />,
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
        title: "Instagram & Messenger",
        description:
          "Track DMs and comments from social channels automatically.",
        image: "/landing-page/feature-3.png",
      },
      {
        title: "Website Live Chat",
        description: "Never miss a guest enquiry with real time website chat.",
        image: "/landing-page/feature-4.png",
      },
      {
        title: "Direct Website Forms",
        description:
          "Capture form submissions and route them to your sales team.",
        image: "/landing-page/feature-5.png",
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
    titleIcon: <StartIcon />,
    title: "Why Eazotel",
    subTitle: "Why Hotels Choose <span>Eazotel</span>",
    description: [
      "A unified platform built exclusively for hospitality teams to capture and convert more guests.",
    ],
    images: ["/landing-page/why-section.png", "/landing-page/Safari-bnr.png"],
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
    titleIcon: <BoxIcon />,
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
    titleIcon: <StartIcon />,
    title: "Results",
    subTitle: "Turn Enquiries Into Revenue",
    description: [
      "Hotels using Eazotel see measurable improvements across every key metric.",
    ],
    stats: [
      {
        value: "2×",

        label: "Faster Response Time",
      },
      {
        value: "35%",

        label: "Higher Lead Conversion",
      },
      {
        value: "40%",

        label: "More Direct Bookings",
      },
      {
        value: "1",

        label: "Unified Dashboard",
      },
    ],
    images: [
      "/landing-page/result-1.png",
      "/landing-page/result-2.png",
      "/landing-page/result-3.png",
      "/landing-page/result-4.png",
      "/landing-page/result-5.png",
    ],
  },

  howItWorks: {
    titleIcon: <BoxIcon />,
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
          { title: "Ayush S", src: "/landing-page/54.png", number: "54", leadType: "New lead" },
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
};
