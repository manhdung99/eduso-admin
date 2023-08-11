import { defineStore } from "pinia";
import axios from "axios";
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
export const useCommonStore = defineStore("commonStore", {
  state: () => ({
    programs: [],
    subjects: [],
    hiddenSidebar: false,
    selectedKeys: ["quanlykhosach"],
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    toDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
  }),
  getters: {},
  actions: {
    getPrograms() {
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_PROGRAM;
      axios.get(url).then((response) => {
        this.programs = response.data.Data;
      });
    },
    getSubjects() {
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_SUBJECT;
      axios.get(url).then((response) => {
        this.subjects = response.data.Data;
      });
    },
    updateFromDate(data) {
      this.fromDate = data;
    },
    updateToDate(data) {
      this.toDate = data;
    },
    updateSelectKey(key) {
      this.selectedKeys = key;
    },
  },
});
