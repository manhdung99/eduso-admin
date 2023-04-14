import { defineStore } from "pinia";

export const usePaginationStore = defineStore("paginationStore", {
  state: () => ({
    paginations: [],
    pageIndex: 1,
  }),
  getters: {},
  actions: {
    getPagination(pageNumber: number) {
      const myArray = Array.from({ length: pageNumber }, (_, i) => i + 1);
      this.paginations = myArray;
    },
    updatePageIndex(data) {
      this.pageIndex = data;
    },
    getAuthors(data) {
      this.authors = data;
    },
  },
});
