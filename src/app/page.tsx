import AppHeader from "@/components/layout/app-header";
import Screen from "@/components/layout/screen";

import HomeHero from "./components/home-hero";

export default function HomePage() {
  return (
    <Screen>
      <AppHeader />
      <HomeHero />
    </Screen>
  );
}
