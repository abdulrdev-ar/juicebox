import type { Metadata } from "next";

import Screen from "@/components/layout/screen";

import MultistepForm from "./components/multistep-form";

export const metadata: Metadata = {
  title: "About you | Juicebox",
};

export default function FormPage() {
  return (
    <Screen>
      <MultistepForm />
    </Screen>
  );
}
