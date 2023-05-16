<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openUpdateBookModal"
  >
    <form ref="updateForm" @submit.prevent="onSubmit" @keydown.enter="onSubmit">
      <input
        id="book-image"
        ref="fileImageInput"
        type="file"
        @click="handleClearImage"
        @input="previewFiles($event)"
        class="hidden"
        accept="image/*"
        name="image"
      />
      <div v-if="imageSrc" class="crop-image-wrapper">
        <vue-cropper
          ref="imageRef"
          :src="imageSrc"
          :aspect-ratio="176 / 215"
          :view-mode="1"
          :drag-mode="cropDragMode"
          :toggle-drag-mode-on-dblclick="false"
          :crop-box-movable="true"
          :crop-box-resizable="false"
        />
        <div class="crop-image-btn-wrapper">
          <button class="crop" @click="cropImage">Crop Image</button>
          <button class="cancel" @click="imageSrc = null">Cancel</button>
        </div>
      </div>
      <div v-if="bookDetail != null" class="update-book-modal max-h-screen">
        <div class="flex border-b border-gray-lighter pb-4 relative">
          <h3 class="text-xl font-bold text-blue-lighter w-4/5">
            Chỉnh sửa sách
          </h3>
          <span
            @click="updateBookModalStatus(false)"
            class="absolute right-0 cursor-pointer"
            ><img :src="closeIcon" alt="icon"
          /></span>
        </div>
        <!-- Có sách -->
        <div class="flex justify-between mt-6">
          <div class="mr-6 md:mr-10">
            <img
              class="book-image-modal"
              :src="
                previewImage != null
                  ? previewImage
                  : bookDetail != null
                  ? `https://static.eduso.vn/${bookDetail.bookMetadata[0].bookCover.path}`
                  : ''
              "
              alt=""
            />
          </div>
          <div class="book-info-wrapper">
            <p class="text-blue-lighter text-xl font-bold">
              {{ bookDetail.name }}
            </p>
            <p class="italic text-base text-grey-darker">
              {{ bookDetail.bookMetadata[0].bookContent }}
            </p>
            <p class="italic text-base text-grey-darker">
              {{ bookDetail.bookMetadata[0].author }}
            </p>
            <label for="book-image" class="change-image-btn cursor-pointer"
              >Đổi ảnh bìa</label
            >
          </div>
        </div>
        <div class="w-1/2 mt-6">
          <p
            class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
          >
            Phân loại:
          </p>
          <div class="relative mt-2">
            <select class="select w-full py-1">
              <option value="Cấp 1">Có bản quyền</option>
              <option value="Cấp 2">Không bản quyền</option>
            </select>
            <div
              class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
            >
              <span class="triangle_up active:border-b-black"></span>
              <span class="triangle_down active:border-t-black"></span>
            </div>
            <span
              class="absolute text-red -bottom-5 text-xs whitespace-nowrap left-0"
              v-if="error.level"
            >
              {{ error.level }}
            </span>
          </div>
        </div>
        <!-- info -->
        <div class="flex gap-x-4 mt-2">
          <div class="w-1/3">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Cấp học:
            </p>
            <div class="relative mt-2">
              <select
                @change="error.level = ''"
                v-model="bookInfo.level"
                class="select w-full py-1"
              >
                <option value="Cấp 1">Cấp 1</option>
                <option value="Cấp 2">Cấp 2</option>
                <option value="Cấp 3">Cấp 3</option>
                <option value="Đại học">Đại học</option>
              </select>
              <div
                class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
              >
                <span class="triangle_up active:border-b-black"></span>
                <span class="triangle_down active:border-t-black"></span>
              </div>
              <span
                class="absolute text-red -bottom-5 text-xs whitespace-nowrap left-0"
                v-if="error.level"
              >
                {{ error.level }}
              </span>
            </div>
          </div>
          <div class="w-1/3">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Môn học:
            </p>
            <div class="relative mt-2">
              <select
                @change="error.subject = ''"
                v-model="bookInfo.subject"
                class="select w-full py-1"
              >
                <option value="Toán">Toán</option>
                <option value="Ngữ văn">Ngữ văn</option>
                <option value="Tiếng anh">Tiếng anh</option>
              </select>
              <div
                class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
              >
                <span class="triangle_up active:border-b-black"></span>
                <span class="triangle_down active:border-t-black"></span>
              </div>
              <span
                class="absolute text-red -bottom-5 text-xs whitespace-nowrap left-0"
                v-if="error.subject"
              >
                {{ error.subject }}
              </span>
            </div>
          </div>
          <div class="w-1/3">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Chương trình:
            </p>
            <div class="relative mt-2">
              <input
                @input="updateAutocompleteProgram"
                class="select w-full py-1 text-2xs italic"
                v-model="studyProgram"
              />
              <div
                v-if="programAutocompletes.length > 0"
                class="autocomplete-wrapper"
              >
                <div
                  class="text-center border-b border-grey first:border-t-0 last:border-b-0 hover:bg-modal cursor-pointer"
                  v-for="(data, index) in programAutocompletes"
                  :key="index"
                  @click="updateStudyProgram(data)"
                >
                  {{ data }}
                </div>
              </div>
              <span
                class="absolute text-red -bottom-5 text-xs whitespace-nowrap left-0"
                v-if="error.program"
              >
                {{ error.program }}
              </span>
            </div>
          </div>
        </div>
        <!-- Price  -->
        <div class="flex gap-x-4 mt-4">
          <div class="w-1/2">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Giá niêm yết (VND):
            </p>
            <div class="relative mt-2">
              <input
                @change="checkPriceValidation(bookDetail.bookPrice, error)"
                class="select w-full py-1 text-2xs italic"
                v-model="bookDetail.bookPrice"
                type="number"
                name="BookPrice"
              />
              <span
                class="absolute text-red -bottom-5 text-xs whitespace-nowrap left-0"
                v-if="error.price"
              >
                {{ error.price }}
              </span>
            </div>
          </div>
          <div class="w-1/2">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Mức giảm giá (%):
            </p>
            <div class="relative mt-2">
              <input
                @change="checkDiscountValidation(bookDetail.discount, error)"
                type="number"
                class="select w-full py-1 text-2xs italic"
                v-model="bookDetail.discount"
                name="Discount"
              />
              <span
                class="absolute text-red -bottom-5 text-xs whitespace-nowrap left-0"
                v-if="error.discount"
              >
                {{ error.discount }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center mt-6">
          <button
            type="submit"
            class="bg-green text-white text-base rounded px-4 py-2 hover:opacity-90"
          >
            Lưu thay đổi
          </button>
        </div>
        <input class="hidden" :value="bookDetail.iD" name="ID" />
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import uploadIcon from "../../assets/image/upload.svg";
import downloadIcon from "../../assets/image/download.svg";
import attachIcon from "../../assets/image/attach.svg";
import {
  checkPriceValidation,
  checkDiscountValidation,
} from "../../uses/validation";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import axios from "axios";
export default defineComponent({
  name: "UpdateBookModal",
  setup() {
    const modal = useModalStore();
    const { openUpdateBookModal } = storeToRefs(modal);
    const { updateBookModalStatus, updateLoadingStatus } = modal;
    const bookStore = useBookStore();
    const { updateBook } = bookStore;
    const { bookDetail } = storeToRefs(bookStore);
    let previewImage = ref(null);
    let metaData = ref(null);
    let bookContent = ref(null);
    let studyProgram = ref(null);
    const imageSrc = ref(null);
    const imageRef = ref(null);
    const fileImageInput = ref(null);
    const updateForm = ref(null);
    const cropDragMode = ref("move");
    let listProgram = ["IELTS", "TOEIC"];
    let programAutocompletes = ref([]);
    let bookInfo = reactive({
      title: "",
      description: "",
      subDescription: "",
      publisher: "",
      level: "",
      subject: "",
      price: "",
      discount: "",
      discountEduso: "",
    });
    const error = reactive({
      image: "",
      metadata: "",
      bookcontent: "",
      level: "",
      subject: "",
      program: "",
      price: "",
      discount: "",
    });
    const handleClearImage = () => {
      if (fileImageInput.value && fileImageInput.value.files.length > 0) {
        fileImageInput.value.value = null;
      }
    };

    const cropImage = () => {
      const croppedCanvas = imageRef.value.cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();
      previewImage.value = croppedImage;
      imageSrc.value = null;
    };
    const previewFiles = (event) => {
      const file = event.target.files[0];
      const typeFile = file.name.split(".")[1];
      const imageTypes = ["jpg", "svg", "png", "webp", "jfif"];
      if (imageTypes.includes(typeFile)) {
        const theReader = new FileReader();
        theReader.onloadend = async () => {
          imageSrc.value = await theReader.result;
        };
        theReader.readAsDataURL(file);
        error.image = "";
      } else {
        error.image = "Chỉ hỗ trợ file ảnh";
      }
    };
    const onSubmit = () => {
      if (error.price == "" && error.discount == "") {
        updateLoadingStatus(true);
        const formData = new FormData(updateForm.value);
        formData.append("cropimage", previewImage.value);
        axios
          .post("https://apiadminbook.eduso.vn/api/book_store/save", formData)
          .then((response) => {
            updateBook(response.data);
            updateLoadingStatus(false);
            //Call API to add data
          });
        updateBookModalStatus(false);
      }
    };

    const uploadBookContent = (event) => {
      const file = event.target.files[0];
      const typeFile = file.name.split(".")[1];
      const docTypes = ["csv", "docx", "doc", "xlsx"];
      if (docTypes.includes(typeFile)) {
        bookContent.value = file.name;
        error.bookcontent = "";
      } else {
        error.bookcontent = "Chỉ hỗ trợ file tài liệu";
      }
    };

    const updateAutocompleteProgram = () => {
      if (studyProgram.value.length > 0) {
        programAutocompletes.value = listProgram.filter((data: string) =>
          data.toUpperCase().includes(studyProgram.value.toUpperCase())
        );
      } else {
        programAutocompletes.value = [];
      }
    };

    const updateStudyProgram = (data) => {
      studyProgram.value = data;
      programAutocompletes.value = [];
    };
    watch(
      () => bookDetail.value,
      () => {
        previewImage.value = `https://static.eduso.vn/${bookDetail.value.bookMetadata[0].bookCover.path}`;
      }
    );

    return {
      openUpdateBookModal,
      updateBookModalStatus,
      closeIcon,
      uploadIcon,
      downloadIcon,
      attachIcon,
      programAutocompletes,
      bookInfo,
      metaData,
      bookContent,
      previewFiles,
      previewImage,
      studyProgram,
      uploadBookContent,
      updateAutocompleteProgram,
      updateStudyProgram,
      onSubmit,
      error,
      checkPriceValidation,
      checkDiscountValidation,
      imageSrc,
      imageRef,
      cropImage,
      cropDragMode,
      fileImageInput,
      handleClearImage,
      bookDetail,
      updateForm,
    };
  },
  components: {
    VueCropper,
  },
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
.update-book-modal {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  border-radius: 10px;
  min-width: 470px;
}
.book-info-wrapper {
  position: relative;
  min-width: 50%;
}
.cropper-container.cropper-bg {
  background: black;
}
.crop-image-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  z-index: 10;
}
.crop-image-btn-wrapper {
  display: flex;
  column-gap: 20px;
}
.crop-image-btn-wrapper .crop {
  background: #3c9dd2;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
}
.crop-image-btn-wrapper .cancel {
  background: #c1272c;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
}
.crop-image-btn-wrapper {
  position: absolute;
  bottom: 4px;
  right: 16px;
}
@media screen and (max-width: 424px) {
  .update-book-modal {
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
