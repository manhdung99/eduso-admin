import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    openAddNewModal: false,
    openUpdateBookModal: false,
    openRemoveBookModal: false,
    currentBookUpdate: 1,
    currentBookDelete: 1,
  }),
  getters: {},
  actions: {
    updateAddNewModalStatus(status: boolean) {
      this.openAddNewModal = status;
    },
    updateBookModalStatus(status: boolean, id = 1) {
      this.openUpdateBookModal = status;
      this.currentBookUpdate = id;
    },
    updateRemoveModalStatus(status: boolean) {
      this.openRemoveBookModal = status;
    },
  },
});
