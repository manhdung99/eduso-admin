<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
      <div
        class="w-full md:w-1/2 lg:w-1/3 pl-0 lg:pl-8 2xl:pl-12 flex gap-x-4 mb-6 lg:mb-0 justify-between md:justify-start"
      >
        <div class="relative 3xl:flex-1">
          <select class="input w-full pr-7 select">
            <option>Lọc theo môn</option>
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
          <select class="input w-full pr-7">
            <option>Lọc theo đơn vị</option>
          </select>
          <span class="absolute right-2 top-1/2 -translate-y-1/2">
            <img :src="downArrow" alt="icon" />
          </span>
        </div>
      </div>
    </div>
    <div class="overflow-y-auto mb-4">
      <RevenueTableVue />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import RevenueTableVue from "@/components/quanlydoanhthu/RevenueTable.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import { useBookStore } from "../stores/booksStore";
import { usePaginationStore, useCommonStore } from "../stores/commonStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { storeToRefs } from "pinia";
import axios from "axios";

export default {
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    RevenueTableVue,
    TablePagination,
  },
  setup() {
    const title = "Quản lý doanh thu theo đầu sách";
    const action = "Export";
    const bookStore = useBookStore();
    const pagination = usePaginationStore();
    const { getBooks, getDoanhThuSachColumn } = bookStore;
    const { getPagination, updatePageIndex } = pagination;
    const { subjects } = storeToRefs(useCommonStore());

    axios
      .get("https://5e942888c7393c0016de4e98.mockapi.io/listcolumns/2")
      .then((response) => {
        getDoanhThuSachColumn(response.data.columns);
      });
    axios
      .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books/1")
      .then((response) => {
        getBooks(response.data.listBook);
        updatePageIndex(response.data.pages.pageIndex);
        getPagination(response.data.pages.pageNumber);
      });
    return {
      title,
      downArrow,
      action,
      subjects,
    };
  },
};
</script>
