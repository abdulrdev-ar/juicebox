import type { Metadata } from "next";

import Screen from "@/components/layout/screen";

import ResultSummary from "./components/result-summary";

export const metadata: Metadata = {
  title: "Your answers | Juicebox",
  robots: { index: false },
};

export default function ResultPage() {
  return (
    <Screen>
      <ResultSummary />
    </Screen>
  );
}
