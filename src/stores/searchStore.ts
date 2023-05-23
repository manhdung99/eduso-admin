import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    books: [],
    authors: [],
    openSearchArea: false,
    searchText: "",
  }),
  getters: {},
  actions: {
    getSearchtBooks(data) {
      console.log(data);
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
