<template>
  <div
    :class="openLibraryBookModal ? 'flex' : 'hidden'"
    class="fixed top-0 bottom-0 left-0 right-0 bg-modal flex justify-center items-center z-10"
  >
    <div class="library-book-modal-wrapper w-200 h-175 bg-white p-4 relative">
      <div
        @click="() => updateLibraryBookModal(false)"
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
          @input="filterLibraryBook(searchInput)"
        />
      </div>
      <div class="library-book-modal">
        <div
          v-for="book in libraryBooks"
          class="mb-8 rounded relative border border-grey-lighter cursor-pointer hover:scale-105"
          v-bind:key="book.ID"
          @click="
            setBookFromLibrary(book.ID);
            updateAddNewModalStatus(true);
          "
        >
          <div class="book-wrapper">
            <div>
              <img
                class="book-item-image"
                :src="`https://static.eduso.vn/${book.Image}`"
                alt="book image"
              />
            </div>
            <div class="bg-[#F8F9FA] px-[14px] rounded">
              <span class="font-semibold text-[#00314C] text-base pt-2 block">
                {{ book.Name }}
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
  <Teleport to="body">
    <addNewBookModal />
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import addNewBookModal from "./addNewBookModal.vue";

export default defineComponent({
  components: { addNewBookModal },
  name: "LibraryBookModal",
  setup() {
    const modal = useModalStore();
    const isLoading = ref(false);
    const { openLibraryBookModal } = storeToRefs(modal);
    const { libraryBooks } = storeToRefs(useBookStore());
    const { updateAddNewModalStatus, updateLibraryBookModal } = modal;
    const searchInput = ref("");
    const { setBookFromLibrary, filterLibraryBook } = useBookStore();
    // const filterBook = () => {
    //   isLoading.value = true;
    //   libraryBooks.value = [];
    //   axios
    //     .post("https://apiadminbook.eduso.vn/api/book_store/get_data")
    //     .then((response) => {
    //       // let currentBookId = response.data.Data[0].iD;
    //       libraryBooks.value = response.data.Data;
    //       isLoading.value = false;
    //     });
    // };
    return {
      openLibraryBookModal,
      closeIcon,
      searchInput,
      isLoading,
      libraryBooks,
      setBookFromLibrary,
      updateAddNewModalStatus,
      updateLibraryBookModal,
      filterLibraryBook,
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
.library-book-modal {
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 500px;
  column-gap: 24px;
  margin-bottom: 8px;
  position: relative;
  justify-content: space-between;
}
.library-book-modal-wrapper {
  border: 1px solid #aeaeae;
  border-radius: 10px;
}
.library-book-modal::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.library-book-modal::-webkit-scrollbar-thumb {
  background: #555555;
  border-radius: 10px;
}
.library-book-modal::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #555555;
  border-radius: 10px;
}
</style>
