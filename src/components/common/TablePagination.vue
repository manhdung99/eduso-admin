<template>
  <ul v-if="paginations.length > 1" class="flex justify-center mb-4">
    <li
      v-if="pageIndex !== 1"
      @click="updatePagination(pageIndex - 1)"
      class="px-4 py-2 border border-grey-lighter hover:text-blue hover:border-blue cursor-pointer"
    >
      Trang trước
    </li>
    <li
      v-for="pagination in paginations"
      :key="pagination"
      :class="pagination === pageIndex ? '!border-blue !text-blue' : ''"
      class="px-4 py-2 border border-grey-lighter hover:text-blue hover:border-blue cursor-pointer"
      @click="updatePagination(pagination)"
    >
      {{ pagination }}
    </li>
    <li
      @click="updatePagination(pageIndex + 1)"
      v-if="pageIndex !== paginations[paginations.length - 1]"
      class="px-4 py-2 border border-grey-lighter hover:text-blue hover:border-blue cursor-pointer"
    >
      Trang tiếp
    </li>
  </ul>
</template>
<script>
import { defineComponent } from "vue";
import { useBookStore } from "../../stores/booksStore";
import { usePaginationStore } from "../../stores/paginationStore";
import { useModalStore } from "../../stores/modalStore";
import { storeToRefs } from "pinia";
import axios from "axios";

export default defineComponent({
  name: "TablePagination",
  setup() {
    const paginationStore = usePaginationStore();
    const booksStore = useBookStore();
    const modal = useModalStore();
    const { updateCurrentBook } = modal;
    const { paginations, pageIndex } = storeToRefs(paginationStore);
    const { updatePageIndex, getPagination } = paginationStore;
    const { getBooks } = booksStore;

    const updatePagination = (id) => {
      axios
        .get(`https://642e3a278ca0fe3352cb2e35.mockapi.io/books/${id}`)
        .then((response) => {
          let currentBookId = response.data.listBook[0].bookId;
          getBooks(response.data.listBook);
          updatePageIndex(response.data.pages.pageIndex);
          getPagination(response.data.pages.pageNumber);
          updateCurrentBook(currentBookId);
        });
    };
    return {
      paginations,
      pageIndex,
      updatePageIndex,
      updatePagination,
    };
  },
});
</script>
