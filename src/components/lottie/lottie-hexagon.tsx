"use client";

import { gsap } from "gsap";
import lottie from "lottie-web/build/player/lottie_light";
import { useEffect, useRef } from "react";

import { LottieHexagonData } from "@/common/lib/asset";

interface LottieHexagonProps {
  size: number;
}

export default function LottieHexagon({ size }: LottieHexagonProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: LottieHexagonData,
    });

    let tween: gsap.core.Tween | undefined;
    const play = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animation.goToAndStop(0, true);
        return;
      }
      const playhead = { frame: 0 };
      tween = gsap.to(playhead, {
        frame: animation.totalFrames - 1,
        duration: animation.totalFrames / animation.frameRate,
        ease: "none",
        repeat: -1,
        onUpdate: () => animation.goToAndStop(playhead.frame, true),
      });
    };

    if (animation.isLoaded) play();
    else animation.addEventListener("DOMLoaded", play);

    return () => {
      tween?.kill();
      animation.destroy();
    };
  }, []);

  return (
    <div
      ref={container}
      className="shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}
