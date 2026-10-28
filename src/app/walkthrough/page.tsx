import type { Metadata } from "next";

import Screen from "@/components/layout/screen";

import WalkthroughSlider from "./components/walkthrough-slider";

export const metadata: Metadata = {
  title: "How it works | Juicebox",
};

export default function WalkthroughPage() {
  return (
    <Screen glow="center">
      <WalkthroughSlider />
    </Screen>
  );
}
