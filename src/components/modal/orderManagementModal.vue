<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openOrderManagementModal"
  >
    <div class="management-modal">
      <div class="flex border-b border-gray-lighter pb-4 relative">
        <h3 class="text-base md:text-xl font-bold text-blue-lighter w-4/5">
          Thống kê doanh thu theo từng đơn hàng
        </h3>
        <span
          @click="updateOrderManagementStatus(false)"
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
                v-model="startDate"
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
                v-model="endDate"
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
      <div v-if="orderDetail.length > 0" class="overflow-x-auto">
        <table class="w-full mt-8">
          <thead class="table-head-wrapper">
            <tr class="w-full text-lg text-charcoal font-medium">
              <th class="">Đơn hàng</th>
              <th class="">Số lượng</th>
              <th class="">Giá</th>
              <th class="">Trường</th>
              <th class="">Tỉnh</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orderDetail"
              :key="order.id"
              class="border-b border-grey-lighter text-lg text-charcoal"
            >
              <td>{{ order.ID }}</td>
              <td>{{ order.NumberProduct }}</td>
              <td>{{ convertPrice(order.Amount) }}</td>
              <td>{{ order.school ? order.school : "" }}</td>
              <td>{{ order.province ? order.province : "" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-4 text-lg text-red-700 font-semibold text-center" v-else>
        Chưa có đơn hàng nào
      </div>
      <div class="flex justify-end mt-6">
        <button @click="updateOrderManagementStatus(false)" class="back-button">
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
import { useOrderStore } from "@/stores/ordersStore";
import { useCommonStore } from "../../stores/commonStore";
import closeIcon from "../../assets/image/close.svg";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "OrderManagementModal",
  setup() {
    const modal = useModalStore();
    const orderStore = useOrderStore();
    const { openOrderManagementModal } = storeToRefs(modal);
    const { orderDetail } = storeToRefs(orderStore);
    const { fromDate, toDate } = storeToRefs(useCommonStore());
    const { updateOrderManagementStatus } = modal;
    const orders = ref([]);
    const { convertPrice, dateFormater } = convertData();

    const startDate = dateFormater(fromDate.value);

    const endDate = dateFormater(toDate.value);

    return {
      openOrderManagementModal,
      updateOrderManagementStatus,
      closeIcon,
      endDate,
      startDate,
      orders,
      convertPrice,
      dateFormater,
      orderDetail,
    };
  },
});
</script>
<style>
.input {
  height: 44px;
}
</style>
