<template>
  <div class="px-2 2xl:px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
      <div class="w-1/3 text-grey pl-8 2xl:pl-12 flex gap-x-4">
        <div class="relative">
          <select class="input w-full pr-7">
            <option>Lọc theo môn</option>
          </select>
          <span class="absolute right-2 top-1/2 -translate-y-1/2">
            <img :src="downArrow" alt="icon" />
          </span>
        </div>
        <div class="relative">
          <select class="input w-full pr-7">
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
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import RevenueTableVue from "@/components/quanlydoanhthu/RevenueTable.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import { useBookStore } from "../stores/booksStore";
import { useModalStore } from "../stores/modalStore";
import { usePaginationStore } from "../stores/paginationStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
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
    const modal = useModalStore();
    const { updateCurrentBook } = modal;
    const { getBooks, getDoanhThuSachColumn } = bookStore;
    const { getPagination, updatePageIndex } = pagination;

    axios
      .get("https://5e942888c7393c0016de4e98.mockapi.io/listcolumns/2")
      .then((response) => {
        getDoanhThuSachColumn(response.data.columns);
      });
    axios
      .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books/1")
      .then((response) => {
        let currentBookId = response.data.listBook[0].bookId;
        getBooks(response.data.listBook);
        updatePageIndex(response.data.pages.pageIndex);
        getPagination(response.data.pages.pageNumber);
        updateCurrentBook(currentBookId);
      });
    return {
      title,
      downArrow,
      action,
    };
  },
};
</script>
