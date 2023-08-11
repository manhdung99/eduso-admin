import { defineStore } from "pinia";

import axios from "axios";
export const useUserStore = defineStore("usersStore", {
  state: () => ({
    users: [],
    permisstions: [],
    Access_Token: "",
    userDetail: null,
    accountAccess: [],
    accountName: "",
    accountRole: "",
  }),
  actions: {
    setAccessToken(token) {
      this.Access_Token = token;
    },
    getListUser() {
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_USER_LIST;

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
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_PERMISSIONS;
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
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_GET_DETAIL_USER +
        `${id}`;
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
      const url =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_DELETE_USER +
        `${id}`;
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
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_UPDATE_USER_STATUS;
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
    getUserPermission() {
      const url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GET_USER_PERMISSION;
      axios
        .get(url, {
          headers: {
            Authorization: this.Access_Token,
          },
        })
        .then((response) => {
          const permissions = response.data.Data.listPermission
            ? response.data.Data.listPermission
            : [];
          this.accountName = response.data.Data.name;
          this.accountRole = response.data.Data.role;
          if (permissions.length > 0) {
            permissions.forEach((permission) => {
              if (!this.accountAccess.includes(permission.CtrlName)) {
                this.accountAccess = [
                  ...this.accountAccess,
                  permission.CtrlName,
                ];
              }
            });
          }
        });
    },
  },
});
