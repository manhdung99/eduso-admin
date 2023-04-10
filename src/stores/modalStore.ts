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
    updateBookModalStatus(status: boolean, id = 1) {
      this.openUpdateBookModal = status;
      this.currentBookUpdate = id;
    },
    updateRemoveModalStatus(status: boolean) {
      this.openRemoveBookModal = status;
    },
    updateBookManagementStatus(status: boolean, id = 1) {
      this.openBookManagementModal = status;
      this.currentBookDetail = id;
    },
    updateUnitManagementStatus(status: boolean, id = 1) {
      this.openUnitManagementModal = status;
      this.currentUnitDetail = id;
    },
    updateLogoutModalStatus(status: boolean) {
      this.openLogoutModal = status;
    },
  },
});
