/* eslint-disable @next/next/no-img-element */

/**
 * Official Google Partners HTML badge supplied by the Google Ads manager.
 * Keep the image, destination, and aspect ratio unmodified.
 */
export default function GooglePartnerBadge() {
  return (
    <div className="flex justify-center bg-[#0A0A0C] px-8 pb-8 pt-2">
      <a
        href="https://www.google.com/partners/agency?id=7707754365"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Eazotel's Google Partner profile"
        className="inline-flex items-center justify-center p-7"
      >
        <img
          src="https://www.gstatic.com/partners/badge/images/2026/PartnerBadgeClickable.svg"
          alt="Google Partner"
          width="160"
          loading="lazy"
          style={{ height: "auto", maxWidth: "100%" }}
        />
      </a>
    </div>
  );
}
