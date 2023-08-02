import { defineStore } from "pinia";
export const useUserStore = defineStore("usersStore", {
  state: () => ({
    users: [],
  }),
  actions: {
    getUser(data) {
      this.users = data;
    },
  },
});
