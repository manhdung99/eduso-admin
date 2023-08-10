<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openIsSaleBookModal"
  >
    <div v-if="bookDetail != null" class="sale-book-modal">
      <div class="flex items-center justify-center">
        <img :src="warningIcon" alt="icon" />
      </div>
      <div
        class="font-bold text-xl text-blue-lighter flex items-center justify-center mt-3"
      >
        {{ bookDetail.IsPublish ? "Tắt" : "Mở" }} bán sách ?
      </div>
      <div
        class="font-bold text-tiny text-red flex items-center justify-center mt-3"
      >
        {{ bookDetail.Name }}
      </div>

      <div class="flex gap-x-6 justify-center mt-6">
        <button @click="updateIsSaleID" class="button remove hover:opacity-80">
          {{ bookDetail.IsPublish ? "Tắt" : "Mở" }}
        </button>
        <button
          @click="updateIsSaleBookModal(false)"
          class="button cancel hover:!bg-grey-darker hover:!text-white"
        >
          Huỷ
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import warningIcon from "../../assets/image/warning.svg";
import axios from "axios";
import { BASE_URL, PUBLIC_BOOK } from "../../constants";
import { useUserStore } from "@/stores/userStore";

export default defineComponent({
  name: "isSaleBookModal",
  setup() {
    const modal = useModalStore();
    const { openIsSaleBookModal } = storeToRefs(modal);
    const { updateIsSaleBookModal } = modal;
    const bookStore = useBookStore();
    const { updateIsSaleBook } = bookStore;
    const { bookDetail } = storeToRefs(bookStore);
    const title = ref(null);
    const status = ref(null);
    const { Access_Token } = storeToRefs(useUserStore());

    const updateIsSaleID = async () => {
      console.log(bookDetail.value.BookID, !bookDetail.value.IsPublish);
      const formData = new FormData();
      formData.append("id", bookDetail.value.ID);
      formData.append("status", !bookDetail.value.IsPublish);
      const url = BASE_URL + PUBLIC_BOOK;
      await axios
        .put(url, formData, {
          headers: {
            Authorization: Access_Token.value,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            updateIsSaleBook(
              bookDetail.value.BookID,
              !bookDetail.value.IsPublish
            );
            updateIsSaleBookModal(false);
          }
        });
    };
    return {
      warningIcon,
      openIsSaleBookModal,
      updateIsSaleBookModal,
      updateIsSaleID,
      title,
      updateIsSaleBook,
      status,
      bookDetail,
    };
  },
});
</script>
<style scoped>
.sale-book-modal {
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
