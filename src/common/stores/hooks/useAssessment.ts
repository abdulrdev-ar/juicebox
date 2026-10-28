import { useSyncExternalStore } from "react";

import { useAppStore } from "../app.store";

export const useAssessment = () => useAppStore((s) => s.assessment.context);

export const useAssessmentActions = () =>
  useAppStore((s) => s.assessment.actions);

export const useAssessmentHydrated = () =>
  useSyncExternalStore(
    (onChange) => useAppStore.persist.onFinishHydration(onChange),
    () => useAppStore.persist.hasHydrated(),
    () => false
  );
