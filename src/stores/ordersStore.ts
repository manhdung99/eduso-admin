import axios from "axios";
import { defineStore } from "pinia";
import { BASE_URL, GET_DETAIL_ORDER } from "../constants";
export const useOrderStore = defineStore("ordersStore", {
  state: () => ({
    orders: [],
    orderDetail: [],
  }),
  getters: {},
  actions: {
    getOrders(data) {
      this.orders = data;
    },
    setOrderDetail(id) {
      const url = BASE_URL + GET_DETAIL_ORDER + `?id=${id}`;
      axios.get(url).then((response) => {
        if (response.data.Code == 200) {
          this.orderDetail = response.data.Data;
        } else {
          this.orderDetail = [];
        }
      });
    },
  },
});
