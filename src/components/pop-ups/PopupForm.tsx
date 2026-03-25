"use client";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import { AppContext } from "@/contextApi/AppContext";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";

const PopupForm = () => {
  const { isOpenPopupForm, setIsOpenPopupForm } = useContext(AppContext);
  const pathName = usePathname();
  const [hasShown, setHasShown] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpenPopupForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenPopupForm]);

  useEffect(() => {
    // Only show if not already shown and modal isn't open
    if (!hasShown && !isOpenPopupForm) {
      timerRef.current = setTimeout(() => {
        setIsOpenPopupForm(true);
        setHasShown(true);
        document.body.style.overflow = "hidden";
      }, 40000); // Show after 40 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isOpenPopupForm, hasShown, setIsOpenPopupForm]);

  const closeModal = useCallback(() => {
    setIsOpenPopupForm(false);
    document.body.style.overflow = "auto";

    // Clear any pending timer when modal is closed
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [setIsOpenPopupForm]);

  if (pathName === "/thank-you/") {
    return null;
  }

  return (
    <>
      <section
        className={`fixed inset-0 z-99999 bg-black/50 duration-700 ease-in-out transition-all ${isOpenPopupForm ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"}`}
        onClick={closeModal}
      >
        <article
          className={`flex justify-center items-center h-full max-md:px-4`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex max-w-3xl w-full shadow-2xl relative rounded-lg overflow-hidden bg-white">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 w-8 h-8 flex justify-center items-center text-lg rounded-full text-secondary bg-white z-10 transition-all duration-300"
              aria-label="Close popup"
            >
              <MdClose />
            </button>
            <div className="relative w-full md:aspect-4/4 max-md:hidden">
              <Image
                src={"/popup2.jpg"}
                alt="Hospitality Marketing"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default PopupForm;
