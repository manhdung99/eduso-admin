<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openIsSaleBookModal"
  >
    <div class="remove-book-modal">
      <div class="flex items-center justify-center">
        <img :src="warningIcon" alt="icon" />
      </div>
      <div
        class="font-bold text-xl text-blue-lighter flex items-center justify-center mt-3"
      >
        {{ status ? "Tắt" : "Mở" }} bán sách ?
      </div>
      <div
        class="font-bold text-tiny text-red flex items-center justify-center mt-3"
      >
        {{ title }}
      </div>

      <div class="flex gap-x-6 justify-center mt-6">
        <button @click="updateIsSaleID" class="button remove hover:opacity-80">
          {{ status ? "Tắt" : "Mở" }}
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
import { defineComponent, watchEffect, ref } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { usePaginationStore } from "../../stores/commonStore";
import { storeToRefs } from "pinia";
import warningIcon from "../../assets/image/warning.svg";
import axios from "axios";
export default defineComponent({
  name: "isSaleBookModal",
  setup() {
    const modal = useModalStore();
    const pagination = usePaginationStore();
    const { openIsSaleBookModal, currentBookSale } = storeToRefs(modal);
    const { updateIsSaleBookModal } = modal;
    const bookStore = useBookStore();
    const { updateIsSaleBook } = bookStore;
    const { pageIndex } = storeToRefs(pagination);
    const title = ref(null);
    const status = ref(null);

    watchEffect(() => {
      axios
        .get(
          `https://apiadminbook.eduso.vn/api/book_store/get_detail/${currentBookSale.value}`
        )
        .then((response) => {
          let data = response.data;
          title.value = data.bookInformation.title;
          status.value = data.isSale;
        });
    });

    const updateIsSaleID = () => {
      //Call API and update here in DB ở đây
      updateIsSaleBook(currentBookSale.value, !status.value);
      updateIsSaleBookModal(false);
    };
    return {
      warningIcon,
      openIsSaleBookModal,
      updateIsSaleBookModal,
      updateIsSaleID,
      title,
      updateIsSaleBook,
      status,
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
