<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-4 flex items-center">
      <div class="w-2/3">
        <SearchBook />
      </div>
      <div class="w-1/3 text-grey relative pl-12">
        <select class="input w-full">
          <option>Lọc theo tỉnh / trường / lớp</option>
        </select>
        <span class="absolute right-2 top-1/2 -translate-y-1/2">
          <img :src="downArrow" alt="icon" />
        </span>
      </div>
    </div>
    <div>
      <UnitTable />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/quanlykhosach/TopContent.vue";
import SearchBook from "@/components/quanlykhosach/SearchBook.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import UnitTable from "@/components/quanlydonvi/UnitTable.vue";
import { useBookStore } from "../stores/booksStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import axios from "axios";
export default {
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    UnitTable,
    TablePagination,
  },
  setup() {
    const title = "Quản lý doanh thu theo đơn vị";
    const action = "Export";
    const bookStore = useBookStore();
    const { getUnits, getDoanhThuDonViColumn } = bookStore;
    axios
      .get("https://5e942888c7393c0016de4e98.mockapi.io/listcolumns/3")
      .then((response) => {
        getDoanhThuDonViColumn(response.data.columns);
      });

    // axios
    //   .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books")
    //   .then((response) => {
    //     getBooks(response.data);
    //   });
    const listUnit = [
      {
        id: 1,
        name: "Trường THPT A",
        revenue: 10000000,
        numberDownload: 1072,
        startDate: 1641007254,
      },
      {
        id: 2,
        name: "Trường THPT A",
        revenue: 10000000,
        numberDownload: 1072,
        startDate: 1641007254,
      },
      {
        id: 3,
        name: "Trường THPT A",
        revenue: 10000000,
        numberDownload: 1072,
        startDate: 1641007254,
      },
      {
        id: 4,
        name: "Trường THPT A",
        revenue: 10000000,
        numberDownload: 1072,
        startDate: 1641007254,
      },
    ];
    getUnits(listUnit);
    return {
      title,
      downArrow,
      action,
    };
  },
};
</script>
