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
        <td class="text-lg text-center">{{ user.userEmail }}</td>
        <td class="text-lg text-center">
          {{ user.userName }}
        </td>
        <td class="text-center">
          <span class="text-lg"> {{ user.userType }}</span>
        </td>
        <td>
          <div class="flex gap-x-4 lg:gap-x-8 justify-center">
            <span
              :class="user.IsPublish ? 'icon-eye' : 'icon-hide'"
              class="text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
            <span
              class="icon-edit text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../../stores/userStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "NguoiDungTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    const { convertTimestampToDate, convertPrice } = convertData();
    return {
      hideIcon,
      removeIcon,
      editIcon,
      users,
      convertTimestampToDate,
      convertPrice,
    };
  },
});
</script>
