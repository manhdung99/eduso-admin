<template>
  <div class="px-4">
    <TopContentVue :title="title" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
      <div
        class="w-full lg:w-1/3 md:pl-0 lg:pl-8 2xl:pl-12 mb-6 lg:mb-0 flex gap-x-2 3xl:gap-x-4"
      >
        <div class="relative 3xl:flex-1">
          <select class="input w-full pr-12 select">
            <option>Lọc theo môn học</option>
            <option
              v-for="subject in subjects"
              :key="subject.id"
              :value="subject.id"
            >
              {{ subject.name }}
            </option>
          </select>
          <span class="absolute right-2 top-1/2 -translate-y-1/2">
            <img :src="downArrow" alt="icon" />
          </span>
        </div>
        <div class="relative 3xl:flex-1">
          <select class="input w-full pr-12 select">
            <option>Lọc theo chương trình học</option>
            <option v-for="grade in grades" :key="grade.id">
              {{ grade.name }}
            </option>
          </select>
          <span class="absolute right-2 top-1/2 -translate-y-1/2">
            <img :src="downArrow" alt="icon" />
          </span>
        </div>
      </div>
    </div>
    <div class="overflow-auto mb-4">
      <BookTableVue />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import BookTableVue from "@/components/quanlykhosach/BookTable.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { useBookStore } from "../stores/booksStore";
import { usePaginationStore, useCommonStore } from "../stores/commonStore";

import axios from "axios";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    BookTableVue,
    TablePagination,
  },
  setup() {
    const title = "Quản lý kho sách";
    const bookStore = useBookStore();
    const pagination = usePaginationStore();
    const { grades, subjects } = storeToRefs(useCommonStore());
    const { getBooks, getKhoSachColumn } = bookStore;
    const { getPagination, updatePageIndex } = pagination;
    axios
      .get("https://5e942888c7393c0016de4e98.mockapi.io/listcolumns/1")
      .then((response) => {
        getKhoSachColumn(response.data.columns);
      });
    axios
      .post("https://apiadminbook.eduso.vn/api/book_store/get_data")
      .then((response) => {
        // let currentBookId = response.data.Data[0].iD;
        getBooks(response.data.Data);
        updatePageIndex(response.data.Page.pageIndex);
        getPagination(
          Math.round(
            response.data.Page.totalRecord / response.data.Page.pageSize
          ) + 1
        );
        // updateCurrentBook(currentBookId);
      });
    return {
      title,
      downArrow,
      grades,
      subjects,
    };
  },
});
</script>
