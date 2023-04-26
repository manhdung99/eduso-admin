import { defineStore } from "pinia";

export const useBookStore = defineStore("booksStore", {
  state: () => ({
    books: [],
    units: [],
    khoSachColumns: [],
    doanhThuSachColumns: [],
    doanhThuDonViColumns: [],
  }),
  getters: {},
  actions: {
    getBooks(data) {
      this.books = data;
    },
    getKhoSachColumn(data) {
      this.khoSachColumns = data;
    },
    getDoanhThuDonViColumn(data) {
      this.doanhThuDonViColumns = data;
    },
    getDoanhThuSachColumn(data) {
      this.doanhThuSachColumns = data;
    },
    deleteBook(id) {
      this.books = this.books.filter((book) => book.bookId != id);
    },
    addBook(book) {
      this.books = [book, ...this.books];
    },
    updateBook(book) {
      const index = this.books.findIndex((data) => data.bookId == book.bookId);
      this.books[index] = book;
    },
    getUnits(data) {
      this.units = data;
    },
    updateIsSaleBook(id, status) {
      const index = this.books.findIndex((data) => data.bookId == id);
      this.books[index].isSale = status;
    },
  },
});
