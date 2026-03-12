import { create } from "zustand";

const useEvaluationStore = create((set) => ({
  evaluation: null,

  setSelectedEvaluation: (evaluation) => set({ evaluation })
}));

export default useEvaluationStore;