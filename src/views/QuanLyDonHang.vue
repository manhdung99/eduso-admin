<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
    </div>
    <div class="overflow-y-auto mb-4">
      <OrderTable />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import OrderTable from "@/components/table/DonHangTable.vue";
import { useOrderStore } from "../stores/orderStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import axios from "axios";
import { usePaginationStore } from "@/stores/commonStore";
import { onMounted } from "vue";
export default {
  name: "QuanLyDonHang",
  components: {
    TopContentVue,
    SearchBook,
    OrderTable,
    TablePagination,
  },
  setup() {
    const title = "Quản lý đơn hàng";
    const action = "Export";
    const orderStore = useOrderStore();
    const pagination = usePaginationStore();
    const { getOrders } = orderStore;
    const { getPagination } = pagination;

    // axios
    //   .get("https://642e3a278ca0fe3352cb2e35.mockapi.io/books")
    //   .then((response) => {
    //     getBooks(response.data);
    //   });
    const listOrders = [
      {
        id: 1,
        detail: "Đơn hàng 1",
        buyDate: 1672563598191,
        typeTransaction: "Thẻ ATM",
        orderValue: 25000,
        discount: 20,
        userEmail: "nguyenvanb@gmail.com",
      },
      {
        id: 2,
        detail: "Đơn hàng 2",
        buyDate: 1672563598191,
        typeTransaction: "Thẻ ATM",
        orderValue: 25000,
        discount: 20,
        userEmail: "nguyenvanb@gmail.com",
      },
      {
        id: 3,
        detail: "Đơn hàng 3",
        buyDate: 1672563598191,
        typeTransaction: "Thẻ ATM",
        orderValue: 25000,
        discount: 20,
        userEmail: "nguyenvanb@gmail.com",
      },
      {
        id: 4,
        detail: "Đơn hàng 4",
        buyDate: 1672563598191,
        typeTransaction: "Thẻ ATM",
        orderValue: 25000,
        discount: 20,
        userEmail: "nguyenvanb@gmail.com",
      },
    ];
    onMounted(() => {
      getOrders(listOrders);
      getPagination(1);
    });
    return {
      title,
      downArrow,
      action,
    };
  },
};
</script>
