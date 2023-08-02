<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openAddNewUserModal"
  >
    <form ref="updateForm" @submit.prevent="onSubmit" @keydown.enter="onSubmit">
      <div class="add-new-user-modal max-h-screen">
        <div class="text-blue-400 text-center font-bold text-xl mb-4 relative">
          Tạo người dùng mới
          <span
            @click="updateAddNewUserModalStatus(false)"
            class="absolute right-0 cursor-pointer"
            ><img :src="closeIcon" alt="icon"
          /></span>
        </div>

        <!-- info  -->
        <div class="pr-6">
          <div class="justify-between w-full flex mb-2">
            <span class="font-bold text-base">Email: </span>
            <input class="input w-50" type="text" />
          </div>
          <div class="justify-between w-full flex mb-2">
            <span class="font-bold text-base">Tên: </span>
            <input class="input w-50" type="text" />
          </div>
          <div class="justify-between w-full flex mb-2">
            <span class="font-bold text-base">Password: </span>
            <input class="input w-50" type="text" />
          </div>
          <div class="justify-between w-full flex mb-2">
            <span class="font-bold text-base">Loại người dùng: </span>
            <div class="w-50">
              <multiselect
                v-model="usertype"
                :searchable="searchable"
                :options="types"
                valueProp="ID"
                track-by="Name"
                label="Name"
                name="SubjectID"
              ></multiselect>
            </div>
          </div>
        </div>
        <!-- Quản lý sách  -->
        <div
          class="overflow-hidden transition-all"
          :class="showDetailAdminBook ? 'h-auto' : 'h-12'"
        >
          <div class="bg-gray-200 font-medium py-2 pl-2 relative mb-4">
            Trang quản lý sách
            <span
              @click="showDetailAdminBook = !showDetailAdminBook"
              class="absolute right-4 cursor-pointer"
            >
              <img
                class="w-6 h-6"
                :src="showDetailAdminBook ? downIcon : rightIcon"
                alt=""
              />
            </span>
          </div>
          <div class="px-6">
            <div class="flex items-center justify-between my-2">
              <span class="font-medium">Xem sách</span>
              <input class="" type="checkbox" name="" id="" />
            </div>
            <div class="flex items-center justify-between my-2">
              <span class="font-medium">Sửa thông tin sách</span>
              <input class="" type="checkbox" name="" id="" />
            </div>
            <div class="flex items-center justify-between my-2">
              <span class="font-medium">Xuất bản sách</span>
              <input class="" type="checkbox" name="" id="" />
            </div>
            <div class="flex items-center justify-between my-2">
              <span class="font-medium">Xoá sách</span>
              <input class="" type="checkbox" name="" id="" />
            </div>
          </div>
        </div>
        <!-- Quản lý doanh thu  -->
        <div
          class="overflow-hidden"
          :class="showDetailRevenueBook ? 'h-auto' : 'h-12'"
        >
          <div class="bg-gray-200 font-medium py-2 pl-2 relative mb-4">
            Trang quản lý doanh thu sách
            <span
              @click="showDetailRevenueBook = !showDetailRevenueBook"
              class="absolute right-4 cursor-pointer"
            >
              <img
                class="w-6 h-6"
                :src="showDetailRevenueBook ? downIcon : rightIcon"
                alt=""
              />
            </span>
          </div>
          <div class="px-6">
            <div class="flex items-center justify-between my-2">
              <span class="font-medium">Xem sách</span>
              <input class="" type="checkbox" name="" id="" />
            </div>
            <div class="flex items-center justify-between my-2">
              <span class="font-medium">Sửa thông tin sách</span>
              <input class="" type="checkbox" name="" id="" />
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <button
            class="bg-green text-white text-base rounded px-4 py-2 hover:opacity-90 font-medium"
            type="submit"
          >
            Tạo người dùng
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import uploadIcon from "../../assets/image/upload.svg";
import downloadIcon from "../../assets/image/download.svg";
import attachIcon from "../../assets/image/attach.svg";
import downIcon from "../../assets/image/user-icon-down.svg";
import rightIcon from "../../assets/image/user-icon-right.svg";
import Multiselect from "@vueform/multiselect";
import {
  checkPriceValidation,
  checkDiscountValidation,
} from "../../uses/validation";
import defaultBookCover from "../../assets/image/default-book-image.jpg";

export default defineComponent({
  name: "addNewBookModal",
  components: {
    Multiselect,
  },
  setup() {
    const modal = useModalStore();
    const { openAddNewUserModal } = storeToRefs(modal);
    const { updateAddNewUserModalStatus } = modal;
    let previewImage = ref(null);
    let metaData = ref(null);
    let bookContent = ref(null);
    let studyProgram = ref(null);
    const searchable = ref(true);
    let listProgram = ref([]);
    const usertype = ref("Quản trị viên");
    const types = ["Quản trị viên", "Người dùng"];
    const showDetailAdminBook = ref(false);
    const showDetailRevenueBook = ref(false);
    const onSubmit = async () => {
      console.log("submit");
      updateAddNewUserModalStatus(false);
    };

    return {
      openAddNewUserModal,
      closeIcon,
      uploadIcon,
      downloadIcon,
      attachIcon,
      metaData,
      bookContent,
      previewImage,
      studyProgram,
      onSubmit,
      checkPriceValidation,
      checkDiscountValidation,
      listProgram,
      defaultBookCover,
      downIcon,
      rightIcon,
      usertype,
      types,
      searchable,
      showDetailAdminBook,
      showDetailRevenueBook,
      updateAddNewUserModalStatus,
    };
  },
});
</script>
<style scoped>
.add-new-user-modal {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  border-radius: 10px;
  min-width: 470px;
  max-width: 600px;
  overflow-y: auto;
}

@media screen and (max-width: 767px) {
  .add-new-user-modal {
    position: fixed;
    top: 4px;
    bottom: 4px;
    transform: translate(0, 0);
    left: 2px;
    right: 2px;
    overflow-y: auto;
    min-width: 300px;
    padding: 16px 12px;
  }
}
</style>
