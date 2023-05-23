<template>
  <div class="px-4">
    <TopContentVue :title="title" />
    <div class="px-0 lg:px-4 flex items-center flex-wrap lg:flex-nowrap">
      <div class="w-full 2xl:w-2/3">
        <SearchBook />
      </div>
      <div
        class="w-full 2xl:w-1/3 md:pl-0 lg:pl-8 2xl:pl-12 mb-6 lg:mb-0 flex gap-x-2 3xl:gap-x-4"
      >
        <div class="relative w-51.25">
          <multiselect
            v-model="subject"
            :searchable="searchable"
            :options="subjects"
            valueProp="ID"
            track-by="Name"
            label="Name"
            placeholder="Môn học"
          ></multiselect>
        </div>
        <div class="relative w-51.25">
          <multiselect
            v-model="program"
            :searchable="searchable"
            :options="programs"
            valueProp="ID"
            track-by="Name"
            label="Name"
            placeholder="Chương trình học"
          ></multiselect>
        </div>
      </div>
    </div>
    <div class="overflow-auto mb-4">
      <BookTableVue />
    </div>
    <TablePagination />
  </div>
</template>
<script lang="ts">
import TopContentVue from "@/components/common/TopContent.vue";
import SearchBook from "@/components/common/SearchBook.vue";
import BookTableVue from "@/components/quanlykhosach/BookTable.vue";
import TablePagination from "@/components/common/TablePagination.vue";
import downArrow from "../../src/assets/image/down-arrow.svg";
import { useBookStore } from "../stores/booksStore";
import { BASE_URL, GET_LIBRARY, GET_BOOKS } from "../constants";
import convertData from "../uses/convertData";
import { usePaginationStore, useCommonStore } from "../stores/commonStore";
import { useSearchStore } from "../stores/searchStore";
import Multiselect from "@vueform/multiselect";
import axios from "axios";
import debounce from "lodash/debounce";
import { storeToRefs } from "pinia";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useModalStore } from "../stores/modalStore";
export default defineComponent({
  name: "QuanLyKhoSach",
  components: {
    TopContentVue,
    SearchBook,
    BookTableVue,
    TablePagination,
    Multiselect,
  },
  setup() {
    const title = "Quản lý kho sách";
    const bookStore = useBookStore();
    const pagination = usePaginationStore();
    const { programs, subjects, fromDate, toDate } = storeToRefs(
      useCommonStore()
    );
    const { getSearchtBooks, getAuthors, updateSearchAreaStatus } =
      useSearchStore();
    const { searchText } = storeToRefs(useSearchStore());
    const { convertTimestampToDate } = convertData();
    const { getBooks } = bookStore;
    const { getPagination, updatePageIndex } = pagination;
    const { updateLoadingStatus } = useModalStore();
    const program = ref("");
    const subject = ref("");
    const searchable = true;
    const value = ref(null);
    const getBookData = () => {
      updateLoadingStatus(true);
      const url =
        BASE_URL +
        GET_BOOKS +
        "?start=" +
        convertTimestampToDate(fromDate.value) +
        "&end=" +
        convertTimestampToDate(toDate.value);
      axios.get(url).then((response) => {
        getBooks(response.data.Data);
        updateLoadingStatus(false);
      });
    };
    const filterBook = () => {
      updateLoadingStatus(true);
      const url =
        BASE_URL +
        GET_BOOKS +
        "?start=" +
        convertTimestampToDate(fromDate.value) +
        "&end=" +
        convertTimestampToDate(toDate.value) +
        `&subjectid=${subject.value}` +
        `&programid=${program.value}`;
      axios.get(url).then((response) => {
        getBooks(response.data.Data);
        updateLoadingStatus(false);
      });
    };
    const filterBookByText = debounce(() => {
      if (searchText.value.length > 0) {
        const url =
          BASE_URL +
          GET_BOOKS +
          "?start=" +
          convertTimestampToDate(fromDate.value) +
          "&end=" +
          convertTimestampToDate(toDate.value) +
          `&subjectid=${subject.value}` +
          `&programid=${program.value}` +
          `&text=${searchText.value}`;
        updateSearchAreaStatus(true);
        const fetchBooks = async () => {
          try {
            const response = await axios.get(url);
            getSearchtBooks(response.data.Data);
          } catch (err) {
            throw new Error("Some thing went wrong");
          }
        };
        fetchBooks();
      } else {
        getSearchtBooks([]);
        getAuthors([]);
      }
    }, 1000);
    watch([program, subject, fromDate, toDate], () => {
      if (program.value == null) program.value = "";
      if (subject.value == null) subject.value = "";
      filterBook();
      // if (fromDate.value < toDate.value) {
      // }
    });
    watch(
      () => searchText.value,
      () => {
        filterBookByText();
      }
    );
    onMounted(getBookData);
    return {
      title,
      downArrow,
      programs,
      subjects,
      value,
      searchable,
      program,
      subject,
    };
  },
});
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
