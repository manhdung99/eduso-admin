import { defineStore } from "pinia";

export const useManagementStore = defineStore("managamentStore", {
  state: () => ({
    orders: [],
    authors: [],
  }),
  getters: {},
  actions: {
    getOrders(data) {
      this.orders = data;
    },
    getAuthors(data) {
      this.authors = data;
    },
  },
});
