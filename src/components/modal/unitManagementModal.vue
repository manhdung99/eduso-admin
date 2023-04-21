<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openUnitManagementModal"
  >
    <div class="management-modal">
      <div class="flex border-b border-gray-lighter pb-4 relative">
        <h3 class="text-xl font-bold text-blue-lighter w-4/5">
          Thống kê doanh thu theo đầu sách của
        </h3>
        <span
          @click="updateUnitManagementStatus(false)"
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
              <th class="w-1/6">Mã sách</th>
              <th class="w-1/3">Tên sách</th>
              <th class="w-1/3">Số lượng</th>
              <th class="w-1/6">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="unit in units"
              :key="unit.id"
              class="border-b border-grey-lighter text-lg text-charcoal"
            >
              <td>{{ unit.id }}</td>
              <td>{{ unit.name }}</td>
              <td class="text-center">{{ unit.number }}</td>
              <td>{{ convertPrice(unit.totalPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-6">
        <button @click="updateUnitManagementStatus(false)" class="back-button">
          Quay lại
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modalStore";
import closeIcon from "../../assets/image/close.svg";
import convertData from "../../uses/convertData";

export default defineComponent({
  name: "unitManagementModal",
  setup() {
    const modal = useModalStore();
    const { openUnitManagementModal, currentBookDetail } = storeToRefs(modal);
    const { updateUnitManagementStatus } = modal;
    const fromDate = ref("2023-01-01");
    const toDate = ref("2023-04-04");
    const units = ref([]);
    const { convertPrice, dateFormater } = convertData();
    watchEffect(() => {
      //Get data here
      const data = [
        [],
        [
          {
            id: 1,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
          {
            id: 2,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
          {
            id: 3,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
          {
            id: 4,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
        ],
        [
          {
            id: 6,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
          {
            id: 7,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
          {
            id: 8,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
          {
            id: 9,
            name: "Sách Ngữ Văn 12",
            number: 5,
            totalPrice: 1000000,
          },
        ],
      ];
      units.value = data[currentBookDetail.value];
    });

    return {
      openUnitManagementModal,
      updateUnitManagementStatus,
      closeIcon,
      fromDate,
      toDate,
      units,
      convertPrice,
      dateFormater,
    };
  },
});
</script>
<style scoped>
.input {
  height: 44px;
}
</style>
