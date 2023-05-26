<template>
  <div
    class="fixed top-0 right-0 left-0 bottom-0 bg-modal z-10"
    v-if="openAddNewModal"
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
      />
      <div v-if="bookDetail != null" class="add-new-book-modal max-h-screen">
        <div class="flex border-b border-gray-lighter pb-4 relative">
          <h3 class="text-xl font-bold text-blue-lighter w-4/5">Thêm Sách</h3>
          <span
            @click="updateAddNewModalStatus(false)"
            class="absolute right-0 cursor-pointer"
            ><img :src="closeIcon" alt="icon"
          /></span>
        </div>
        <!-- Có sách -->
        <div class="flex justify-between mt-6 flex-wrap md:flex-nowrap">
          <div class="mr-6 md:mr-10">
            <img
              class="book-image-modal"
              :src="
                previewImage != null
                  ? previewImage
                  : bookDetail != null
                  ? `https://static.eduso.vn/${bookDetail.Image}`
                  : ''
              "
              alt=""
            />
          </div>
          <div class="book-info-wrapper">
            <p class="text-blue-lighter text-xl font-bold">
              {{ bookDetail.Name }}
            </p>
            <div class="flex gap-x-4 items-center my-2 relative">
              <span
                class="text-blue-lighter text-lg font-bold whitespace-nowrap"
                >NXB :
              </span>
              <input
                v-model="bookInfo.publisher"
                class="select"
                name="Publisher"
              />
            </div>
            <div
              class="text-red-500"
              v-for="error in classify != 1
                ? v1$.publisher.$errors
                : v2$.publisher.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </div>
            <div
              v-if="bookDetail.Description != 'null'"
              v-html="bookDetail.Description"
            ></div>
          </div>
        </div>
        <div class="flex gap-x-4">
          <div class="w-1/2 mt-6">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Phân loại:
            </p>
            <div class="relative mt-2">
              <select v-model="classify" name="Type" class="select w-full py-1">
                <option value="0">Có bản quyền</option>
                <option value="1">Sách Tham Khảo</option>
              </select>
              <div
                class="absolute right-2 flex flex-col gap-y-1 top-1/2 -translate-y-1/2"
              >
                <span class="triangle_up active:border-b-black"></span>
                <span class="triangle_down active:border-t-black"></span>
              </div>
            </div>
          </div>
          <div class="w-1/2 mt-6 relative">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Mã sách:
            </p>
            <div class="relative mt-2">
              <input
                v-model="bookInfo.code"
                name="Code"
                class="select w-full py-1"
              />
            </div>
            <span
              class="text-red-500 -bottom-5 absolute left-0"
              v-for="error in classify != 1
                ? v1$.code.$errors
                : v2$.code.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </span>
          </div>
        </div>
        <!-- Date -->
        <div v-if="classify != 1" class="flex gap-x-4 mt-4">
          <div class="w-1/2">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Ngày bắt đầu:
            </p>
            <div class="relative mt-2">
              <input
                type="date"
                class="select w-full py-1"
                name="DateStartBuy"
                v-model="bookInfo.startDate"
              />
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.startDate.$errors
                  : v2$.startDate.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </span>
            </div>
          </div>

          <div class="w-1/2">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Ngày kết thúc:
            </p>
            <div class="relative mt-2">
              <input
                type="date"
                class="select w-full py-1"
                name="DateEndBuy"
                v-model="bookInfo.endDate"
                :min="bookInfo.startDate"
              />
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.endDate.$errors
                  : v2$.endDate.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </span>
            </div>
          </div>
        </div>
        <!-- info -->
        <div class="flex gap-x-4 mt-4 flex-wrap">
          <div class="w-full md:w-auto">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Môn học:
            </p>
            <div class="relative mt-2 md:w-40">
              <multiselect
                v-model="bookInfo.subject"
                :searchable="searchable"
                :options="subjects"
                valueProp="ID"
                track-by="Name"
                label="Name"
                name="SubjectID"
              ></multiselect>
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.subject.$errors
                  : v2$.subject.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </span>
            </div>
          </div>
          <div class="w-full md:w-auto">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Cấp học:
            </p>
            <div class="relative mt-2 md:w-40">
              <multiselect
                v-model="bookInfo.level"
                :searchable="searchable"
                :options="EducationLevels"
              ></multiselect>
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.level.$errors
                  : v2$.level.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </span>
            </div>
          </div>

          <div class="w-full md:w-auto">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Chương trình:
            </p>
            <div class="relative mt-2 md:w-50">
              <multiselect
                v-model="bookInfo.ProgramID"
                :searchable="searchable"
                :options="listProgram"
                valueProp="ID"
                track-by="Name"
                label="Name"
                name="ProgramID"
              ></multiselect>
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.ProgramID.$errors
                  : v2$.ProgramID.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </span>
            </div>
          </div>
        </div>
        <!-- Price  -->
        <div v-if="classify != 1" class="flex gap-x-4 mt-4">
          <div class="w-1/2">
            <p
              class="text-tiny md:text-base lg:text-lg text-blue-darker font-bold"
            >
              Giá niêm yết (VND):
            </p>
            <div class="relative mt-2">
              <input
                class="select w-full py-1 text-2xs italic"
                v-model="bookInfo.bookPrice"
                type="number"
                name="Price"
              />
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.bookPrice.$errors
                  : v2$.bookPrice.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
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
                type="number"
                class="select w-full py-1 text-2xs italic"
                v-model="bookInfo.discount"
                name="Sales"
              />
              <span
                class="text-red-500 -bottom-5 absolute left-0"
                v-for="error in classify != 1
                  ? v1$.discount.$errors
                  : v2$.discount.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </span>
            </div>
          </div>
        </div>
        <input class="hidden" name="bookID" :value="bookDetail.ID" />
        <div class="flex items-center justify-center mt-6">
          <button
            type="submit"
            class="bg-green text-white text-base rounded px-4 py-2 hover:opacity-90"
          >
            Thêm Sách
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { useCommonStore } from "../../stores/commonStore";
import { storeToRefs } from "pinia";
import closeIcon from "../../assets/image/close.svg";
import uploadIcon from "../../assets/image/upload.svg";
import downloadIcon from "../../assets/image/download.svg";
import attachIcon from "../../assets/image/attach.svg";
import Multiselect from "@vueform/multiselect";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, maxValue } from "@vuelidate/validators";
import {
  checkPriceValidation,
  checkDiscountValidation,
} from "../../uses/validation";
import { BASE_URL, ADD_BOOKS } from "../../constants";
import axios from "axios";
export default defineComponent({
  name: "addNewBookModal",
  components: {
    Multiselect,
  },
  setup() {
    const modal = useModalStore();
    const { openAddNewModal } = storeToRefs(modal);
    const { updateAddNewModalStatus, updateLibraryBookModal } = modal;
    const bookStore = useBookStore();
    const { addBook, removeLibraryBookAdded } = bookStore;
    const { bookDetail } = storeToRefs(bookStore);
    const { subjects, programs } = storeToRefs(useCommonStore());
    let previewImage = ref(null);
    let metaData = ref(null);
    let bookContent = ref(null);
    let studyProgram = ref(null);
    const programID = ref(null);
    const imageSrc = ref(null);
    const imageRef = ref(null);
    const searchable = ref(true);
    const fileImageInput = ref(null);
    const updateForm = ref(null);
    const cropDragMode = ref("move");
    let listProgram = ref([]);
    let programAutocompletes = ref([]);
    const subjectRef = ref(null);
    const classify = ref(0);
    let bookInfo = reactive({
      code: "",
      level: "",
      subject: "",
      publisher: "",
      discount: "",
      bookPrice: "",
      ProgramID: "",
      startDate: "",
      endDate: "",
    });
    const EducationLevels = ref([]);
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
    const onSubmit = async () => {
      let result;
      if (classify.value == 1) {
        result = await v2$.value.$validate();
      } else {
        result = await v1$.value.$validate();
      }
      if (result) {
        // updateLoadingStatus(true);
        const formData = new FormData(updateForm.value);
        formData.append("Level", bookInfo.level);
        formData.append("ProgramID", bookInfo.ProgramID);
        formData.append("SubjectID", bookInfo.subject);
        const url = BASE_URL + ADD_BOOKS;
        axios.post(url, formData).then((response) => {
          addBook(response.data.Data);
          removeLibraryBookAdded(response.data.Data.bookID);
          // updateLoadingStatus(false);
          //Call API to add data
        });
        updateAddNewModalStatus(false);
        updateLibraryBookModal(false);
      }
    };

    // const uploadBookContent = (event) => {
    //   const file = event.target.files[0];
    //   const typeFile = file.name.split(".")[1];
    //   const docTypes = ["csv", "docx", "doc", "xlsx"];
    //   if (docTypes.includes(typeFile)) {
    //     bookContent.value = file.name;
    //     error.bookcontent = "";
    //   } else {
    //     error.bookcontent = "Chỉ hỗ trợ file tài liệu";
    //   }
    // };

    const updateAutocompleteProgram = () => {
      console.log(studyProgram.value);
      console.log(listProgram);

      if (studyProgram.value.length > 0) {
        programAutocompletes.value = listProgram.value.filter((data) =>
          data.Name.toUpperCase().includes(studyProgram.value.toUpperCase())
        );
      } else {
        programAutocompletes.value = [];
      }
    };

    const updateStudyProgram = (data) => {
      studyProgram.value = data.Name;
      programID.value = data.ID;
      programAutocompletes.value = [];
    };
    const licenseRules = {
      code: { required }, // Matches state.firstName
      level: { required }, // Matches state.lastName
      subject: { required },
      publisher: { required },
      discount: { required, minValue: minValue(0), maxValue: maxValue(99) },
      bookPrice: { required, minValue: minValue(0) },
      ProgramID: { required },
      startDate: { required },
      endDate: { required },
    };
    const noLicenseRules = {
      code: { required }, // Matches state.firstName
      level: { required }, // Matches state.lastName
      subject: { required },
      publisher: { required },
      ProgramID: { required },
    };
    const v1$ = useVuelidate(licenseRules, bookInfo);
    const v2$ = useVuelidate(noLicenseRules, bookInfo);
    watch(
      () => bookDetail.value,
      () => {
        previewImage.value = `https://static.eduso.vn/${bookDetail.value.Image}`;
      }
    );
    watch(
      () => bookInfo.subject,
      () => {
        if (bookInfo.subject != null) {
          EducationLevels.value = subjects.value.filter(
            (subject) => subject.ID == bookInfo.subject
          )[0].EducationLevels;
          listProgram.value = programs.value.filter(
            (program) => program.MainSubjectID == bookInfo.subject
          );
        } else {
          EducationLevels.value = [];
          listProgram.value = [];
          bookInfo.level = null;
          bookInfo.ProgramID = null;
        }
      }
    );
    return {
      openAddNewModal,
      updateAddNewModalStatus,
      closeIcon,
      uploadIcon,
      downloadIcon,
      attachIcon,
      programAutocompletes,
      bookInfo,
      metaData,
      bookContent,
      // previewFiles,
      previewImage,
      studyProgram,
      // uploadBookContent,
      onSubmit,
      // error,
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
      subjects,
      programs,
      EducationLevels,
      subjectRef,
      updateAutocompleteProgram,
      updateStudyProgram,
      programID,
      searchable,
      listProgram,
      v1$,
      v2$,
      classify,
    };
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
.add-new-book-modal {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 24px;
  border-radius: 10px;
  min-width: 470px;
  max-width: 600px;
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
.autocomplete-wrapper {
  width: 100%;
  border: 1px solid #6f848f;
  border-radius: 6px;
  position: absolute;
  background: white;
  z-index: 1;
}
@media screen and (max-width: 767px) {
  .add-new-book-modal {
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
  .add-new-book-modal .book-info-wrapper {
    width: 100%;
  }
}
</style>
