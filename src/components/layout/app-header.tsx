"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/constants/routes";
import { IconArrowLeft, IconRefresh, ImgLogo } from "@/common/lib/asset";
import { useAssessmentActions } from "@/common/stores/hooks/useAssessment";

const iconButton =
  "flex size-[46px] cursor-pointer items-center justify-center rounded-full bg-glass shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-[60px] transition-colors duration-200 hover:bg-white/10";

interface AppHeaderProps {
  onBack?: () => void;
}

export default function AppHeader({ onBack }: AppHeaderProps) {
  const router = useRouter();
  const { flush } = useAssessmentActions();

  const startOver = () => {
    flush();
    router.push(ROUTES.home);
  };

  return (
    <header className="flex items-center justify-between p-module-x">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className={iconButton}
        >
          <Image src={IconArrowLeft} alt="" width={20} height={20} />
        </button>
      ) : (
        <span className="size-[46px]" aria-hidden />
      )}
      <Image src={ImgLogo} alt="Juicebox" width={123} height={29} priority />
      <button
        type="button"
        onClick={startOver}
        aria-label="Start over"
        className={iconButton}
      >
        <Image src={IconRefresh} alt="" width={20} height={20} />
      </button>
    </header>
  );
}
