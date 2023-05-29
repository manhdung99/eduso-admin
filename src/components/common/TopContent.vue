<template>
  <div
    class="flex justify-between border-b border-grey py-6 pr-3 pl-12 flex-wrap md:flex-nowrap gap-y-4"
  >
    <div class="flex items-center w-full md:w-auto">
      <h2 class="text-2xl text-charcoal-darker font-bold">{{ title }}</h2>
    </div>
    <div class="flex gap-x-6">
      <button
        @click="exportToExcel('book')"
        v-if="action == 'Export'"
        class="add-new-button hover:opacity-90"
      >
        Xuất Excel
      </button>
      <button
        v-else
        @click="
          getLibraryBooks(0);
          updateLibraryBookModal(true);
        "
        class="add-new-button hover:opacity-90"
      >
        Thêm sách
      </button>
    </div>
  </div>
  <Teleport to="body">
    <LibraryBookModal />
  </Teleport>
</template>
<script lang="ts">
import LibraryBookModal from "../modal/libraryBookModal.vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { defineComponent } from "vue";
import helpIcon from "../../assets/image/help.svg";
import * as XLSX from "xlsx";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "TopContent",
  props: {
    title: String,
    action: String,
  },
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const { updateLibraryBookModal } = modal;
    const { khoSachColumns, books } = storeToRefs(bookStore);
    const { getLibraryBooks } = bookStore;
    const exportToExcel = (type) => {
      if (type == "book") {
        const columns = [...khoSachColumns.value];
        let rows = books.value.map((book) => {
          return [
            book.bookId,
            book.bookInformation.title,
            book.startDate,
            book.endDate,
            book.revenue,
            book.numberDownload,
          ];
        });
        const data = [...columns, ...rows];
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "data.xlsx");
      }
    };

    return {
      updateLibraryBookModal,
      helpIcon,
      exportToExcel,
      getLibraryBooks,
    };
  },
  components: {
    LibraryBookModal,
  },
});
</script>
<style scoped>
.help-button {
  color: #355d73;
  border: 2px solid #355d73;
  display: flex;
  padding: 0 28px;
  border-radius: 5px;
  align-items: center;
  font-size: 18px;
  white-space: nowrap;
}
.add-new-button {
  color: white;
  background: #26a433;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 32px;
  white-space: nowrap;
}
@media screen and (max-width: 1023px) {
  .help-button {
    padding: 0 16px;
  }
  .add-new-button {
    padding: 10px 18px;
  }
}
</style>
