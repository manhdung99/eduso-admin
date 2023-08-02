<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
    </div>
    <div class="overflow-y-auto mb-4">
      <UserEPTable />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import UserEPTable from "@/components/table/UserEPTable.vue";
import { useBookStore } from "../stores/booksStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import axios from "axios";
import { usePaginationStore } from "@/stores/commonStore";
export default {
  name: "QuanLyEPnguoidung",
  components: {
    TopContentVue,
    SearchBook,
    UserEPTable,
    TablePagination,
  },
  setup() {
    const title = "Quản lý EP người dùng";
    const action = "Export";
    const bookStore = useBookStore();
    const pagination = usePaginationStore();
    const { getUnits } = bookStore;
    const { getPagination } = pagination;

    // axios
    //   .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books")
    //   .then((response) => {
    //     getBooks(response.data);
    //   });
    const listUnit = [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
        phone: "0965874578",
        currentEP: 25000,
      },
      {
        id: 2,
        name: "Nguyễn Văn B",
        email: "nguyenvanb@gmail.com",
        phone: "0965874578",
        currentEP: 25000,
      },
      {
        id: 3,
        name: "Nguyễn Văn C",
        email: "nguyenvanc@gmail.com",
        phone: "0965874578",
        currentEP: 25000,
      },
      {
        id: 4,
        name: "Nguyễn Văn D",
        email: "nguyenvand@gmail.com",
        phone: "0965874578",
        currentEP: 25000,
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
