<template>
  <ul v-if="paginations.length > 0" class="flex justify-center mb-4">
    <li
      v-if="pageIndex !== 1"
      @click="updatePageIndex(pageIndex - 1)"
      class="px-4 py-2 border border-grey-lighter hover:text-blue hover:border-blue cursor-pointer"
    >
      Trang trước
    </li>
    <li
      v-for="pagination in paginations"
      :key="pagination"
      :class="pagination === pageIndex ? '!border-blue !text-blue' : ''"
      class="px-4 py-2 border border-grey-lighter hover:text-blue hover:border-blue cursor-pointer"
      @click="updatePageIndex(pagination)"
    >
      {{ pagination }}
    </li>
    <li
      @click="updatePageIndex(pageIndex + 1)"
      v-if="pageIndex !== paginations[paginations.length - 1]"
      class="px-4 py-2 border border-grey-lighter hover:text-blue hover:border-blue cursor-pointer"
    >
      Trang tiếp
    </li>
  </ul>
</template>
<script>
import { defineComponent } from "vue";
import { usePaginationStore } from "../../stores/commonStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "TablePagination",
  setup() {
    const paginationStore = usePaginationStore();
    const { paginations, pageIndex } = storeToRefs(paginationStore);
    const { updatePageIndex } = paginationStore;

    return {
      paginations,
      pageIndex,
      updatePageIndex,
    };
  },
});
</script>
