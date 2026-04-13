import { Container, SectionWithContainer } from "@/components/sectionComponants";
import Image from "next/image";
import Link from "next/link";
import { blogsData } from "./blogData";

export default function Blogs() {
  return (
    <main className="bg-[#020208] ">
      <SectionWithContainer containerClassName="text-center">
        <p className="text-white font-semibold md:text-lg">EXPLORE OUR BLOGS</p>
        <h1 className="text-2xl md:text-4xl/[2.8rem] text-white font-bold">
          Tailored Expert Advice from Eazotel
        </h1>
      </SectionWithContainer>
      {/* cards */}
      <section className="pb-16">
        <Container className="max-w-5xl! w-full md:grid-cols-2 grid-cols-1 grid lg:gap-x-9 lg:gap-y-8 gap-6">
          {blogsData.map((item, index) => (
            <Link
              href={`/blogs/${item.slug}`}
              key={index}
              className="flex flex-col gap-3 rounded-md overflow-hidden bg-background-black-1"
            >
              <div className="relative w-full aspect-[4/2.5]">
                <Image
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  fill
                  className="w-full h-full absolute inset-0 object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 text-white px-3 py-4">
                <h3 className=" font-semibold">
                  {item.title.slice(0, 50)} ...
                </h3>
                <p className="">
                  {item.description.slice(0, 83)} ...Read More
                </p>
              </div>
            </Link>
          ))}
        </Container>
      </section>
    </main>
  );
}
