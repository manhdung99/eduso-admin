<template>
  <table class="w-full unit-management-table">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th class="text-lg text-charcoal font-medium text-center">
          Mã giao dịch
        </th>
        <th class="text-lg text-charcoal font-medium text-center">Email</th>
        <th class="text-lg text-charcoal font-medium text-center">Thời gian</th>
        <th class="text-lg text-charcoal font-medium text-center">
          Loại giao dịch
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Giá trị nạp
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter"
        v-for="transition in transitions"
        :key="transition.id"
      >
        <td class="text-lg text-center">{{ transition.OrderID }}</td>
        <td class="text-lg text-center">
          {{ transition.Email }}
        </td>
        <td class="text-center">
          <span class="text-lg">{{
            convertTimestampToDate(transition.CreateDate)
          }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ transition.typeTransaction }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ transition.Amount }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useEPStore } from "../../stores/EPStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "EPTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const EPStore = useEPStore();
    const {
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateEPManagementStatus,
    } = modal;
    const { transitions } = storeToRefs(EPStore);
    const { convertTimestampToDate, convertPrice } = convertData();
    return {
      hideIcon,
      removeIcon,
      editIcon,
      transitions,
      updateBookModalStatus,
      updateRemoveModalStatus,
      convertTimestampToDate,
      updateEPManagementStatus,
      convertPrice,
    };
  },
});
</script>
<style>
.book-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
}
.book-image {
  max-width: 68px;
  min-width: 68px;
}
.show-detail-button {
  background: #3c9dd2;
  color: white;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 18px;
  margin-left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.show-detail-button:hover {
  opacity: 0.9;
}
</style>
