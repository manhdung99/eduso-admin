<template>
  <div
    :class="openAddNewModal ? 'flex' : 'hidden'"
    class="fixed top-0 bottom-0 left-0 right-0 bg-modal flex justify-center items-center z-10"
  >
    <div class="w-[800px] h-[700px] bg-white p-4 relative">
      <div
        @click="() => updateAddNewModalStatus(false)"
        class="absolute right-4 cursor-pointer"
      >
        <img :src="closeIcon" alt="icon" />
      </div>
      <div
        class="border-b border-grey-lighter text-xl text-charcoal font-bold pb-3"
      >
        Thêm sách
      </div>
      <div class="my-5">
        <input
          class="w-full border border-[#BDBDBD] pl-4 py-2 outline-none focus:border-[#00000091] text-[13px]"
          placeholder="Nhập tên sách..."
        />
      </div>
      <div
        class="flex flex-wrap overflow-y-auto max-h-[480px] gap-x-6 add-book-modal mb-2"
      >
        <div
          v-for="book in books"
          class="mb-8 rounded relative border"
          v-bind:key="book.iD"
          @click="getDetailBook(book.iD)"
          :class="
            book.iD == (bookDetail ? bookDetail.iD : 0)
              ? 'border-blue-superiority'
              : ''
          "
        >
          <div class="book-wrapper">
            <div>
              <img
                class="book-item-image"
                :src="`https://static.eduso.vn/${book.bookMetadata.bookCover.path}`"
                alt="book image"
              />
            </div>
            <div class="bg-[#F8F9FA] px-[14px] rounded">
              <span class="font-semibold text-[#00314C] text-base pt-2 block">
                {{ book.name }}
              </span>
              <div class="flex space-x-2 pb-3 items-center">
                <span class="font-bold text-[#D03239] text-sm">
                  <!-- {{ currentPrice }} -->
                </span>
                <span class="text-xs line-through text-[#68818F]">
                  <!-- {{ oldPrice }} -->
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <fieldset
        @click="
          updateBookModalStatus(true);
          updateAddNewModalStatus(false);
        "
        class="bg-green text-white font-semibold inline-block px-5 py-2 rounded mt-4 ml-[50%] -translate-x-1/2 hover:opacity-80 cursor-pointer"
      >
        Lưu sách
      </fieldset>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import "cropperjs/dist/cropper.css";
import closeIcon from "../../assets/image/close.svg";
import axios from "axios";

export default defineComponent({
  name: "AddNewModal",
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const { openAddNewModal } = storeToRefs(modal);
    const { updateAddNewModalStatus, updateBookModalStatus } = modal;
    const { books, bookDetail } = storeToRefs(bookStore);
    const { setBookDetail } = bookStore;
    const getDetailBook = async (id) => {
      console.log(id);

      await axios
        .get(`https://apiadminbook.eduso.vn/api/book_store/get_detail/${id}`)
        .then((response) => {
          setBookDetail(response.data);
        });
    };
    return {
      openAddNewModal,
      books,
      closeIcon,
      bookDetail,
      getDetailBook,
      updateAddNewModalStatus,
      updateBookModalStatus,
    };
  },
  methods: {},
});
</script>
<style>
.book-wrapper {
  max-width: 168px;
}
.book-item-image {
  width: 168px;
  height: 205px;
  object-fit: fill;
}
.add-book-modal::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.add-book-modal::-webkit-scrollbar-thumb {
  background: #555555;
  border-radius: 10px;
}
.add-book-modal::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #555555;
  border-radius: 10px;
}
</style>
