"use client";
import { SectionWithContainer } from "@/components/sectionComponants";
import { useRouter } from "next/navigation";

export default function Notfound() {
  const router = useRouter();

  return (
    <main className="bg-[#020208] text-white">
      <SectionWithContainer>
        <div className="flex flex-col items-center text-center gap-6 px-4 py-16">
          <h1
            className="font-bold  leading-tight
                 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Ooops. <span className="text-orange-primary">Page Not Found!</span>
          </h1>

          <p
            className=" max-w-xl
                text-base sm:text-lg md:text-xl"
          >
            The page you are looking for does not exist.
          </p>

          <p
            className=" max-w-xl
                text-base sm:text-lg md:text-xl"
          >
            Looks like you are in the wrong place.
          </p>

          <p
            className=" max-w-xl
                text-base sm:text-lg md:text-xl"
          >
            Let us guide you back!
          </p>

          <button
            className="mt-4 px-6 py-3 bg-primary text-white 
               text-base sm:text-lg font-semibold 
               rounded-full transition-all duration-300  hover:scale-105"
            onClick={() => router.push("/")}
          >
            Go Back Home
          </button>
        </div>
      </SectionWithContainer>
    </main>
  );
}
