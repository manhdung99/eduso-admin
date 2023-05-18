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
        class="text-charcoal border-b border-grey-lighter odd:bg-gray-200"
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
            <span
              @click="
                getDetailBook(book.iD);
                updateIsSaleBookModal(true);
              "
              class="icon-hide text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
            <span
              @click="
                getDetailBook(book.iD);
                updateBookModalStatus(true);
              "
              class="icon-edit text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
            <span
              @click="
                getDetailBook(book.iD);
                updateRemoveModalStatus(true);
              "
              class="icon-remove text-slate-grey hover:text-red text-2xl cursor-pointer"
            ></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <updateBookModalVue v-if="openUpdateBookModal" />
  <removeBookModalVue v-if="openRemoveBookModal" />
  <isSaleBookModalVue v-if="openIsSaleBookModal" />
  <div
    v-if="isLoading"
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
  >
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <img class="w-20" src="../../assets/image/loading.gif" alt="" />
    </div>
  </div>
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
import axios from "axios";

export default defineComponent({
  name: "BookTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const {
      openUpdateBookModal,
      openIsSaleBookModal,
      openRemoveBookModal,
      isLoading,
    } = storeToRefs(modal);
    const {
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateIsSaleBookModal,
    } = modal;
    const { books, khoSachColumns } = storeToRefs(bookStore);
    const { setBookDetail } = bookStore;
    const { convertPrice } = convertData();
    const sortBooks = (data: string) => {
      if (data) {
        books.value.sort((a, b) => {
          return a[data] - b[data] || a[data].localeCompare(b[data]);
        });
      }
    };
    const getDetailBook = async (id) => {
      await axios
        .get(`https://apiadminbook.eduso.vn/api/book_store/get_detail/${id}`)
        .then((response) => {
          setBookDetail(response.data);
        });
    };
    return {
      hideIcon,
      eyeIcon,
      removeIcon,
      editIcon,
      books,
      khoSachColumns,
      sortBooks,
      updateBookModalStatus,
      updateRemoveModalStatus,
      convertPrice,
      updateIsSaleBookModal,
      openUpdateBookModal,
      openIsSaleBookModal,
      openRemoveBookModal,
      isLoading,
      getDetailBook,
    };
  },
  components: {
    updateBookModalVue,
    removeBookModalVue,
    isSaleBookModalVue,
  },
});
</script>
