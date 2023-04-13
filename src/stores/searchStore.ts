import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    books: [],
    authors: [],
    openSearchArea: false,
  }),
  getters: {},
  actions: {
    getBooks(data) {
      this.books = data;
    },
    getAuthors(data) {
      this.authors = data;
    },
    updateSearchAreaStatus(status) {
      this.openSearchArea = status;
    },
  },
});
