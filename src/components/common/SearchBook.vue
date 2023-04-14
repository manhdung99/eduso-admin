<template>
  <div
    @click.self="updateSearchAreaStatus(false)"
    class="flex py-6 justify-between flex-wrap"
  >
    <div class="w-auto md:w-9/20 relative mb-6 md:mb-0">
      <input
        @input="searchData"
        class="input search-input"
        placeholder="Tìm kiếm (tên sản phẩm, mã...)"
        v-model="searchText"
      />
      <span class="absolute right-4 top-1/2 -translate-y-1/2">
        <img :src="searchIcon" alt="" />
      </span>
      <searchBookModalVue />
    </div>
    <div class="w-full md:w-11/20 flex items-center">
      <div class="flex items-center">
        <div
          class="text-base 2xl:text-lg text-charcoal font-medium mx-2 2xl:px-3"
        >
          From:
        </div>
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
      <div class="flex items-center">
        <div
          class="text-base 2xl:text-lg text-charcoal font-medium mx-2 2xl:px-3"
        >
          To:
        </div>
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
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import searchBookModalVue from "../modal/searchBookModal.vue";
import searchIcon from "../../assets/image/search.svg";
import { useSearchStore } from "../../stores/searchStore";
import axios from "axios";
import debounce from "lodash/debounce";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "SearchBook",
  setup() {
    const fromDate = ref("2023-01-01");
    const toDate = ref("2023-04-04");
    const searchStore = useSearchStore();
    const { getBooks, getAuthors, updateSearchAreaStatus } = searchStore;
    const searchText = ref("");
    const { dateFormater } = convertData();
    const searchData = debounce(() => {
      if (searchText.value.length > 0) {
        updateSearchAreaStatus(true);
        const fetchBooks = async () => {
          try {
            const response = await axios.get(
              "https://642e3a278ca0fe3352cb2e35.mockapi.io/books"
            );
            getBooks(response.data);
          } catch (err) {
            throw new Error("Some thing went wrong");
          }
        };
        fetchBooks();
        const authors = [
          {
            id: 1,
            name: "Bộ Giáo dục & Đào tạo",
          },
          {
            id: 2,
            name: "Bộ Giáo dục & Đào tạo",
          },
          {
            id: 3,
            name: "Bộ Giáo dục & Đào tạo",
          },
          {
            id: 4,
            name: "Bộ Giáo dục & Đào tạo",
          },
          {
            id: 5,
            name: "Bộ Giáo dục & Đào tạo",
          },
          {
            id: 5,
            name: "Bộ Giáo dục & Đào tạo",
          },
          {
            id: 5,
            name: "Bộ Giáo dục & Đào tạo",
          },
        ];
        getAuthors(authors);
      } else {
        getBooks([]);
        getAuthors([]);
      }
    }, 1000);

    return {
      fromDate,
      toDate,
      searchIcon,
      searchData,
      searchText,
      dateFormater,
      updateSearchAreaStatus,
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
  components: {
    searchBookModalVue,
  },
});
</script>
<style scoped>
.search-input {
  width: 100%;
  max-width: 393px;
  padding-bottom: 14px;
  padding-top: 14px;
}
@media screen and (max-width: 767px) {
  .search-input {
    width: 300px;
  }
}
</style>
