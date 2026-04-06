import { ClientsDataTypes } from "@/@types/@homeType";
import { CtaBtn } from "@/components/buttons/CtaBtn";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";
import Image from "next/image";

const Clients: React.FC<ClientsDataTypes> = ({ title, clients, cta }) => {
  return (
    <SectionWithContainer containerClassName="space-y-8">
      <div className="grid grid-cols-6">
        <div className="grid grid-cols-6 col-span-6 divide-x border-x border-b divide-main-border border-main-border">
          {clients.slice(0, 6).map((client, index) => (
            <div key={index} className="col-span-1 w-full aspect-4/2 relative">
              <Image
                src={client}
                alt="client"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 col-span-2 divide-x border-x border-b divide-main-border border-main-border">
          {clients.slice(6, 8).map((client, index) => (
            <div key={index} className="col-span-1 w-full aspect-4/2 relative">
              <Image
                src={client}
                alt="client"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="col-span-2 row-span-2 flex flex-col py-6 items-center justify-between">
          <SectionHeading
            subTitle={title}
            subLevel={2}
            textCenter
            wrapperClassName="max-w-sm mx-auto"
            subTitleClassName="span-color-3 max-md:text-[10px]"
          />
          <CtaBtn
            type="link"
            label={cta.label}
            href={cta.href}
            target="_blank"
            icon="arrow2"
            iconClass="bg-transparent! text-white max-md:hidden"
            className="bg-black mx-auto text-white max-md:text-xs w-fit! max-md:px-3 max-md:py-1  rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 col-span-2 divide-x border-x border-b divide-main-border border-main-border">
          {clients.slice(8, 10).map((client, index) => (
            <div key={index} className="col-span-1 w-full aspect-4/2 relative">
              <Image
                src={client}
                alt="client"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 col-span-2 divide-x border-x divide-main-border border-main-border">
          {clients.slice(10, 12).map((client, index) => (
            <div key={index} className="col-span-1 w-full aspect-4/2 relative">
              <Image
                src={client}
                alt="client"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 col-span-2 divide-x border-x divide-main-border border-main-border">
          {clients.slice(12, 14).map((client, index) => (
            <div key={index} className="col-span-1 w-full aspect-4/2 relative">
              <Image
                src={client}
                alt="client"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 col-span-6 divide-x border-x border-t divide-main-border border-main-border">
          {clients.slice(14).map((client, index) => (
            <div key={index} className="col-span-1 w-full aspect-4/2 relative">
              <Image
                src={client}
                alt="client"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Clients;
