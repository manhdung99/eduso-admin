<template>
  <table class="w-full unit-management-table">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th class="text-lg text-charcoal font-medium text-center">Email</th>
        <th class="text-lg text-charcoal font-medium text-center">Tên</th>
        <th class="text-lg text-charcoal font-medium text-center">
          Loại người dùng
        </th>
        <th class="text-lg text-charcoal font-medium text-center">###</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter"
        v-for="user in users"
        :key="user.id"
      >
        <td class="text-lg text-center">{{ user.Email }}</td>
        <td class="text-lg text-center">
          {{ user.Name }}
        </td>
        <td class="text-center">
          <span class="text-lg"> {{ user.RoleID }}</span>
        </td>
        <td>
          <div class="flex gap-x-4 lg:gap-x-8 justify-center">
            <span
              @click="
                setUserDetail(user.ID);
                updateAccessUserModalStatus(true);
              "
              :class="user.IsActive ? 'icon-eye' : 'icon-hide'"
              class="text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
            <span
              @click="
                setUserDetail(user.ID);
                updateUserModalStatus(true);
              "
              class="icon-edit text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
            <span
              @click="
                setUserDetail(user.ID);
                updateRemoveUserModalStatus(user.ID);
              "
              class="icon-remove text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <deleteUserModal />
  <updateUserModal />
  <accessUserModal />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useUserStore } from "../../stores/userStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import convertData from "@/uses/convertData";
import deleteUserModal from "../modal/deleteUserModal.vue";
import updateUserModal from "../modal/updateUserModal.vue";
import accessUserModal from "../modal/accessUserModal.vue";
export default defineComponent({
  name: "NguoiDungTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    const { setUserDetail, deleteUser } = userStore;
    const {
      updateUserModalStatus,
      updateRemoveUserModalStatus,
      updateAccessUserModalStatus,
    } = modal;
    const { convertTimestampToDate, convertPrice } = convertData();
    return {
      hideIcon,
      removeIcon,
      editIcon,
      users,
      convertTimestampToDate,
      convertPrice,
      updateUserModalStatus,
      setUserDetail,
      deleteUser,
      updateRemoveUserModalStatus,
      updateAccessUserModalStatus,
    };
  },
  components: {
    deleteUserModal,
    updateUserModal,
    accessUserModal,
  },
});
</script>
