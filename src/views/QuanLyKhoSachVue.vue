<template>
  <div class="px-4">
    <TopContentVue :title="title" />
    <div class="px-4 flex items-center">
      <div class="w-2/3">
        <SearchBook />
      </div>
      <div class="w-1/3 text-grey relative pl-12">
        <select class="input w-full">
          <option>Lọc theo môn học / chương trình học</option>
        </select>
        <span class="absolute right-2 top-1/2 -translate-y-1/2">
          <img :src="downArrow" alt="icon" />
        </span>
      </div>
    </div>
    <div>
      <BookTableVue />
    </div>
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/quanlykhosach/TopContent.vue";
import SearchBook from "@/components/quanlykhosach/SearchBook.vue";
import BookTableVue from "@/components/quanlykhosach/BookTable.vue";
import downArrow from "../../src/assets/image/down-arrow.svg";
export default {
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    BookTableVue,
  },
  setup() {
    const title = "Quản lý kho sách";

    return {
      title,
      downArrow,
    };
  },
};
</script>
