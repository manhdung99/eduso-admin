<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-4 flex items-center">
      <div class="w-2/3">
        <SearchBook />
      </div>
      <div class="w-1/3 text-grey pl-12 flex justify-between gap-x-4">
        <div class="relative w-1/2">
          <select class="input w-full">
            <option>Lọc theo môn</option>
          </select>
          <span class="absolute right-2 top-1/2 -translate-y-1/2">
            <img :src="downArrow" alt="icon" />
          </span>
        </div>
        <div class="relative w-1/2">
          <select class="input w-full">
            <option>Lọc theo đơn vị</option>
          </select>
          <span class="absolute right-2 top-1/2 -translate-y-1/2">
            <img :src="downArrow" alt="icon" />
          </span>
        </div>
      </div>
    </div>
    <div>
      <RevenueTableVue />
    </div>
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/quanlykhosach/TopContent.vue";
import SearchBook from "@/components/quanlykhosach/SearchBook.vue";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { useBookStore } from "../stores/booksStore";
import RevenueTableVue from "@/components/quanlydoanhthu/RevenueTable.vue";
import axios from "axios";

export default {
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    RevenueTableVue,
  },
  setup() {
    const title = "Quản lý doanh thu theo đầu sách";
    const action = "Export";
    const bookStore = useBookStore();
    const { getBooks, getDoanhThuSachColumn } = bookStore;
    axios
      .get("https://5e942888c7393c0016de4e98.mockapi.io/listcolumns/2")
      .then((response) => {
        getDoanhThuSachColumn(response.data.columns);
      });
    axios
      .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books")
      .then((response) => {
        getBooks(response.data);
      });
    return {
      title,
      downArrow,
      action,
    };
  },
};
</script>
