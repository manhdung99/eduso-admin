<template>
  <table class="w-full">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th
          class="text-lg text-charcoal font-medium w-1/8"
          v-for="column in columns"
          :key="column.id"
          :class="{
            '!w-1/5': column.largeColumn,
            '!w-1/10': column.smallColumn,
          }"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-charcoal" v-for="book in books" :key="book.bookId">
        <td>{{ book.bookId }}</td>
        <td>
          <div class="flex">
            <div>
              <img class="book-image" :src="book.bookInformation.image" />
            </div>
            <div class="ml-4">
              <p class="book-title">
                {{ book.bookInformation.title }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book.bookInformation.description }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book.bookInformation.subDescription }}
              </p>
            </div>
          </div>
        </td>
        <td>
          <span class="text-lg">{{ book.publisher }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.listedPrice }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.discountEduso }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.discount }}%</span>
        </td>
        <td class="">
          <div class="flex gap-x-4">
            <img class="cursor-pointer" :src="hideIcon" alt="icon" />
            <img
              class="cursor-pointer"
              @click="updateBookModalStatus(true, book.bookId)"
              :src="editIcon"
              alt="icon"
            />
            <img
              class="cursor-pointer"
              @click="
                updateRemoveModalStatus(true);
                currentBookDelete = book.bookId;
              "
              :src="removeIcon"
              alt="icon"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <updateBookModalVue />
  <removeBookModalVue @delete="removeBook()" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useKhoSachStore } from "../../stores/khoSachStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import updateBookModalVue from "../modal/updateBookModal.vue";
import removeBookModalVue from "../modal/removeBookModal.vue";

export default defineComponent({
  name: "BookTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const khoSach = useKhoSachStore();
    const { currentBookDelete } = storeToRefs(modal);
    const { updateBookModalStatus, updateRemoveModalStatus } = modal;
    const { books, columns } = storeToRefs(khoSach);

    return {
      hideIcon,
      removeIcon,
      editIcon,
      currentBookDelete,
      books,
      columns,
      updateBookModalStatus,
      updateRemoveModalStatus,
      // removeBook,
    };
  },
  components: {
    updateBookModalVue,
    removeBookModalVue,
  },
});
</script>
<style scoped>
.table-head-wrapper {
  background: #f9f9f9;
  padding: 22px 30px;
}
th {
  height: 100px;
  text-align: left;
}
thead th:first-child {
  padding-left: 16px;
}
tbody tr td:first-child {
  padding-left: 16px;
}
td {
  height: 120px;
}
.book-title {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
}
.book-image {
  max-width: 68px;
  min-width: 68px;
}
</style>
