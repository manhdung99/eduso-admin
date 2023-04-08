import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    books: [],
    authors: [],
  }),
  getters: {},
  actions: {
    getBooks(data) {
      this.books = data;
    },
    getAuthors(data) {
      this.authors = data;
    },
  },
});
