import { defineStore } from "pinia";
import {
  BASE_URL,
  GET_PERMISSIONS,
  GET_USER_LIST,
  GET_DETAIL_USER,
  DELETE_USER,
  UPDATE_USER_STATUS,
} from "../constants";

import axios from "axios";
export const useUserStore = defineStore("usersStore", {
  state: () => ({
    users: [],
    permisstions: [],
    Access_Token: "",
    userDetail: null,
  }),
  actions: {
    setAccessToken(token) {
      this.Access_Token = token;
    },
    getListUser() {
      const url = BASE_URL + GET_USER_LIST;

      axios
        .get(url, {
          headers: {
            Authorization: this.Access_Token,
          },
        })
        .then((response) => {
          this.users = response.data.Data;
        });
    },
    getPermissions() {
      const url = BASE_URL + GET_PERMISSIONS;
      axios
        .get(url, {
          headers: {
            Authorization: this.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.permisstions = response.data.Data.map((data) => {
              return { ...data, show: false };
            });
          }
        });
    },
    addUser(user) {
      this.users = [user, ...this.users];
    },
    setUserDetail(id) {
      const url = BASE_URL + GET_DETAIL_USER + `${id}`;
      axios
        .get(url, {
          headers: {
            Authorization: this.Access_Token,
          },
        })
        .then((response) => {
          this.userDetail = response.data.Data;
        });
    },
    deleteUser(id) {
      const url = BASE_URL + DELETE_USER + `${id}`;
      axios
        .delete(url, {
          headers: {
            Authorization: this.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            this.users = this.users.filter((user) => user.ID != id);
          }
        });
    },
    accessUser(id) {
      const url = BASE_URL + UPDATE_USER_STATUS;
      const formData = new FormData();
      formData.append("id", id);
      axios
        .put(url, formData, {
          headers: {
            Authorization: this.Access_Token,
          },
        })
        .then((response) => {
          if (response.data.Code == 200) {
            const index = this.users.findIndex((data) => data.ID == id);
            console.log(index);

            this.users[index].IsActive = response.data.Data.IsActive;
          }
        });
    },
  },
});
