<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openEPManagementModal"
  >
    <div class="management-modal ep-modal">
      <div class="flex border-b border-gray-lighter pb-4 relative">
        <h3 class="text-xl font-bold text-blue-lighter w-4/5">
          Thống kê lịch sử sử dụng điểm
        </h3>
        <span
          @click="updateEPManagementStatus(false)"
          class="absolute right-0 cursor-pointer"
          ><img :src="closeIcon" alt="icon"
        /></span>
      </div>
      <!-- Date and export excel file  -->
      <div class="flex mt-6 justify-between flex-wrap md:flex-nowrap">
        <div class="flex">
          <div class="flex items-center">
            <div class="text-xl text-charcoal font-medium mr-3">From:</div>
            <div class="relative">
              <input
                class="input text-base"
                type="date"
                v-model="fromDate"
                lang="en-US"
              />
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-xl text-charcoal font-medium mx-3">To:</div>
            <div class="relative">
              <input
                class="input text-base"
                type="date"
                v-model="toDate"
                lang="en-US"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center w-full mt-4 md:mt-0 md:justify-end">
          <button class="export-excel-btn hover:opacity-90">Xuất Excel</button>
        </div>
      </div>
      <!-- Table  -->
      <div class="overflow-x-auto">
        <table class="w-full mt-8">
          <thead class="table-head-wrapper">
            <tr class="w-full text-lg text-charcoal font-medium">
              <th class="w-1/6">Mã đơn hàng</th>
              <th class="w-1/3 text-center">Chi tiết đơn hàng</th>
              <th class="w-1/3 text-center">Thời gian mua hàng</th>
              <th class="w-1/6 text-center">Giá trị điểm</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in userTransactions"
              :key="transaction.id"
              class="border-b border-grey-lighter text-lg text-charcoal"
            >
              <td class="pr-2">{{ transaction.ID }}</td>
              <td class="pr-2">{{ transaction.Details[0].Product }}</td>
              <td class="text-center pr-2">
                {{ convertTimestampToDate(transaction.CreateDate) }}
              </td>
              <td class="pr-2">{{ transaction.Amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-6">
        <button @click="updateEPManagementStatus(false)" class="back-button">
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modalStore";
import { useUserEPStore } from "@/stores/userEPStore";
import closeIcon from "../../assets/image/close.svg";
import convertData from "../../uses/convertData";

export default defineComponent({
  name: "EPManagementModal",
  setup() {
    const modal = useModalStore();
    const { openEPManagementModal } = storeToRefs(modal);
    const { userTransactions } = storeToRefs(useUserEPStore());
    const { updateEPManagementStatus } = modal;
    const fromDate = ref("2023-01-01");
    const toDate = ref("2023-04-04");
    const { convertPrice, dateFormater, convertTimestampToDate } =
      convertData();

    return {
      openEPManagementModal,
      updateEPManagementStatus,
      closeIcon,
      fromDate,
      toDate,
      convertPrice,
      dateFormater,
      convertTimestampToDate,
      userTransactions,
    };
  },
});
</script>
<style scoped>
.input {
  height: 44px;
}
</style>
<style>
.management-modal.ep-modal th {
  text-align: center;
}
</style>
