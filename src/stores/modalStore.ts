import { defineStore } from "pinia";

export const useModalStore = defineStore("modalStore", {
  state: () => ({
    openAddNewModal: false,
    openAddNewUserModal: false,
    openUpdateBookModal: false,
    openRemoveBookModal: false,
    openLibraryBookModal: false,
    openIsSaleBookModal: false,
    openOrderManagementModal: false,
    openUnitManagementModal: false,
    openEPManagementModal: false,
    openLogoutModal: false,
    currentBookDetail: 1,
    currentUnitDetail: 1,
    isLoading: false,
  }),
  getters: {},
  actions: {
    updateLibraryBookModal(status: boolean) {
      this.openLibraryBookModal = status;
    },
    updateAddNewModalStatus(status: boolean) {
      this.openAddNewModal = status;
    },
    updateAddNewUserModalStatus(status: boolean) {
      this.openAddNewUserModal = status;
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
    updateOrderManagementStatus(status: boolean) {
      this.openOrderManagementModal = status;
    },
    updateUnitManagementStatus(status: boolean, id = -1) {
      this.openUnitManagementModal = status;
      if (id > 0) this.currentUnitDetail = id;
    },
    updateEPManagementStatus(status: boolean) {
      this.openEPManagementModal = status;
    },
    updateLogoutModalStatus(status: boolean) {
      this.openLogoutModal = status;
    },
    updateLoadingStatus(status) {
      this.isLoading = status;
    },
  },
});
