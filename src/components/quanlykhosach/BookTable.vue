<template>
  <table class="w-full table" border="1">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th
          class="text-lg text-charcoal font-medium md:w-1/8 pl-1 text-center"
          v-for="column in khoSachColumns"
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
        <td class="ml-4 text-center">{{ book?.iD }}</td>
        <td>
          <div class="flex justify-center">
            <div>
              <img
                class="book-image"
                :src="`https://static.eduso.vn/${book?.bookMetadata?.bookCover?.path}`"
              />
            </div>
            <div class="ml-4">
              <p class="book-title">
                {{ book?.bookMetadata?.bookName }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book?.bookMetadata?.bookSubject }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book?.bookMetadata?.bookContent }}
              </p>
            </div>
          </div>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ book?.bookMetadata?.publisher }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ convertPrice(book?.bookPrice) }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ book?.discountEduso }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ book?.discount }}%</span>
        </td>
        <td class="">
          <div class="flex gap-x-2 lg:gap-x-4 justify-center">
            <img
              @click="
                updateIsSaleBookModal(true);
                currentBookSale = book.iD;
              "
              class="cursor-pointer"
              :src="book.salesStatus ? eyeIcon : hideIcon"
              alt="icon"
            />
            <img
              class="cursor-pointer"
              @click="updateBookModalStatus(true, book.iD)"
              :src="editIcon"
              alt="icon"
            />
            <img
              class="cursor-pointer"
              @click="
                updateRemoveModalStatus(true);
                currentBookDelete = book.iD;
              "
              :src="removeIcon"
              alt="icon"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <updateBookModalVue v-if="openUpdateBookModal" />
  <removeBookModalVue v-if="openRemoveBookModal" />
  <isSaleBookModalVue v-if="openIsSaleBookModal" />
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
    const {
      currentBookDelete,
      currentBookSale,
      openUpdateBookModal,
      openIsSaleBookModal,
      openRemoveBookModal,
    } = storeToRefs(modal);
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
      openUpdateBookModal,
      openIsSaleBookModal,
      openRemoveBookModal,
    };
  },
  components: {
    updateBookModalVue,
    removeBookModalVue,
    isSaleBookModalVue,
  },
});
</script>
