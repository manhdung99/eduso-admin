<template>
  <div
    @click.self="updateSearchAreaStatus(false)"
    class="flex py-6 flex-wrap lg:flex-nowrap justify-between gap-y-5"
  >
    <div class="w-75 relative md:mb-0">
      <input
        class="input search-input"
        placeholder="Tìm kiếm (tên sản phẩm, mã...)"
        v-model="searchText"
      />
      <span class="absolute right-4 top-1/2 -translate-y-1/2">
        <img :src="searchIcon" alt="" />
      </span>
      <searchBookModalVue v-show="openSearchArea" />
    </div>
    <div
      class="w-90 xl:w-126 flex items-center justify-between md:justify-start"
    >
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
            @input="updateEndDate($event)"
            :min="dateFormater(fromDate)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import searchBookModalVue from "../modal/searchBookModal.vue";
import searchIcon from "../../assets/image/search.svg";
import { useSearchStore } from "../../stores/searchStore";
import convertData from "@/uses/convertData";
import { useCommonStore } from "../../stores/commonStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "SearchBook",
  setup() {
    const { fromDate, toDate } = storeToRefs(useCommonStore());
    const searchStore = useSearchStore();
    const { searchText } = storeToRefs(searchStore);
    const { updateSearchAreaStatus } = searchStore;
    const { openSearchArea } = storeToRefs(searchStore);
    const { updateFromDate, updateToDate } = useCommonStore();
    const { dateFormater } = convertData();
    // const searchData = debounce(() => {
    //   if (searchText.value.length > 0) {
    //     updateSearchAreaStatus(true);
    //     const fetchBooks = async () => {
    //       try {
    //         const response = await axios.get(
    //           "https://642e3a278ca0fe3352cb2e35.mockapi.io/books/1"
    //         );
    //         getSearchtBooks(response.data.listBook);
    //       } catch (err) {
    //         throw new Error("Some thing went wrong");
    //       }
    //     };
    //     fetchBooks();
    //     const authors = [
    //       {
    //         id: 1,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //       {
    //         id: 2,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //       {
    //         id: 3,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //       {
    //         id: 4,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //       {
    //         id: 5,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //       {
    //         id: 5,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //       {
    //         id: 5,
    //         name: "Bộ Giáo dục & Đào tạo",
    //       },
    //     ];
    //     getAuthors(authors);
    //   } else {
    //     getSearchtBooks([]);
    //     getAuthors([]);
    //   }
    // }, 1000);
    const startDate = dateFormater(fromDate.value);

    const endDate = dateFormater(toDate.value);

    const updateStartDate = (event) => {
      updateFromDate(new Date(event.target.value));
    };
    const updateEndDate = (event) => {
      updateToDate(new Date(event.target.value));
    };
    return {
      fromDate,
      toDate,
      searchIcon,
      // searchData,
      searchText,
      startDate,
      endDate,
      dateFormater,
      updateSearchAreaStatus,
      updateStartDate,
      updateEndDate,
      openSearchArea,
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
