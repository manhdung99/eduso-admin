import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
export const useEPStore = defineStore("EPStore", {
  state: () => ({
    transitions: [],
  }),
  actions: {
    getTransitions() {
      const userStore = useUserStore();
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_LIST_EP_TRANSACTION;
      axios
        .get(url, {
          headers: {
            Authorization: userStore.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.transitions = response.data.Data;
            // const page = response.data.Pages;
            // panigation.getPagination(
            //   page.Total % page.PageSize == 0
            //     ? page.Total / page.PageSize
            //     : Math.floor(page.Total / page.PageSize) + 1
            // );
          } else {
            this.transitions = [];
          }
        });
    },
  },
});
