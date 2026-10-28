import type { AssessmentContext, AssessmentState, StoreSlice } from "../types";

export const initialAssessment: AssessmentContext = { name: "", email: "" };

export const createAssessmentSlice: StoreSlice<AssessmentState> = (set) => ({
  assessment: {
    context: initialAssessment,
    actions: {
      setName: (name) =>
        set((state) => ({
          assessment: {
            ...state.assessment,
            context: { ...state.assessment.context, name },
          },
        })),
      setEmail: (email) =>
        set((state) => ({
          assessment: {
            ...state.assessment,
            context: { ...state.assessment.context, email },
          },
        })),
      flush: () =>
        set((state) => ({
          assessment: { ...state.assessment, context: initialAssessment },
        })),
    },
  },
});
