import { defineStore } from "pinia";
export const useOrderStore = defineStore("ordersStore", {
  state: () => ({
    orders: [],
  }),
  actions: {
    getOrders(data) {
      this.orders = data ? data : [];
    },
  },
});
