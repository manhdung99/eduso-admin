<template>
  <table class="w-full">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th
          class="text-lg text-charcoal font-medium md:w-1/8 pl-1"
          v-for="column in khoSachColumns"
          :key="column.id"
          :class="{
            '!w-1/5': column.largeColumn,
            '!w-1/10': column.smallColumn,
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
        <td>{{ book.bookId }}</td>
        <td>
          <div class="flex">
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
        <td>
          <span class="text-lg">{{ book.publisher }}</span>
        </td>
        <td>
          <span class="text-lg">{{ convertPrice(book.listedPrice) }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.discountEduso }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ book.discount }}%</span>
        </td>
        <td class="">
          <div class="flex gap-x-2 lg:gap-x-4">
            <img
              @click="
                updateIsSaleBookModal(true);
                currentBookSale = book.bookId;
              "
              class="cursor-pointer"
              :src="book.isSale ? eyeIcon : hideIcon"
              alt="icon"
            />
            <img
              class="cursor-pointer"
              @click="updateBookModalStatus(true, book.bookId)"
              :src="editIcon"
              alt="icon"
            />
            <img
              class="cursor-pointer"
              @click="
                updateRemoveModalStatus(true);
                currentBookDelete = book.bookId;
              "
              :src="removeIcon"
              alt="icon"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <updateBookModalVue />
  <removeBookModalVue />
  <isSaleBookModalVue />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import hideIcon from "../../assets/image/hide.svg";
import eyeIcon from "../../assets/image/eye.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import updateBookModalVue from "../modal/updateBookModal.vue";
import removeBookModalVue from "../modal/removeBookModal.vue";
import isSaleBookModalVue from "../modal/isSaleBookModal.vue";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "BookTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const { currentBookDelete, currentBookSale } = storeToRefs(modal);
    const {
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateIsSaleBookModal,
    } = modal;
    const { books, khoSachColumns } = storeToRefs(bookStore);
    const { convertPrice } = convertData();
    const sortBooks = (data: string) => {
      if (data) {
        books.value.sort((a, b) => {
          return a[data] - b[data] || a[data].localeCompare(b[data]);
        });
      }
    };

    return {
      hideIcon,
      eyeIcon,
      removeIcon,
      editIcon,
      currentBookDelete,
      books,
      khoSachColumns,
      sortBooks,
      updateBookModalStatus,
      updateRemoveModalStatus,
      convertPrice,
      updateIsSaleBookModal,
      currentBookSale,
    };
  },
  components: {
    updateBookModalVue,
    removeBookModalVue,
    isSaleBookModalVue,
  },
});
</script>
<style scoped>
.book-title {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
}
.book-image {
  max-width: 68px;
  min-width: 68px;
}
</style>
