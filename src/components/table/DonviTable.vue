<template>
  <table class="w-full unit-management-table">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th
          class="text-lg text-charcoal font-medium text-center"
          v-for="column in doanhThuDonViColumns"
          :key="column.id"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter"
        v-for="unit in units"
        :key="unit.id"
      >
        <td class="text-lg text-center">{{ unit.name }}</td>
        <td class="text-lg text-center">
          {{ convertPrice(unit.revenue) }}
        </td>
        <td class="text-center">
          <span class="text-lg">{{ unit.numberDownload }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{
            convertTimestampToDate(unit.startDate)
          }}</span>
        </td>
        <td class="overflow-hidden">
          <button
            @click="updateUnitManagementStatus(true, unit.id)"
            class="show-detail-button"
          >
            Chi tiết
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <unitManagementModalVue />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import unitManagementModalVue from "../modal/unitManagementModal.vue";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "UnitTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const {
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateUnitManagementStatus,
    } = modal;
    const { units, doanhThuDonViColumns } = storeToRefs(bookStore);

    // const sortBooks = (data: string) => {
    //   if (data) {
    //     units.value.sort((a, b) => {
    //       return a[data] - b[data] || a[data].localeCompare(b[data]);
    //     });
    //   }
    // };
    const { convertTimestampToDate, convertPrice } = convertData();
    return {
      hideIcon,
      removeIcon,
      editIcon,
      units,
      doanhThuDonViColumns,
      // sortBooks,
      updateBookModalStatus,
      updateRemoveModalStatus,
      convertTimestampToDate,
      updateUnitManagementStatus,
      convertPrice,
    };
  },
  components: {
    unitManagementModalVue,
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
