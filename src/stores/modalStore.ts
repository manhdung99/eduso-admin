import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({ openAddNewModal: false, openUpdateBookModal: false }),
  getters: {},
  actions: {
    updateAddNewModalStatus(status: boolean) {
      this.openAddNewModal = status;
    },
    updateBookModalStatus(status: boolean) {
      this.openUpdateBookModal = status;
    },
  },
});
