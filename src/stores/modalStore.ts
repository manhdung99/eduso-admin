import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    openAddNewModal: false,
    openUpdateBookModal: false,
    openRemoveBookModal: false,
    openIsSaleBookModal: false,
    openBookManagementModal: false,
    openUnitManagementModal: false,
    openLogoutModal: false,
    currentBookDetail: 1,
    currentUnitDetail: 1,
    isLoading: false,
  }),
  getters: {},
  actions: {
    updateAddNewModalStatus(status: boolean) {
      this.openAddNewModal = status;
    },
    updateBookModalStatus(status: boolean) {
      this.openUpdateBookModal = status;
    },
    updateRemoveModalStatus(status: boolean) {
      this.openRemoveBookModal = status;
    },
    updateIsSaleBookModal(status: boolean) {
      this.openIsSaleBookModal = status;
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
    updateLoadingStatus(status) {
      this.isLoading = status;
    },
  },
});
