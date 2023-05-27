<template>
  <div
    ref="divSearchElement"
    v-if="books.length > 0 || authors.length > 0"
    class="search-wrapper"
  >
    <div class="px-2" v-show="books.length > 0">
      <div class="flex items-center justify-between px-2">
        <span class="text-charcoal-darker text-lg font-medium">Sách</span>
        <span><img :src="rightArrowIcon" alt="icon" /></span>
      </div>
      <div class="list-book-wrapper">
        <div
          v-for="book in books"
          :key="book.BookID"
          class="flex mb-5 cursor-pointer"
          @click="
            setBookDetail(book.BookID);
            updateBookModalStatus(true);
          "
        >
          <div class="mr-4">
            <img
              class="book-image"
              :src="`https://static.eduso.vn/${book.Image}`"
              alt=""
            />
          </div>
          <div>
            <p class="text-base text-charcoal font-medium">
              {{ book.Name }}
            </p>
            <div
              v-html="book.Des"
              class="text-2xs italic text-charcoal-lighter"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="authors.length > 0" class="author-wrapper">
      <div class="flex items-center justify-between">
        <span class="text-charcoal-darker text-lg font-medium">Tác giả</span>
        <span><img :src="rightArrowIcon" alt="icon" /></span>
      </div>
      <div class="list-author-wrapper">
        <div
          v-for="author in authors"
          :key="author.id"
          class="flex gap-x-5 mt-4 items-center"
        >
          <div>
            <img :src="searchIcon" alt="icon" />
          </div>
          <div class="text-charcoal text-base font-medium">
            {{ author.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import rightArrowIcon from "../../assets/image/right-arrow.svg";
import searchIcon from "../../assets/image/search.svg";
import useDetectOutsideClick from "../../uses/useDetectOutsideClick";
import { useSearchStore } from "../../stores/searchStore";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import clickOutSide from "@mahdikhashan/vue3-click-outside";
export default defineComponent({
  name: "SearchBookModal",
  directives: {
    clickOutSide,
  },
  setup() {
    const searchStore = useSearchStore();
    const { authors, books } = storeToRefs(searchStore);
    const { updateSearchAreaStatus } = searchStore;
    const modal = useModalStore();
    const { setBookDetail } = useBookStore();
    const { updateBookModalStatus } = modal;
    const divSearchElement = ref(null);
    useDetectOutsideClick(divSearchElement, () => {
      updateSearchAreaStatus(false);
    });

    return {
      rightArrowIcon,
      searchIcon,
      authors,
      books,
      divSearchElement,
      updateBookModalStatus,
      setBookDetail,
      updateSearchAreaStatus,
    };
  },
});
</script>
<style scoped>
.search-wrapper {
  background: white;
  width: 100%;
  position: absolute;
  top: 58px;
  border: 1px solid #8799a5;
  border-radius: 5px;
  padding: 16px;
  z-index: 20;
}
.list-book-wrapper {
  margin-top: 16px;
  max-height: 195px;
  overflow-y: auto;
}
.book-image {
  max-width: 68px;
  min-width: 68px;
}
.author-wrapper {
  border-top: 1px solid #c2c2c2;
  padding: 16px 8px 0 8px;
}
.list-author-wrapper {
  max-height: 105px;
  overflow-y: auto;
}
.list-book-wrapper::-webkit-scrollbar,
.list-author-wrapper::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.list-book-wrapper::-webkit-scrollbar-thumb,
.list-author-wrapper::-webkit-scrollbar-thumb {
  background: #555555;
  border-radius: 10px;
}
.list-book-wrapper::-webkit-scrollbar-track,
.list-author-wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px #555555;
  border-radius: 10px;
}
</style>
