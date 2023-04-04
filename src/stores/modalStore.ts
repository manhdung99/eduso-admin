import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({ openAddNewModal: true }),
  getters: {},
  actions: {
    updateAddNewModalStatus(status: boolean) {
      this.openAddNewModal = status;
    },
  },
});
