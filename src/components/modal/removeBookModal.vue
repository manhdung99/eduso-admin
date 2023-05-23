<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openRemoveBookModal"
  >
    <div v-if="bookDetail != null" class="remove-book-modal">
      <div class="flex items-center justify-center">
        <img :src="warningIcon" alt="icon" />
      </div>
      <div
        class="font-bold text-xl text-blue-lighter flex items-center justify-center mt-3"
      >
        Xoá sách ?
      </div>
      <div
        class="font-bold text-tiny text-red flex items-center justify-center mt-3"
      >
        {{ bookDetail.name }}
      </div>
      <div class="text-tiny italic text-charcoal-lighter mt-3 text-center">
        Lưu ý : Sách đã xoá không thể khôi phục lại.
      </div>
      <div class="flex gap-x-6 justify-center mt-6">
        <button
          @click="updateRemoveModalStatus(false)"
          class="button cancel hover:!bg-grey-darker hover:!text-white"
        >
          Huỷ
        </button>
        <button
          @click="deleteCurrentBook"
          class="button remove hover:opacity-80"
        >
          Xoá
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import warningIcon from "../../assets/image/warning.svg";
import axios from "axios";

export default defineComponent({
  name: "RemoveBookModal",
  setup() {
    const modal = useModalStore();
    const { openRemoveBookModal, currentBookDelete } = storeToRefs(modal);
    const { updateRemoveModalStatus } = modal;
    const bookStore = useBookStore();
    const { deleteBook } = bookStore;
    const { bookDetail } = storeToRefs(bookStore);

    const deleteCurrentBook = () => {
      axios.delete(
        `https://apiadminbook.eduso.vn/api/book_store/delete_book/${bookDetail.value.iD}`
      );
      //Call API and delete in DB ở đây
      deleteBook(bookDetail.value.iD);
      updateRemoveModalStatus(false);
    };
    onMounted(() => console.log(bookDetail.value));
    return {
      openRemoveBookModal,
      warningIcon,
      currentBookDelete,
      updateRemoveModalStatus,
      deleteCurrentBook,
      bookDetail,
    };
  },
});
</script>
<style scoped>
.remove-book-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  padding: 24px 50px;
  border-radius: 10px;
  max-width: 306px;
}
.button {
  padding: 5px 24px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
}
.button.remove {
  background: #c54d52;
  color: white;
}
.button.cancel {
  background: #f0f3f4;
  color: #888888;
}
</style>
