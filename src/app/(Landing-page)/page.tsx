import CtaSection from "@/components/common-section/CtaSection";
import ScrollHandler from "@/components/ScrollHandler";
import Automation from "./components/Automation";
import Banner from "./components/Banner";
import BusinessPartners from "./components/BusinessPartners";
import Clients from "./components/Clients";
import Features from "./components/Features";
import HowItWork from "./components/HowItWork";
import { landingPageData } from "./components/landingPageData";
import Modules from "./components/Modules";
import MoreStories from "./components/MoreStories";
import ProblemSection from "./components/ProblemSection";
import Results from "./components/Results";
import WhoUseEazotel from "./components/WhoUseEazotel";
import WhyEazotel from "./components/WhyEazotel";

export default function LandingPage() {
  return (
    <main>
      <ScrollHandler />
      <Banner {...landingPageData.bannerData} />
      <Clients {...landingPageData.trustedData} />
      <ProblemSection {...landingPageData.problemSection} />
      <Features {...landingPageData.featuresSection} />
      <Modules {...landingPageData.modulesSection} />
      <WhyEazotel {...landingPageData.whySection} />
      <Automation {...landingPageData.automationSection} />
      <Results {...landingPageData.resultsSection} />
      <HowItWork {...landingPageData.howItWorks} />
      <WhoUseEazotel {...landingPageData.whoUseEazotel} />
      <MoreStories {...landingPageData.testimonialSection2} />
      <CtaSection {...landingPageData.ctaData} />
      <BusinessPartners {...landingPageData.businessPartnersData} />
    </main>
  );
}
