<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
    </div>
    <div class="overflow-y-auto mb-4">
      <TransitionEPTable />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import TransitionEPTable from "@/components/table/TransitionEPTable.vue";
import { useEPStore } from "../stores/EPStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { usePaginationStore } from "@/stores/commonStore";
export default {
  name: "QuanLyNapEP",
  components: {
    TopContentVue,
    SearchBook,
    TransitionEPTable,
    TablePagination,
  },
  setup() {
    const title = "Quản lý nạp giao dịch EP";
    const action = "Export";
    const EPStore = useEPStore();
    const pagination = usePaginationStore();
    const { getTransitions } = EPStore;
    const { getPagination } = pagination;

    const listTransaction = [
      {
        id: 1,
        email: "nguyenvana@gmail.com",
        timeTransaction: 1672563598191,
        typeTransaction: "Thẻ ATM",
        currentEP: 25000,
      },
      {
        id: 2,
        email: "nguyenvana@gmail.com",
        timeTransaction: 1672563598191,
        typeTransaction: "Thẻ ATM",
        currentEP: 25000,
      },
      {
        id: 3,
        email: "nguyenvana@gmail.com",
        timeTransaction: 1672563598191,
        typeTransaction: "Thẻ ATM",
        currentEP: 25000,
      },
      {
        id: 4,
        email: "nguyenvana@gmail.com",
        timeTransaction: 1672563598191,
        typeTransaction: "Thẻ ATM",
        currentEP: 25000,
      },
    ];
    getTransitions(listTransaction);
    getPagination(1);
    return {
      title,
      downArrow,
      action,
    };
  },
};
</script>
