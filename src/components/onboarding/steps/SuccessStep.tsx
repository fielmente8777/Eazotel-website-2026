"use client";

import { dashboardLink } from "@/store/api/eazotelApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, persistToken } from "@/store/slices/authSlice";
import { resetOnboarding } from "@/store/slices/onboardingSlice";
import { FiArrowUpRight, FiCalendar, FiCheck, FiGlobe, FiGrid } from "react-icons/fi";

const SuccessStep = () => {
  const dispatch = useAppDispatch();
  const { websiteLink, engineLink, form } = useAppSelector((s) => s.onboarding);
  const token = useAppSelector((s) => s.auth.token);

  const links = [
    {
      title: "Your website",
      description: "Live, mobile-ready and SEO friendly.",
      href: websiteLink,
      icon: <FiGlobe />,
    },
    {
      title: "Booking engine",
      description: "Take commission-free direct bookings.",
      href: engineLink,
      icon: <FiCalendar />,
    },
    {
      title: "Dashboard",
      description: "Edit content, rooms, rates & more.",
      href: token ? dashboardLink(token) : null,
      icon: <FiGrid />,
    },
  ].filter((l): l is typeof l & { href: string } => !!l.href);

  const startOver = () => {
    persistToken(null);
    dispatch(logout());
    dispatch(resetOnboarding());
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#9EFF8E]/20" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#9EFF8E] to-[#3fbf6a] text-3xl text-[#020208] shadow-[0_0_60px_-10px_rgba(158,255,142,0.7)]">
          <FiCheck strokeWidth={3} />
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-primary text-2xl font-semibold md:text-3xl">
          {form.hotelName ? `${form.hotelName} is live!` : "You're live!"}
        </h2>
        <p className="mx-auto max-w-md text-white/60">
          Your website and booking engine are ready. Open the dashboard to add
          rooms, photos and rates.
        </p>
      </div>

      <div className="grid w-full gap-3">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-color-4/50 hover:bg-color-4/10"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-color-4/15 text-xl text-color-4 transition-colors group-hover:bg-color-4 group-hover:text-white">
              {link.icon}
            </span>
            <span className="flex-1">
              <span className="block font-medium text-white">{link.title}</span>
              <span className="block text-sm text-white/55">{link.description}</span>
            </span>
            <FiArrowUpRight className="text-xl text-white/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </a>
        ))}
      </div>

      {token && (
        <a
          href={dashboardLink(token)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:shadow-[0_10px_40px_-8px_rgba(249,115,22,0.7)] active:scale-[0.98]"
        >
          Go to my dashboard <FiArrowUpRight />
        </a>
      )}

      <button
        type="button"
        onClick={startOver}
        className="text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        Sign out and create another account
      </button>
    </div>
  );
};

export default SuccessStep;
