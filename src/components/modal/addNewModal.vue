<template>
  <div
    :class="openAddNewModal ? 'flex' : 'hidden'"
    class="fixed top-0 bottom-0 left-0 right-0 bg-modal flex justify-center items-center z-10"
  >
    <div
      class="add-book-modal-wrapper w-[800px] h-[700px] bg-white p-4 relative"
    >
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
          v-model="searchInput"
          class="w-full border border-grey-lighter pl-4 py-2 outline-none focus:border-blue-superiority text-[13px]"
          placeholder="Nhập tên sách..."
          @input="filterBook"
        />
      </div>
      <div class="add-book-modal">
        <div
          v-for="book in books"
          class="mb-8 rounded relative border border-grey-lighter cursor-pointer hover:scale-105"
          v-bind:key="book.iD"
          @click="
            getDetailBook(book.iD);
            updateBookModalStatus(true);
          "
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
        <div
          v-if="isLoading"
          class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <img class="w-16" src="../../assets/image/loading.gif" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import axios from "axios";

export default defineComponent({
  name: "AddNewModal",
  setup() {
    const modal = useModalStore();
    const bookStore = useBookStore();
    const isLoading = ref(false);
    const { openAddNewModal } = storeToRefs(modal);
    const {
      updateAddNewModalStatus,
      updateBookModalStatus,
      updateLoadingStatus,
    } = modal;
    const { books, bookDetail } = storeToRefs(bookStore);
    const { setBookDetail, getBooks } = bookStore;
    const searchInput = ref("");
    const getDetailBook = async (id) => {
      await axios
        .get(`https://apiadminbook.eduso.vn/api/book_store/get_detail/${id}`)
        .then((response) => {
          setBookDetail(response.data);
        });
    };
    const filterBook = () => {
      isLoading.value = true;
      getBooks([]);
      setTimeout(() => {
        axios
          .post("https://apiadminbook.eduso.vn/api/book_store/get_data")
          .then((response) => {
            // let currentBookId = response.data.Data[0].iD;
            getBooks(response.data.Data);
            isLoading.value = false;
          });
      }, 1000);
    };
    return {
      openAddNewModal,
      books,
      closeIcon,
      bookDetail,
      searchInput,
      isLoading,
      filterBook,
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
.add-book-modal {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 500px;
  column-gap: 24px;
  margin-bottom: 8px;
  position: relative;
}
.add-book-modal-wrapper {
  border: 1px solid #aeaeae;
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
