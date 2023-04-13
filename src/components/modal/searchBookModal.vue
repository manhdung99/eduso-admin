<template>
  <div v-if="books.length > 0 || authors.length > 0" class="search-wrapper">
    <div class="px-2" v-if="books.length > 0">
      <div class="flex items-center justify-between px-2">
        <span class="text-charcoal-darker text-lg font-medium">Sách</span>
        <span><img :src="rightArrowIcon" alt="icon" /></span>
      </div>
      <div class="list-book-wrapper">
        <div
          v-for="book in books"
          :key="book.bookId"
          class="flex mb-5 cursor-pointer"
          @click="updateBookModalStatus(true, book.bookId)"
        >
          <div class="mr-4">
            <img class="book-image" :src="book.bookInformation.image" alt="" />
          </div>
          <div>
            <p class="text-base text-charcoal font-medium">
              {{ book.bookInformation.title }}
            </p>
            <p class="text-2xs italic text-charcoal-lighter">
              {{ book.bookInformation.subDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="authors.length > 0" class="author-wrapper">
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
import { defineComponent } from "vue";
import rightArrowIcon from "../../assets/image/right-arrow.svg";
import searchIcon from "../../assets/image/search.svg";
import { useSearchStore } from "../../stores/searchStore";
import { useModalStore } from "../../stores/modalStore";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "SearchBookModal",
  setup() {
    const searchStore = useSearchStore();
    const { authors, books } = storeToRefs(searchStore);
    const modal = useModalStore();
    const { updateBookModalStatus } = modal;
    return {
      rightArrowIcon,
      searchIcon,
      authors,
      books,
      updateBookModalStatus,
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
