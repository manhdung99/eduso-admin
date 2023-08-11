<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
      <div
        class="w-100 pl-0 lg:pl-8 2xl:pl-12 flex gap-x-4 mb-6 lg:mb-0 justify-between md:justify-start relative"
      >
        <select class="input w-full pr-8 lg:pr-0 select">
          <option>Lọc theo tỉnh / trường / lớp</option>
        </select>
        <span class="absolute right-2 top-1/2 -translate-y-1/2">
          <img :src="downArrow" alt="icon" />
        </span>
      </div>
    </div>
    <div class="overflow-y-auto mb-4">
      <UnitTable />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import UnitTable from "@/components/table/DonviTable.vue";
import { useBookStore } from "../stores/booksStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import axios from "axios";
import { usePaginationStore } from "@/stores/commonStore";
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
    const pagination = usePaginationStore();
    const { getUnits, getDoanhThuDonViColumn } = bookStore;
    const { getPagination } = pagination;
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
    getPagination(1);
    return {
      title,
      downArrow,
      action,
    };
  },
};
</script>
