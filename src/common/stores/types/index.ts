import type { StateCreator } from "zustand";

import type { AssessmentState } from "./assessment";

export * from "./assessment";

export type AppState = AssessmentState;

export type StoreSlice<T> = StateCreator<AppState, [], [], T>;
