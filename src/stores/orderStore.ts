import axios from "axios";
import { defineStore } from "pinia";
import { BASE_URL, GET_DETAIL_ORDER } from "../constants";
export const useOrderStore = defineStore("ordersStore", {
  state: () => ({
    orders: [],
  }),
  actions: {
    getOrders(data) {
      this.orders = data;
    },
  },
});
