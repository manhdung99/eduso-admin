import { defineStore } from "pinia";

export const useKhoSachStore = defineStore("khoSachStore", {
  state: () => ({
    books: [],
    columns: [],
  }),
  getters: {},
  actions: {
    getBooks(data) {
      this.books = data;
    },
    getColumn(data) {
      this.columns = data;
    },
    deleteBook(id) {
      this.books = this.books.filter((book) => book.bookId != id);
    },
  },
});
