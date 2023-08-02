import { defineStore } from "pinia";
export const useEPStore = defineStore("EPStore", {
  state: () => ({
    transitions: [],
  }),
  actions: {
    getTransitions(data) {
      this.transitions = data;
    },
  },
});
