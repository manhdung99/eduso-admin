<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openBookManagementModal"
  >
    <div class="management-book-modal">
      <div class="flex border-b border-gray-lighter pb-4 relative">
        <h3 class="text-xl font-bold text-blue-lighter">
          Thống kê doanh thu theo từng đơn hàng
        </h3>
        <span
          @click="updateBookManagementStatus(false)"
          class="absolute right-0 cursor-pointer"
          ><img :src="closeIcon" alt="icon"
        /></span>
      </div>
      <!-- Date and export excel file  -->
      <div class="flex mt-6 justify-between">
        <div class="flex">
          <div class="flex flex items-center">
            <div class="text-xl text-charcoal font-medium mr-3">From:</div>
            <div class="relative">
              <input
                class="input text-base"
                type="date"
                v-model="fromDate"
                lang="en-US"
              />
              <div
                class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
              >
                <span
                  @click="changeFromDate(1)"
                  class="triangle_up active:border-b-black"
                ></span>
                <span
                  @click="changeFromDate(-1)"
                  class="triangle_down active:border-t-black"
                ></span>
              </div>
            </div>
          </div>
          <div class="flex flex items-center">
            <div class="text-xl text-charcoal font-medium mx-3">To:</div>
            <div class="relative">
              <input
                class="input text-base"
                type="date"
                v-model="toDate"
                lang="en-US"
              />
              <div
                class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
              >
                <span
                  @click="changeToDate(1)"
                  class="triangle_up active:border-b-black"
                ></span>
                <span
                  @click="changeToDate(-1)"
                  class="triangle_down active:border-t-black"
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button class="export-excel-btn hover:opacity-90">Xuất Excel</button>
        </div>
      </div>
      <!-- Table  -->
      <table class="w-full mt-8">
        <thead class="table-head-wrapper">
          <tr class="w-full text-lg text-charcoal font-medium">
            <th class="w-1/5">Đơn hàng</th>
            <th class="w-1/5">Số lượng</th>
            <th class="w-1/5">Giá</th>
            <th class="w-1/5">Trường</th>
            <th class="w-1/5">Tỉnh</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-grey-lighter text-lg text-charcoal"
          >
            <td>{{ order.id }}</td>
            <td>{{ order.number }}</td>
            <td>{{ convertPrice(order.price) }}</td>
            <td>{{ order.school }}</td>
            <td>{{ order.province }}</td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-end mt-6">
        <button @click="updateBookManagementStatus(false)" class="back-button">
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
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "bookManagementModal",
  setup() {
    const modal = useModalStore();
    const { openBookManagementModal, currentBookDetail } = storeToRefs(modal);
    const { updateBookManagementStatus } = modal;
    const fromDate = ref("2023-01-01");
    const toDate = ref("2023-04-04");
    const orders = ref([]);
    const { convertPrice, dateFormater } = convertData();
    watchEffect(() => {
      //Get data here
      const data = [
        [],
        [
          {
            id: 1,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 2,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 3,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 4,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 5,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
        ],
        [
          {
            id: 6,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 7,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 8,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 9,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
          {
            id: 10,
            number: 5,
            price: 700000,
            school: "Trường THPT A",
            province: "Hà Nội",
          },
        ],
      ];
      orders.value = data[currentBookDetail.value];
    });

    return {
      openBookManagementModal,
      updateBookManagementStatus,
      closeIcon,
      fromDate,
      toDate,
      orders,
      convertPrice,
      dateFormater,
    };
  },
  methods: {
    changeFromDate(activeDays: number) {
      let newDate = new Date(this.fromDate);
      newDate.setDate(newDate.getDate() + activeDays);
      this.fromDate = this.dateFormater(newDate);
    },
    changeToDate(activeDays: number) {
      let newDate = new Date(this.toDate);
      newDate.setDate(newDate.getDate() + activeDays);
      this.toDate = this.dateFormater(newDate);
    },
  },
});
</script>
<style scoped>
.management-book-modal {
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  min-width: 1000px;
  max-width: 1000px;
}
.export-excel-btn {
  color: white;
  background: #26a433;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 32px;
}
.table-head-wrapper {
  background: #f9f9f9;
  padding: 22px 30px;
}
th {
  height: 60px;
  text-align: left;
}
thead th:first-child {
  padding-left: 16px;
}
tbody tr td:first-child {
  padding-left: 16px;
}
td {
  height: 80px;
}
.back-button {
  background: #c1272c;
  color: white;
  font-size: 16px;
  padding: 8px 20px;
  border-radius: 5px;
}
.back-button:hover {
  opacity: 0.8;
}
.input {
  height: 44px;
}
</style>
