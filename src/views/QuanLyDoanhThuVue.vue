<template>
  <div class="px-4">
    <TopContentVue :title="title" :action="action" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full lg:w-2/3">
        <SearchBook />
      </div>
      <div
        class="w-100 pl-0 lg:pl-8 2xl:pl-12 flex gap-x-4 mb-6 lg:mb-0 justify-between md:justify-start"
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
      <DoanhThuTable />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import DoanhThuTable from "@/components/table/DoanhThuTable.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import { useOrderStore } from "../stores/bookOrdersStore";
import { useCommonStore } from "../stores/commonStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    DoanhThuTable,
    TablePagination,
  },
  setup() {
    const title = "Quản lý doanh thu theo đầu sách";
    const action = "Export";
    const orderStore = useOrderStore();
    const { getBookOrders } = orderStore;
    const { subjects } = storeToRefs(useCommonStore());

    onMounted(getBookOrders);
    return {
      title,
      downArrow,
      action,
      subjects,
    };
  },
});
</script>
