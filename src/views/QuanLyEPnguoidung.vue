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
import { useUserEPStore } from "../stores/userEPStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { onMounted, defineComponent } from "vue";
export default defineComponent({
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
    const userStore = useUserEPStore();
    const { getListUserEP } = userStore;
    onMounted(() => {
      getListUserEP();
    });
    return {
      title,
      downArrow,
      action,
    };
  },
});
</script>
