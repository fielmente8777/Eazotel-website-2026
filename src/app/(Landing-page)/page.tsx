import Automation from "./components/Automation";
import Banner from "./components/Banner";
import Clients from "./components/Clients";
import Features from "./components/Features";
import HowItWork from "./components/HowItWork";
import { landingPageData } from "./components/landingPageData";
import Modules from "./components/Modules";
import ProblemSection from "./components/ProblemSection";
import Results from "./components/Results";
import WhyEazotel from "./components/WhyEazotel";

export default function LandingPage() {
  return (
    <main>
      <Banner {...landingPageData.bannerData} />
      <Clients {...landingPageData.trustedData} />
      <ProblemSection {...landingPageData.problemSection} />
      <Features {...landingPageData.featuresSection} />
      <Modules {...landingPageData.modulesSection} />
      <WhyEazotel {...landingPageData.whySection} />
      <Automation {...landingPageData.automationSection} />
      <Results {...landingPageData.resultsSection} />
      <HowItWork {...landingPageData.howItWorks} />
    </main>
  );
}
