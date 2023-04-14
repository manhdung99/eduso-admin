import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    openAddNewModal: false,
    openUpdateBookModal: false,
    openRemoveBookModal: false,
    openBookManagementModal: false,
    openUnitManagementModal: false,
    openLogoutModal: false,
    currentBookUpdate: 1,
    currentBookDetail: 1,
    currentUnitDetail: 1,
    currentBookDelete: 1,
  }),
  getters: {},
  actions: {
    updateAddNewModalStatus(status: boolean) {
      this.openAddNewModal = status;
    },
    updateBookModalStatus(status: boolean, id = -1) {
      this.openUpdateBookModal = status;
      if (id > 0) this.currentBookUpdate = id;
    },
    updateRemoveModalStatus(status: boolean) {
      this.openRemoveBookModal = status;
    },
    updateBookManagementStatus(status: boolean, id = -1) {
      this.openBookManagementModal = status;
      if (id > 0) this.currentBookDetail = id;
    },
    updateUnitManagementStatus(status: boolean, id = -1) {
      this.openUnitManagementModal = status;
      if (id > 0) this.currentUnitDetail = id;
    },
    updateLogoutModalStatus(status: boolean) {
      this.openLogoutModal = status;
    },
    updateCurrentBook(id) {
      this.currentBookUpdate = id;
      this.currentBookDetail = id;
    },
  },
});
