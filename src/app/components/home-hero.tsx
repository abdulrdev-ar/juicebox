"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";

import { ROUTES } from "@/common/constants/routes";
import { Button } from "@/components/ui/button";

const LottieHexagon = dynamic(
  () => import("@/components/lottie/lottie-hexagon"),
  { ssr: false }
);

const OPINIONS = [
  {
    text: "WA businesses feel confident about future growth",
    position: "left-5 top-[45px] max-w-[292px]",
  },
  { text: "AI cant replace creativity", position: "right-[29px] top-[86px]" },
  { text: "Sales measure true success", position: "left-5 top-[147px]" },
  {
    text: "Human connection drives WA business",
    position: "right-[31px] top-[211px]",
  },
  {
    text: "The primary barrier to digital transformation is financial investment",
    position: "left-[21px] top-[274px] max-w-[236px]",
  },
];

gsap.registerPlugin(useGSAP);

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .fromTo(
            "[data-orb]",
            { opacity: 0, scale: 0.92 },
            { opacity: 1, scale: 1, duration: 0.8 }
          )
          .fromTo(
            "[data-opinion]",
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
            "-=0.4"
          )
          .fromTo(
            "[data-intro]",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.3"
          )
          .to("[data-opinion]", {
            y: 4,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            stagger: { each: 0.4, from: "random" },
          });
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} className="flex flex-1 flex-col">
      <section
        aria-label="Industry opinions"
        className="relative flex justify-center py-7"
      >
        <div
          data-orb
          data-reveal
          className="flex h-[290px] w-[274px] items-center justify-center"
        >
          <LottieHexagon size={297} />
        </div>
        <ul>
          {OPINIONS.map(({ text, position }) => (
            <li
              key={text}
              data-opinion
              data-reveal
              className={`absolute text-caption leading-[1.35] tracking-[0.24px] ${position}`}
            >
              {text}
            </li>
          ))}
        </ul>
      </section>

      <h1
        data-intro
        data-reveal
        className="relative mx-auto -mt-[21px] max-w-[386px] px-module-x pt-module-y-sm pb-5 text-center font-heading text-h2 leading-[1.2] tracking-[0.28px]"
      >
        Compare your thoughts on{" "}
        <span className="bg-(image:--brand-gradient) bg-clip-text text-transparent">
          technology
        </span>{" "}
        with current industry opinions.
      </h1>

      <div
        data-intro
        data-reveal
        className="mt-auto px-module-x py-module-y-sm"
      >
        <Button asChild>
          <Link href={ROUTES.walkthrough}>Get a reality check</Link>
        </Button>
      </div>
    </main>
  );
}
