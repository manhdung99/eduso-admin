<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openUpdateBookModal"
  >
    <form @submit.prevent="onSubmit" @keydown.enter="onSubmit">
      <input
        id="book-image"
        ref="fileInput"
        type="file"
        @input="previewFiles($event)"
        class="hidden"
        accept="image/*"
      />
      <input
        id="book-metadata"
        type="file"
        @input="uploadMetadata($event)"
        class="hidden"
        accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
      />
      <input
        id="book-content"
        type="file"
        @input="uploadBookContent($event)"
        class="hidden"
        accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
      />
      <div class="update-book-modal">
        <div class="flex border-b border-gray-lighter pb-4 relative">
          <h3 class="text-xl font-bold text-blue-lighter">Chỉnh sửa sách</h3>
          <span
            @click="updateBookModalStatus(false)"
            class="absolute right-0 cursor-pointer"
            ><img :src="closeIcon" alt="icon"
          /></span>
        </div>
        <!-- Có sách -->
        <div class="flex justify-between mt-6">
          <div class="mr-10">
            <img class="book-image-modal" :src="previewImage" alt="" />
          </div>
          <div class="book-info-wrapper">
            <p class="text-blue-lighter text-xl font-bold">
              {{ bookInfo.title }}
            </p>
            <p class="italic text-base text-grey-darker">
              {{ bookInfo.description }}
            </p>
            <p class="italic text-base text-grey-darker">
              {{ bookInfo.subDescription }}
            </p>
            <label for="book-image" class="change-image-btn cursor-pointer"
              >Đổi ảnh bìa</label
            >
          </div>
        </div>
        <!-- Meta data of book  -->
        <div>
          <div class="mt-2 relative">
            <p class="text-blue-darker text-lg font-bold">Metadata của sách:</p>
            <div class="flex justify-between items-center mt-2">
              <div class="flex">
                <span><img :src="attachIcon" alt="icon" /></span>
                <span
                  class="text-grey-darker text-base italic ml-4 bg-modal px-3 py-1 clip-text"
                  >{{ metaData }}</span
                >
              </div>
              <div class="flex gap-x-4">
                <img class="cursor-pointer" :src="downloadIcon" alt="icon" />
                <label for="book-metadata">
                  <img
                    class="cursor-pointer hover:opacity-80"
                    :src="uploadIcon"
                    alt="icon"
                  />
                </label>
              </div>
              <span
                class="absolute text-red -bottom-3 text-xs"
                v-if="error.metadata"
              >
                {{ error.metadata }}
              </span>
            </div>
          </div>
        </div>
        <!-- Nội dung sách  -->
        <div>
          <div class="mt-2 relative">
            <p class="text-blue-darker text-lg font-bold">Nội dung sách:</p>
            <div class="flex justify-between items-center mt-2">
              <div class="flex">
                <span><img :src="attachIcon" alt="icon" /></span>
                <span
                  class="text-grey-darker text-base italic ml-4 bg-modal px-3 py-1 clip-text"
                  >{{ bookContent }}</span
                >
              </div>
              <div class="flex gap-x-4">
                <img class="cursor-pointer" :src="downloadIcon" alt="icon" />
                <label for="book-content">
                  <img
                    class="cursor-pointer hover:opacity-80"
                    :src="uploadIcon"
                    alt="icon"
                  />
                </label>
              </div>
              <span
                class="absolute text-red -bottom-3 text-xs"
                v-if="error.bookcontent"
              >
                {{ error.bookcontent }}
              </span>
            </div>
          </div>
        </div>
        <!-- info -->
        <div class="flex gap-x-4 mt-2">
          <div class="w-1/3">
            <p class="text-base md:text-lg text-blue-darker font-bold">
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
            <p class="text-base md:text-lg text-blue-darker font-bold">
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
            <p class="text-base md:text-lg text-blue-darker font-bold">
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
            <p class="text-base md:text-lg text-blue-darker font-bold">
              Giá niêm yết (VND):
            </p>
            <div class="relative mt-2">
              <input
                @change="checkPriceValidation(bookInfo, error)"
                class="select w-full py-1 text-2xs italic"
                v-model="bookInfo.price"
                type="number"
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
            <p class="text-base md:text-lg text-blue-darker font-bold">
              Mức giảm giá (%):
            </p>
            <div class="relative mt-2">
              <input
                type="number"
                @change="checkDiscountValidation(bookInfo, error)"
                class="select w-full py-1 text-2xs italic"
                v-model="bookInfo.discount"
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
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, reactive, watch } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import uploadIcon from "../../assets/image/upload.svg";
import downloadIcon from "../../assets/image/download.svg";
import attachIcon from "../../assets/image/attach.svg";
import axios from "axios";
import {
  checkPriceValidation,
  checkDiscountValidation,
  checkValidationBeforeSubmit,
} from "../../uses/validation";
export default defineComponent({
  name: "UpdateBookModal",
  setup() {
    const modal = useModalStore();
    const { openUpdateBookModal, currentBookUpdate } = storeToRefs(modal);
    const { updateBookModalStatus } = modal;
    const bookStore = useBookStore();
    const { updateBook } = bookStore;
    let previewImage = ref(null);
    let metaData = ref(null);
    let bookContent = ref(null);
    let studyProgram = ref(null);
    let listProgram = ["IELTS", "TOEIC"];
    let programAutocompletes = ref([]);
    const book = ref({});
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

    const previewFiles = (event) => {
      const file = event.target.files[0];
      const typeFile = file.name.split(".")[1];
      const imageTypes = ["jpg", "svg", "png", "webp"];
      if (imageTypes.includes(typeFile)) {
        const theReader = new FileReader();
        theReader.onloadend = async () => {
          previewImage.value = await theReader.result;
        };
        theReader.readAsDataURL(file);
        error.image = "";
      } else {
        error.image = "Chỉ hỗ trợ file ảnh";
      }
    };
    const onSubmit = () => {
      // Validate

      // Call API

      if (
        checkValidationBeforeSubmit(
          metaData,
          previewImage,
          bookInfo,
          studyProgram,
          bookContent,
          error
        )
      ) {
        const book = {
          bookInformation: {
            image: previewImage.value,
            title: bookInfo.title,
            description: bookInfo.description,
            subDescription: bookInfo.subDescription,
          },
          publisher: bookInfo.publisher,
          listedPrice: bookInfo.price,
          discountEduso: bookInfo.discountEduso,
          discount: bookInfo.discount,
          metaData: metaData.value,
          content: bookContent.value,
          level: bookInfo.level,
          subject: bookInfo.subject,
          programme: studyProgram.value,
          bookId: currentBookUpdate.value,
        };
        updateBook(book);
        updateBookModalStatus(false);
      }
    };
    const uploadMetadata = (event) => {
      const file = event.target.files[0];
      const typeFile = file.name.split(".")[1];
      const docTypes = ["csv", "docx", "doc", "xlsx"];
      if (docTypes.includes(typeFile)) {
        metaData.value = file.name;
        error.metadata = "";
      } else {
        error.metadata = "Chỉ hỗ trợ file tài liệu";
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

    watchEffect(() => {
      axios
        .get(
          `https://642e3a278ca0fe3352cb2e35.mockapi.io/books/${currentBookUpdate.value}`
        )
        .then((response) => {
          let data = response.data;
          bookInfo.title = data.bookInformation.title;
          bookInfo.description = data.bookInformation.description;
          bookInfo.subDescription = data.bookInformation.subDescription;
          bookInfo.level = data.level;
          bookInfo.subject = data.subject;
          bookInfo.price = data.listedPrice;
          bookInfo.discount = data.discount;
          previewImage.value = data.bookInformation.image;
          metaData.value = data.metaData;
          bookContent.value = data.content;
          studyProgram.value = data.programme;
        });
    });

    // Change metadata
    watch(metaData, () => {
      bookInfo.title = "SGK Ngữ Văn 12(Tập 1)";
      bookInfo.description = "Bộ Giáo dục & Đào tạo";
      bookInfo.publisher = "NXB Giáo dục";
      bookInfo.level = "Cấp 1";
      bookInfo.subject = "Ngữ văn";
      bookInfo.price = "100000";
      bookInfo.discount = "15";
      bookInfo.discountEduso = "123456";
      studyProgram.value = "IELTS";
    });
    return {
      openUpdateBookModal,
      updateBookModalStatus,
      closeIcon,
      uploadIcon,
      downloadIcon,
      attachIcon,
      programAutocompletes,
      book,
      bookInfo,
      metaData,
      bookContent,
      previewFiles,
      previewImage,
      studyProgram,
      uploadMetadata,
      uploadBookContent,
      updateAutocompleteProgram,
      updateStudyProgram,
      onSubmit,
      error,
      checkPriceValidation,
      checkDiscountValidation,
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
</style>
