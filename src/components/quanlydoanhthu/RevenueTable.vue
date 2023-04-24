<template>
  <table class="w-full">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th
          class="text-lg text-charcoal font-medium w-1/8 text-center"
          v-for="column in doanhThuSachColumns"
          :key="column.id"
          :class="{
            '!w-1/5': column.largeColumn,
            '!w-1/20': column.smallColumn,
          }"
          @click="sortBooks(column.key)"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter"
        v-for="book in books"
        :key="book.bookId"
      >
        <td class="text-center">{{ book.bookId }}</td>
        <td>
          <div class="flex justify-center">
            <div>
              <img class="book-image" :src="book.bookInformation.image" />
            </div>
            <div class="ml-4">
              <p class="book-title">
                {{ book.bookInformation.title }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book.bookInformation.description }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book.bookInformation.subDescription }}
              </p>
            </div>
          </div>
        </td>
        <td class="text-center">
          <span class="text-lg">{{
            convertTimestampToDate(book.startDate)
          }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{
            convertTimestampToDate(book.endDate)
          }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ convertPrice(book.revenue) }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ book.numberDownload }}</span>
        </td>
        <td class="overflow-hidden">
          <button
            @click="updateBookManagementStatus(true, book.bookId)"
            class="show-detail-button"
          >
            Chi tiết
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <updateBookModalVue />
  <removeBookModalVue />
  <bookManagementModalVue />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import updateBookModalVue from "../modal/updateBookModal.vue";
import removeBookModalVue from "../modal/removeBookModal.vue";
import bookManagementModalVue from "../modal/bookManagementModal.vue";
import convertData from "@/uses/convertData";
export default defineComponent({
  name: "RevenueTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const { currentBookDelete } = storeToRefs(modal);
    const {
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateBookManagementStatus,
    } = modal;
    const { books, doanhThuSachColumns } = storeToRefs(bookStore);

    const { convertTimestampToDate, convertPrice } = convertData();

    const sortBooks = (data: string) => {
      if (data) {
        books.value.sort((a, b) => {
          return a[data] - b[data];
        });
      }
    };
    return {
      hideIcon,
      removeIcon,
      editIcon,
      currentBookDelete,
      books,
      doanhThuSachColumns,
      sortBooks,
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateBookManagementStatus,
      convertTimestampToDate,
      convertPrice,
    };
  },
  components: {
    updateBookModalVue,
    removeBookModalVue,
    bookManagementModalVue,
  },
});
</script>
