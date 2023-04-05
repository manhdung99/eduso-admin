<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openAddNewModal"
  >
    <div class="add-book-modal">
      <div class="flex border-b border-gray-lighter pb-4 relative">
        <h3 class="text-xl font-bold text-blue-lighter">Thêm sách</h3>
        <span
          @click="updateAddNewModalStatus(false)"
          class="absolute right-0 cursor-pointer"
          ><img :src="closeIcon" alt="icon"
        /></span>
      </div>
      <!-- Có sách -->
      <div class="flex justify-between mt-6">
        <div class="mr-10">
          <img
            class="book-image-modal"
            src="../../assets/image/bookImage.jpg"
            alt=""
          />
        </div>
        <div class="relative">
          <p class="text-blue-lighter text-xl font-bold">
            SGK Ngữ Văn 12(Tập 1)
          </p>
          <p class="italic text-base text-grey-darker">Bộ Giáo dục & Đào tạo</p>
          <p class="italic text-base text-grey-darker">NXB Giáo dục</p>
          <button class="change-image-btn">Đổi ảnh bìa</button>
        </div>
      </div>
      <!-- Meta data of book  -->
      <div>
        <div class="mt-2">
          <p class="text-blue-darker text-lg font-bold">Metadata của sách:</p>
          <div class="flex justify-between items-center mt-2">
            <div class="flex">
              <span><img :src="attachIcon" alt="icon" /></span>
              <span class="text-grey-darker text-base italic ml-4"
                >Chưa có file</span
              >
            </div>
            <div>
              <img :src="uploadIcon" alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <!-- Nội dung sách  -->
      <div>
        <div class="mt-2">
          <p class="text-blue-darker text-lg font-bold">Nội dung sách:</p>
          <div class="flex justify-between items-center mt-2">
            <div class="flex">
              <span><img :src="attachIcon" alt="icon" /></span>
              <span class="text-grey-darker text-base italic ml-4"
                >Chưa có file</span
              >
            </div>
            <div>
              <img :src="uploadIcon" alt="icon" />
            </div>
          </div>
        </div>
      </div>
      <!-- info -->
      <div class="flex gap-x-4">
        <div class="w-1/3">
          <p class="text-lg text-blue-darker font-bold">Cấp học:</p>
          <div class="relative mt-2">
            <select class="select w-full py-1"></select>
            <div
              class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
            >
              <span class="triangle_up active:border-b-black"></span>
              <span class="triangle_down active:border-t-black"></span>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <p class="text-lg text-blue-darker font-bold">Cấp học:</p>
          <div class="relative mt-2">
            <select class="select w-full py-1"></select>
            <div
              class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
            >
              <span class="triangle_up active:border-b-black"></span>
              <span class="triangle_down active:border-t-black"></span>
            </div>
          </div>
        </div>
        <div class="w-1/3">
          <p class="text-lg text-blue-darker font-bold">Cấp học:</p>
          <div class="relative mt-2">
            <input
              disabled
              class="select w-full py-1 text-2xs italic"
              value="IELTS"
            />
          </div>
        </div>
      </div>
      <!-- Price  -->
      <div class="flex gap-x-4 mt-4">
        <div class="w-1/2">
          <p class="text-lg text-blue-darker font-bold">Giá niêm yết (VND):</p>
          <div class="relative mt-2">
            <input
              disabled
              class="select w-full py-1 text-2xs italic"
              value="50000"
            />
          </div>
        </div>
        <div class="w-1/2">
          <p class="text-lg text-blue-darker font-bold">Mức giảm giá (%):</p>
          <div class="relative mt-2">
            <input
              disabled
              class="select w-full py-1 text-2xs italic"
              value="50"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-6">
        <button
          class="bg-green text-white text-base rounded px-4 py-2 hover:opacity-90"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import uploadIcon from "../../assets/image/upload.svg";
import attachIcon from "../../assets/image/attach.svg";
export default defineComponent({
  name: "UpdateBookModal",
  setup() {
    const modal = useModalStore();
    const { openAddNewModal } = storeToRefs(modal);
    const { updateAddNewModalStatus } = modal;
    return {
      openAddNewModal,
      updateAddNewModalStatus,
      closeIcon,
      uploadIcon,
      attachIcon,
    };
  },
  components: {},
});
</script>
<style scoped>
.book-image-modal {
  min-width: 160px;
  max-width: 160px;
  height: 200px;
}
.change-image-btn {
  background: #7d919c;
  color: white;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  font-size: 16px;
  padding: 10px 23px;
}
.change-image-btn:hover {
  background: #3b4145;
}
.add-book-modal {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  border-radius: 10px;
  min-width: 470px;
}
</style>
