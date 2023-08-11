import axios from "axios";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { usePaginationStore } from "./commonStore";
export const useOrderStore = defineStore("ordersStore", {
  state: () => ({
    bookOrders: [],
    bookOrderDetail: [],
  }),
  getters: {},
  actions: {
    getBookOrders() {
      const userStore = useUserStore();
      const panigation = usePaginationStore();
      const url = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_ORDERS;
      axios
        .get(url, {
          headers: {
            Authorization: userStore.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.bookOrders = response.data.Data;
            const page = response.data.Pages;
            panigation.getPagination(
              page.Total % page.PageSize == 0
                ? page.Total / page.PageSize
                : Math.floor(page.Total / page.PageSize) + 1
            );
          } else {
            this.bookOrders = [];
          }
        });
    },
    setBookOrderDetail(id) {
      const userStore = useUserStore();
      const token = userStore.Access_Token;
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_DETAIL_ORDER +
        `?id=${id}`;
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
