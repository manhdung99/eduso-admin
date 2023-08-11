import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import axios from "axios";
export const useUserEPStore = defineStore("userEPStore", {
  state: () => ({
    listEPUser: [],
    userTransactions: [],
  }),
  actions: {
    getListUserEP() {
      const userStore = useUserStore();
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LIST_USER_EP;
      axios
        .get(url, {
          headers: {
            Authorization: userStore.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.listEPUser = response.data.Data;
          } else {
            this.listEPUser = [];
          }
        });
    },
    getDetailUserTransitions(id) {
      const userStore = useUserStore();
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_HISTORY_USER_EP_TRANSACTIONS +
        id;
      axios
        .get(url, {
          headers: {
            Authorization: userStore.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.userTransactions = response.data.Data;
          } else {
            this.userTransactions = [];
          }
        });
    },
  },
});
