import { ClientsDataTypes } from "@/@types/@homeType";
import { SectionWithContainer } from "@/components/sectionComponants";
import ClientsSlider from "@/components/slider/ClientsSlider";
import { SectionHeading } from "@/components/typography";

const Clients: React.FC<ClientsDataTypes> = ({ title, clients }) => {
  return (
    <SectionWithContainer containerClassName="space-y-8">
      <SectionHeading
        subTitle={title}
        subLevel={2}
        textCenter
        subTitleClassName="md:text-[26px] span-color-3"
      />
      <ClientsSlider cards={clients} lgSlidePerView={6} />
    </SectionWithContainer>
  );
};

export default Clients;
