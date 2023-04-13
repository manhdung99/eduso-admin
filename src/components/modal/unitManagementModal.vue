<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openUnitManagementModal"
  >
    <div class="management-book-modal">
      <div class="flex border-b border-gray-lighter pb-4 relative">
        <h3 class="text-xl font-bold text-blue-lighter">
          Thống kê doanh thu theo đầu sách của
        </h3>
        <span
          @click="updateUnitManagementStatus(false)"
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
              <input class="input text-base" type="date" v-model="fromDate" />
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
              <input class="input text-base" type="date" v-model="toDate" />
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
            <td>{{ unit.number }}</td>
            <td>{{ convertPrice(unit.totalPrice) }}</td>
          </tr>
        </tbody>
      </table>
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
th {
  height: 60px;
  text-align: left;
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
