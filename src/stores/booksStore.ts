import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
export const useBookStore = defineStore("booksStore", {
  state: () => ({
    books: [],
    units: [],
    khoSachColumns: [],
    doanhThuSachColumns: [],
    doanhThuDonViColumns: [],
    bookDetail: null,
    libraryBooks: [],
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
      this.books = this.books.filter((book) => book.iD != id);
    },
    addBook(book) {
      console.log(book);
      this.books = [book, ...this.books];
    },
    updateBook(book) {
      console.log(book);

      const index = this.books.findIndex((data) => data.BookID == book.BookID);
      this.books[index] = book;
    },
    getUnits(data) {
      this.units = data;
    },
    updateIsSaleBook(id, status) {
      const index = this.books.findIndex((data) => data.BookID == id);
      this.books[index].IsPublish = status;
    },
    setBookDetail(id) {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_DETAIL_BOOK +
        `?id=${id}`;
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.bookDetail = response.data.Data.Book;
        });
    },
    setBookFromLibrary(id) {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_DETAIL_BOOK +
        `?id=${id}`;
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.bookDetail = response.data.Data.Origin;
        });
    },
    getLibraryBooks(page) {
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_LIBRARY +
        `?pageIndex=${page}`;
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.libraryBooks = [...this.libraryBooks, ...response.data.Data];
        });
    },
    filterLibraryBook(text) {
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_LIBRARY +
        `?text=${text}`;
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.libraryBooks = response.data.Data;
        });
    },
    removeLibraryBookAdded(id) {
      console.log(this.libraryBooks);
      this.libraryBooks = this.libraryBooks.filter((item) => item.BookID != id);
    },
    getRegionsBook() {
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_REGIONS;
      return axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.Code === 200) {
            const data = response.data.Data;
            return data;
          } else {
            return []; // Or handle error case accordingly
          }
        })
        .catch((error) => {
          // Handle any error that occurs during the request
          console.error(error);
          return []; // Or handle error case accordingly
        });
    },
  },
});
