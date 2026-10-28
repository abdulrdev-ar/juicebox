"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/common/constants/routes";
import {
  useAssessment,
  useAssessmentActions,
  useAssessmentHydrated,
} from "@/common/stores/hooks/useAssessment";
import AppHeader from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";

const LottieHexagon = dynamic(
  () => import("@/components/lottie/lottie-hexagon"),
  { ssr: false, loading: () => <div className="size-8" /> }
);

const message =
  "text-center font-heading text-question leading-[1.2] tracking-[0.19px]";

export default function ResultSummary() {
  const router = useRouter();
  const hydrated = useAssessmentHydrated();
  const { name, email } = useAssessment();
  const { flush } = useAssessmentActions();

  const startOver = () => {
    flush();
    router.push(ROUTES.home);
  };

  return (
    <>
      <AppHeader onBack={() => router.push(ROUTES.form)} />
      <main aria-busy={!hydrated} className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-6 px-module-x py-module-y-sm">
          <LottieHexagon size={32} />

          {!hydrated ? null : name ? (
            <>
              <div className={message}>
                <h1 className="mb-[30px]">
                  Thanks, {name}! Now, it’s time to get a reality check.
                </h1>
                <p>This will take 2-3 minutes.</p>
              </div>

              <dl className="w-full max-w-[350px] divide-y divide-white/10 rounded-input border border-white/10 text-body leading-[1.35] tracking-[0.32px]">
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-dim">First name</dt>
                  <dd className="text-right break-all">{name}</dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3">
                  <dt className="text-dim">Email</dt>
                  <dd className="text-right break-all">{email}</dd>
                </div>
              </dl>
            </>
          ) : (
            <h1 className={message}>
              I don’t have your answers yet. Start with your first name.
            </h1>
          )}
        </section>

        {hydrated && (
          <div className="mt-auto px-module-x py-module-y-sm">
            {name ? (
              <Button variant="light" onClick={startOver}>
                Continue
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={ROUTES.form}>Type in your name</Link>
              </Button>
            )}
          </div>
        )}
      </main>
    </>
  );
}
