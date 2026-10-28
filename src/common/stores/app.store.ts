import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createAssessmentSlice } from "./slice/assessment.slice";
import type { AppState, AssessmentContext } from "./types";

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAssessmentSlice(...a),
      }),
      {
        name: "juicebox-assessment",
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
          assessment: { context: state.assessment.context },
        }),
        merge: (persisted, current) => {
          const saved = persisted as
            | { assessment?: { context?: AssessmentContext } }
            | undefined;

          return {
            ...current,
            assessment: {
              ...current.assessment,
              context: {
                ...current.assessment.context,
                ...saved?.assessment?.context,
              },
            },
          };
        },
      }
    ),
    { enabled: process.env.NODE_ENV === "development" }
  )
);
