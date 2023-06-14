<template>
  <table v-if="books.length > 0" class="w-full table mt-8" border="1">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th class="md:w-1/8 pl-1 text-center border border-gray-400">
          Mã Sách
        </th>
        <th class="md:w-1/5">Thông tin sách</th>
        <th class="md:w-1//8">Phân loại</th>
        <th class="md:w-1/8">Nhà xuất bản</th>
        <th class="md:w-1/8">Giá niêm yết</th>
        <th class="md:w-1/8">Mức giảm giá</th>
        <th class="md:w-1/8">Tác vụ</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter odd:bg-gray-200"
        v-for="book in books"
        :key="book.ID"
      >
        <td class="ml-4">
          {{ book.Code }}
        </td>
        <td>
          <div class="flex">
            <div>
              <img
                class="book-image"
                :src="
                  book.Image
                    ? `https://static.eduso.vn/${book.Image}`
                    : defaultBookCover
                "
              />
            </div>
            <div class="ml-4">
              <p class="book-title">
                {{ book.Name }}
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
        <td>
          <span class="text-lg">{{
            book.Type == 0 ? "Có bản quyền" : "Sách tham khảo"
          }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.Publisher }}</span>
        </td>
        <td>
          <span class="text-lg">{{ convertPrice(book.Price) }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.Sales }}%</span>
        </td>
        <td class="border border-gray-400">
          <div class="flex gap-x-4 lg:gap-x-8 justify-center">
            <span
              @click="
                setBookDetail(book.BookID);
                updateIsSaleBookModal(true);
              "
              :class="book.IsPublish ? 'icon-eye' : 'icon-hide'"
              class="text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
            <span
              @click="
                setBookDetail(book.BookID);
                updateBookModalStatus(true);
              "
              class="icon-edit text-slate-grey hover:text-slate text-2xl cursor-pointer"
            ></span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    v-else
    class="text-red-600 text-xl font-semibold left-1/2 -translate-x-1/2 relative inline-block"
  >
    Không tìm thấy sách
  </div>
  <Teleport to="body">
    <UpdateBookModal v-if="openUpdateBookModal" />
  </Teleport>
  <Teleport to="body">
    <isSaleBookModalVue v-if="openIsSaleBookModal" />
  </Teleport>
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
import UpdateBookModal from "../modal/updateBookModal.vue";
import defaultBookCover from "../../assets/image/default-book-image.jpg";
import isSaleBookModalVue from "../modal/isSaleBookModal.vue";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "BookTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const { openUpdateBookModal, openIsSaleBookModal, isLoading } =
      storeToRefs(modal);
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
      isLoading,
      setBookDetail,
      defaultBookCover,
    };
  },
  components: {
    UpdateBookModal,
    isSaleBookModalVue,
  },
});
</script>
