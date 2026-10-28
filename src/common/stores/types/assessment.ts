export interface AssessmentContext {
  name: string;
  email: string;
}

export interface AssessmentAction {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  flush: () => void;
}

export interface AssessmentState {
  assessment: {
    context: AssessmentContext;
    actions: AssessmentAction;
  };
}
