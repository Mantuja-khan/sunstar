import { useEffect, useState } from "react";
// import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import mobile1 from "@/assets/mobile1.png";
import mobile2 from "@/assets/mobile2.png";
// import mobile3 from "@/assets/mobile3.png";

const slides = [hero2, hero3];
const mobileSlides = [mobile1, mobile2];
export default function Hero() {
  const [idx, setIdx] = useState(0);
  
  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-background">
      <div className="relative h-[550px] w-full overflow-hidden sm:h-[360px] md:h-[460px] lg:h-[520px]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {slides.map((src, i) => (
            <picture key={i} className="h-full w-full flex-shrink-0">
              <source media="(max-width: 767px)" srcSet={mobileSlides[i]} />
              <img
                src={src}
                alt={`Sun Start Packers slide ${i + 1}`}
                className="h-full w-full object-cover translate-y-0 sm:translate-y-0"
              />
            </picture>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          aria-label="Previous slide"
          onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-primary-dark/60 px-3 py-2 text-white hover:bg-primary-dark"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={() => setIdx((i) => (i + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary-dark/60 px-3 py-2 text-white hover:bg-primary-dark"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2.5 bg-white/70"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
