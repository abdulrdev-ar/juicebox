"use client";

import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { ROUTES } from "@/common/constants/routes";
import { ImgOrb } from "@/common/lib/asset";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";

const SLIDES = [
  "Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn.",
  "I’ll ask you a handful of meaningful questions and compare your responses with people in your industry.",
  "You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
];

gsap.registerPlugin(useGSAP);

export default function WalkthroughSlider() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance>();
  const [active, setActive] = useState(0);
  const isLast = active === SLIDES.length - 1;

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(`[data-slide="${active}"] [data-word]`, {
          opacity: 1,
          duration: 0.3,
          stagger: 0.06,
          ease: "power1.out",
          delay: 0.2,
        });
      });
    },
    { scope: root, dependencies: [active] }
  );

  const goBack = () =>
    active > 0 ? swiper?.slidePrev() : router.push(ROUTES.home);

  return (
    <div ref={root} className="flex flex-1 flex-col">
      <AppHeader onBack={goBack} />

      <main className="flex flex-1 flex-col items-center">
        <section
          aria-roledescription="carousel"
          aria-label="How it works"
          className="flex w-full flex-col items-center gap-module-y py-module-y"
        >
          <Image
            src={ImgOrb}
            alt=""
            width={146}
            height={155}
            className="rotate-180"
            priority
          />
          <Swiper
            modules={[A11y]}
            onSwiper={setSwiper}
            onSlideChange={(s) => setActive(s.activeIndex)}
            className="w-full"
          >
            {SLIDES.map((text, index) => (
              <SwiperSlide
                key={text}
                data-slide={index}
                className="px-module-x"
              >
                <p className="mx-auto min-h-[150px] max-w-[350px] text-center font-heading text-h4 leading-[1.25] tracking-[0.22px]">
                  <span className="sr-only">{text}</span>
                  <span aria-hidden>
                    {text.split(" ").map((word, i) => (
                      <span
                        key={i}
                        data-word
                        className="[.js_&]:motion-safe:opacity-50"
                      >
                        {word}{" "}
                      </span>
                    ))}
                  </span>
                </p>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <div aria-hidden className="flex gap-2">
          {SLIDES.map((text, index) => (
            <span
              key={text}
              className={cn(
                "size-2 rounded-full transition-colors duration-300",
                index === active ? "bg-(--brand-dot-active)" : "bg-white/25"
              )}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Step {active + 1} of {SLIDES.length}
        </p>

        <div className="mt-auto w-full px-module-x py-module-y-sm">
          {isLast ? (
            <Button variant="light" asChild>
              <Link href={ROUTES.form}>Get started</Link>
            </Button>
          ) : (
            <Button variant="outline" onClick={() => swiper?.slideNext()}>
              Continue
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
