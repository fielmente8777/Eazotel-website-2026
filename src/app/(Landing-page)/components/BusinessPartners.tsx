import { BusinessPartnersDataTypes } from "@/@types/@homeType";
import { SectionWithContainer } from "@/components/sectionComponants";
import BusinessPartnersSlider from "@/components/slider/BusinessPartnersSlider";

const BusinessPartners: React.FC<BusinessPartnersDataTypes> = ({
  title,
  cards,
}) => {
  return (
    <SectionWithContainer containerClassName="grid lg:grid-cols-5 items-center lg:gap-10">
      <h2
        className="md:text-2xl text-xl font-semibold text-primary lg:col-span-1 span-color-2"
        dangerouslySetInnerHTML={{ __html: title || "" }}
      />
      <BusinessPartnersSlider cards={cards} wrapperClassName="lg:col-span-4" />
    </SectionWithContainer>
  );
};

export default BusinessPartners;
