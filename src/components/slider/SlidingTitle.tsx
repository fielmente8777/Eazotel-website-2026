"use client";

export default function SlidingTitle({ titles }: { titles: string[] }) {
  titles = [...titles, ...titles];

  return (
    <div className={`relative overflow-hidden py-3 max_screen_width bg-[#1D1D1D]`}>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {titles.map((t, i) => (
            <span key={i} className="marquee-item text-white font-semibold text-lg">
              <span>{t}</span>
              <span className="separator w-2 aspect-square bg-tertiary"></span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
