"use client";

import { useGSAP } from "@gsap/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { ROUTES } from "@/common/constants/routes";
import { ImgHexagon } from "@/common/lib/asset";
import {
  useAssessment,
  useAssessmentActions,
  useAssessmentHydrated,
} from "@/common/stores/hooks/useAssessment";
import TextInput from "@/components/input/text-input";
import AppHeader from "@/components/layout/app-header";

import { type AssessmentFormValues, assessmentSchema } from "./schema";

const STEPS = [
  {
    field: "name",
    question: "Let’s start with the basics. Type in your first name.",
    placeholder: "First name",
    type: "text",
    autoComplete: "given-name",
    submitLabel: "Continue to email",
  },
  {
    field: "email",
    question: "How should we contact you? Type in your email address.",
    placeholder: "Email address",
    type: "email",
    autoComplete: "email",
    submitLabel: "See your result",
  },
] as const;

gsap.registerPlugin(useGSAP);

export default function MultistepForm() {
  const router = useRouter();
  const root = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const saved = useAssessment();
  const hydrated = useAssessmentHydrated();
  const { setName, setEmail } = useAssessmentActions();

  const {
    control,
    register,
    trigger,
    getValues,
    setFocus,
    formState: { errors },
  } = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: { name: "", email: "" },
    values: hydrated ? saved : undefined,
    resetOptions: { keepDirtyValues: true },
  });

  const current = STEPS[step];
  const inputId = `field-${current.field}`;
  const value = useWatch({ control, name: current.field });

  useEffect(() => setFocus(current.field), [current.field, setFocus]);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-question]", {
          opacity: 0,
          y: 12,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    },
    { scope: root, dependencies: [step] }
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!(await trigger(current.field))) return setFocus(current.field);

    const answer = getValues(current.field).trim();
    if (current.field === "name") {
      setName(answer);
      setStep(1);
    } else {
      setEmail(answer);
      router.push(ROUTES.result);
    }
  };

  const goBack = () =>
    step > 0 ? setStep(step - 1) : router.push(ROUTES.walkthrough);

  return (
    <>
      <AppHeader onBack={goBack} />
      <form
        ref={root}
        noValidate
        onSubmit={onSubmit}
        className="flex flex-1 flex-col"
      >
        <div
          data-question
          className="flex flex-col items-center gap-8 px-module-x py-module-y-sm"
        >
          <Image
            src={ImgHexagon}
            alt=""
            width={29}
            height={31}
            className="rotate-180"
          />
          <label
            htmlFor={inputId}
            className="text-center font-heading text-question leading-[1.2] tracking-[0.19px]"
          >
            {current.question}
          </label>
        </div>

        <TextInput
          key={current.field}
          id={inputId}
          type={current.type}
          placeholder={current.placeholder}
          autoComplete={current.autoComplete}
          enterKeyHint={step === STEPS.length - 1 ? "send" : "next"}
          submitLabel={current.submitLabel}
          hasValue={Boolean(value)}
          error={errors[current.field]?.message}
          className="mt-auto px-module-x py-module-y-sm"
          {...register(current.field)}
        />
      </form>
    </>
  );
}
