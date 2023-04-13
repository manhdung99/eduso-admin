<template>
  <div class="px-4">
    <TopContentVue :title="title" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
      <div
        class="lg:w-1/3 text-grey relative md:pl-0 lg:pl-8 2xl:pl-12 mb-6 lg:mb-0"
      >
        <select class="input w-full pr-8">
          <option>Lọc theo môn học / chương trình học</option>
        </select>
        <span class="absolute right-2 top-1/2 -translate-y-1/2">
          <img :src="downArrow" alt="icon" />
        </span>
      </div>
    </div>
    <div class="overflow-auto">
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

import axios from "axios";

export default {
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
    const { getBooks, getKhoSachColumn } = bookStore;
    axios
      .get("https://5e942888c7393c0016de4e98.mockapi.io/listcolumns/1")
      .then((response) => {
        getKhoSachColumn(response.data.columns);
      });
    axios
      .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books")
      .then((response) => {
        getBooks(response.data);
      });
    return {
      title,
      downArrow,
    };
  },
};
</script>
