<template>
  <div
    @click.self="updateSearchAreaStatus(false)"
    class="flex py-6 flex-wrap lg:flex-nowrap gap-y-5"
  >
    <div class="w-75 relative md:mb-0">
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
    <div class="w-90 flex items-center justify-between md:justify-start">
      <div class="flex items-center">
        <div
          class="text-base 2xl:text-lg text-charcoal font-medium mx-2 2xl:px-3"
        >
          From:
        </div>
        <div class="relative">
          <input
            class="input text-base 3xl:px-7"
            type="date"
            v-model="startDate"
            lang="en-US"
            @input="updateStartDate($event)"
          />
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
            class="input text-base 3xl:px-7"
            type="date"
            v-model="endDate"
            lang="en-US"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import searchBookModalVue from "../modal/searchBookModal.vue";
import searchIcon from "../../assets/image/search.svg";
import { useSearchStore } from "../../stores/searchStore";
import axios from "axios";
import debounce from "lodash/debounce";
import convertData from "@/uses/convertData";
import { useCommonStore } from "../../stores/commonStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "SearchBook",
  setup() {
    const { fromDate, toDate } = storeToRefs(useCommonStore());
    const searchStore = useSearchStore();
    const { getBooks, getAuthors, updateSearchAreaStatus } = searchStore;
    const { updateFromDate, updateToDate } = useCommonStore();
    const searchText = ref("");
    const { dateFormater } = convertData();
    const searchData = debounce(() => {
      if (searchText.value.length > 0) {
        updateSearchAreaStatus(true);
        const fetchBooks = async () => {
          try {
            const response = await axios.get(
              "https://642e3a278ca0fe3352cb2e35.mockapi.io/books/1"
            );
            getBooks(response.data.listBook);
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
    const startDate = dateFormater(fromDate.value);

    const endDate = dateFormater(toDate.value);

    const updateStartDate = (event) => {
      updateFromDate(new Date(event.target.value));
    };
    const updateEndDate = (event) => {
      updateToDate(new Date(event.target.value));
    };
    watch(
      () => fromDate.value,
      (newVal, oldVal) => {
        console.log(`Start date changed from ${oldVal} to ${newVal}`);
      }
    );
    watch(
      () => toDate.value,
      (newVal, oldVal) => {
        console.log(`End daete changed from ${oldVal} to ${newVal}`);
      }
    );
    return {
      fromDate,
      toDate,
      searchIcon,
      searchData,
      searchText,
      startDate,
      endDate,
      dateFormater,
      updateSearchAreaStatus,
      updateStartDate,
      updateEndDate,
    };
  },
  components: {
    searchBookModalVue,
  },
});
</script>
<style scoped>
.search-input {
  width: 100%;
  padding-bottom: 14px;
  padding-top: 14px;
}
@media screen and (max-width: 767px) {
}
</style>
