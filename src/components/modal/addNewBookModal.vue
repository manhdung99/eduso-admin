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
                  : bookDetail.Image
                  ? `https://static.eduso.vn/${bookDetail.Image}`
                  : defaultBookCover
              "
              alt=""
            />
          </div>
          <div class="book-info-wrapper">
            <p class="text-blue-lighter text-xl font-bold">
              {{ bookDetail.Name }}
            </p>
            <div
              class="flex gap-x-4 items-center my-2 relative justify-between"
            >
              <span
                class="text-blue-lighter text-lg font-bold whitespace-nowrap"
                >Tác giả :
              </span>
              <input
                v-model="bookInfo.author"
                class="select flex-1"
                name="Author"
              />
            </div>
            <div
              class="text-red-500"
              v-for="error in classify != 1
                ? v1$.author.$errors
                : v2$.author.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </div>
            <div
              class="flex gap-x-4 items-center my-2 relative justify-between"
            >
              <span
                class="text-blue-lighter text-lg font-bold whitespace-nowrap"
                >NXB :
              </span>
              <input
                v-model="bookInfo.publisher"
                class="select flex-1"
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
              class="flex gap-x-4 items-center my-2 relative justify-between"
            >
              <span
                class="text-blue-lighter text-lg font-bold whitespace-nowrap"
                >Quyết định XB :
              </span>
              <input
                v-model="bookInfo.releaseID"
                class="select flex-1"
                name="releaseID"
              />
            </div>
            <div
              class="text-red-500"
              v-for="error in classify != 1
                ? v1$.releaseID.$errors
                : v2$.releaseID.$errors"
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
        <!-- Location -->
        <div class="mt-4">
          <div
            class="text-blue-lighter text-lg font-bold whitespace-nowrap mb-2"
          >
            Khu vực hiển thị :
          </div>
          <a-tree-select
            v-model:value="regionsvalue"
            style="width: 100%"
            :tree-data="treeData"
            tree-checkable
            allow-clear
            :show-checked-strategy="SHOW_PARENT"
            placeholder="Please select"
            tree-node-filter-prop="label"
          />
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
import { defineComponent, ref, reactive, watch, onMounted } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useBookStore } from "../../stores/booksStore";
import { useCommonStore } from "../../stores/commonStore";
import { useUserStore } from "../../stores/userStore";
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
import defaultBookCover from "../../assets/image/default-book-image.jpg";
import axios from "axios";
import { TreeSelect } from "ant-design-vue";
import { transmissionData } from "@/uses/common";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

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
    const { addBook, removeLibraryBookAdded, getRegionsBook } = bookStore;
    const { bookDetail } = storeToRefs(bookStore);
    const { subjects, programs } = storeToRefs(useCommonStore());
    const { Access_Token } = storeToRefs(useUserStore());
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
    const regions = ref([]);
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
      releaseID: "",
      author: "",
    });
    //   {
    //     label: "Node1",
    //     value: "value1",
    //     children: [
    //       {
    //         label: "Child Node1",
    //         value: "value1-center1",
    //       },
    //       {
    //         label: "Child Node2",
    //         value: "value1-center2",
    //       },
    //     ],
    //   },
    //   {
    //     label: "Node2",
    //     value: "0-1",
    //     children: [
    //       {
    //         label: "Child Node3",
    //         value: "0-1-12121",
    //       },
    //       {
    //         label: "Child Node4",
    //         value: "0-1-13131",
    //       },
    //       {
    //         label: "Child Node5",
    //         value: "0-1-14141",
    //       },
    //     ],
    //   },
    // ];
    const regionsvalue = ref<string[]>([]);
    const treeData = ref([]);

    watch(regionsvalue, () => {
      console.log(regionsvalue.value);
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
        const dataLength = regionsvalue.value.length;
        const regions = [];
        const centers = [];
        for (let i = 0; i < dataLength; i++) {
          const regionData = regionsvalue.value[i];
          if (regionData.split("-").length > 1) {
            centers.push(regionData.split("-")[1]);
          } else {
            regions.push(regionData);
          }
        }
        const formData = new FormData(updateForm.value);
        formData.append("Level", bookInfo.level);
        formData.append("ProgramID", bookInfo.ProgramID);
        formData.append("SubjectID", bookInfo.subject);
        transmissionData(formData, centers, "Centers");
        transmissionData(formData, regions, "Regions");
        const url =
          process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ADD_BOOKS;
        axios
          .post(url, formData, {
            headers: {
              Authorization: Access_Token.value,
            },
          })
          .then((response) => {
            if (response.data.Code == 200) {
              addBook(response.data.Data);
              removeLibraryBookAdded(response.data.Data.bookID);
              updateAddNewModalStatus(false);
              updateLibraryBookModal(false);
            } else {
              alert(response.data.Message);
            }
          });
      }
    };

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
      code: { required },
      level: { required },
      subject: { required },
      publisher: { required },
      author: { required },
      releaseID: { required },
      discount: { required, minValue: minValue(0), maxValue: maxValue(100) },
      bookPrice: { required, minValue: minValue(0) },
      ProgramID: { required },
      startDate: { required },
      endDate: { required },
    };
    const noLicenseRules = {
      code: { required },
      level: { required },
      subject: { required },
      publisher: { required },
      author: { required },
      releaseID: { required },
      ProgramID: { required },
    };
    const v1$ = useVuelidate(licenseRules, bookInfo);
    const v2$ = useVuelidate(noLicenseRules, bookInfo);
    watch(
      () => bookDetail.value,
      () => {
        previewImage.value = bookDetail.value.Image
          ? `https://static.eduso.vn/${bookDetail.value.Image}`
          : null;
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
    watch(
      () => openAddNewModal.value,
      () => {
        bookInfo.bookPrice = "";
        bookInfo.code = "";
        bookInfo.discount = "";
        bookInfo.endDate = "";
        bookInfo.level = "";
        bookInfo.ProgramID = "";
        bookInfo.publisher = "";
        bookInfo.releaseID = "";
        bookInfo.author = "";
        bookInfo.startDate = "";
        bookInfo.subject = null;
        classify.value = 0;
      }
    );
    onMounted(async () => {
      const data = await getRegionsBook();
      treeData.value = data;
    });
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
      defaultBookCover,
      regionsvalue,
      treeData,
      SHOW_PARENT,
      regions,
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
  overflow-y: auto;
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
