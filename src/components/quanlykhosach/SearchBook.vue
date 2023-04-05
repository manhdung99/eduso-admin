<template>
  <div class="flex justify-between py-6">
    <div class="w-2/5 relative">
      <input
        class="input search-input"
        placeholder="Tìm kiếm (tên sản phẩm, mã...)"
      />
      <span class="absolute right-4 top-1/2 -translate-y-1/2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.6021 13.8213C9.55574 16.2612 5.09649 16.0692 2.27252 13.2452C-0.757505 10.2152 -0.757505 5.30254 2.27252 2.27252C5.30254 -0.757505 10.2152 -0.757505 13.2452 2.27252C16.0692 5.09649 16.2612 9.55573 13.8213 12.6021L19.7475 18.5283C20.0842 18.865 20.0842 19.4108 19.7475 19.7475C19.4108 20.0842 18.865 20.0842 18.5283 19.7475L12.6021 13.8213ZM3.4917 12.026C1.13502 9.66932 1.13502 5.84839 3.4917 3.4917C5.84838 1.13502 9.66932 1.13502 12.026 3.4917C14.381 5.84666 14.3827 9.66371 12.0312 12.0208C12.0295 12.0225 12.0277 12.0242 12.026 12.026C12.0243 12.0277 12.0225 12.0294 12.0208 12.0312C9.66372 14.3827 5.84666 14.381 3.4917 12.026Z"
            fill="#8799A5"
          />
        </svg>
      </span>
    </div>
    <div class="w-3/5 flex items-center">
      <div class="w-1/2 flex flex items-center">
        <div class="text-xl text-charcoal font-medium mx-5">From:</div>
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
      <div class="w-1/2 flex flex items-center">
        <div class="text-xl text-charcoal font-medium mx-5">To:</div>
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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SearchBook",
  setup() {
    const fromDate = ref("2023-01-01");
    const toDate = ref("2023-04-04");
    return {
      fromDate,
      toDate,
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
    dateFormater(date: Date) {
      let day: string | number =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let month: string | number =
        date.getMonth() < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let year: string | number = date.getFullYear();
      return year + "-" + month + "-" + day;
    },
  },
});
</script>
<style scoped>
.help-button {
  color: #355d73;
  border: 2px solid #355d73;
  display: flex;
  padding: 0 28px;
  border-radius: 5px;
  align-items: center;
  font-size: 18px;
}
.add-new-button {
  color: white;
  background: #26a433;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 32px;
}
.search-input {
  width: 100%;
  max-width: 393px;
  padding-bottom: 14px;
  padding-top: 14px;
}
</style>
