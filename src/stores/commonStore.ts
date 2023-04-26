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
export const useCommonStore = defineStore("commonStore", {
  state: () => ({
    grades: [],
    subjects: [],
    fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    toDate: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
  }),
  getters: {},
  actions: {
    getGrades(data) {
      this.grades = data;
    },
    getSubjects(data) {
      this.subjects = data;
    },
    updateFromDate(data) {
      this.fromDate = data;
    },
    updateToDate(data) {
      this.toDate = data;
    },
  },
});
