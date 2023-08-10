import axios from "axios";
import { defineStore } from "pinia";
import { BASE_URL, GET_DETAIL_ORDER } from "../constants";
import { useUserStore } from "./userStore";
export const useOrderStore = defineStore("ordersStore", {
  state: () => ({
    bookOrders: [],
    bookOrderDetail: [],
  }),
  getters: {},
  actions: {
    getBookOrders(data) {
      this.bookOrders = data;
    },
    setBookOrderDetail(id) {
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      const url = BASE_URL + GET_DETAIL_ORDER + `?id=${id}`;
      axios
        .get(url, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.bookOrderDetail = response.data.Data;
          } else {
            this.bookOrderDetail = [];
          }
        });
    },
  },
});
