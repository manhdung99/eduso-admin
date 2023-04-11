import { defineStore } from "pinia";

export const usePaginationStore = defineStore("paginationStore", {
  state: () => ({
    paginations: [1, 2, 3, 4, 5],
    pageIndex: 1,
  }),
  getters: {},
  actions: {
    getPagination(data) {
      this.paginations = data;
    },
    updatePageIndex(data) {
      this.pageIndex = data;
    },
    getAuthors(data) {
      this.authors = data;
    },
  },
});
