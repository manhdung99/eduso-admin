<template>
  <div class="px-4">
    <TopContentVue :title="title" />
    <div class="px-4">
      <div class="w-2/3">
        <SearchBook />
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
    };
  },
};
</script>
