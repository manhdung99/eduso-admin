<template>
  <div class="px-4">
    <div
      class="flex justify-between border-b border-grey py-6 pr-3 pl-12 flex-wrap md:flex-nowrap gap-y-4"
    >
      <div class="flex items-center w-full md:w-auto">
        <h2 class="text-2xl text-charcoal-darker font-bold">
          Quản lý người dùng
        </h2>
      </div>
      <div class="flex gap-x-6">
        <button
          @click="updateAddNewUserModalStatus(true)"
          class="add-new-user hover:opacity-90"
        >
          Tạo người dùng
        </button>
      </div>
    </div>
    <div class="flex items-center flex-wrap lg:flex-nowrap">
      <div
        @click.self="updateSearchAreaStatus(false)"
        class="flex py-8 flex-wrap lg:flex-nowrap justify-between gap-y-5 items-center"
      >
        <div class="w-75 relative md:mb-0">
          <input
            class="input search-input w-full"
            placeholder="Tìm kiếm (tên sản phẩm, mã...)"
            v-model="searchText"
          />
          <span class="absolute right-4 top-1/2 -translate-y-1/2">
            <img :src="searchIcon" alt="" />
          </span>
          <SearchBookModal v-if="openSearchArea" />
        </div>
        <div class="w-50 relative ml-8">
          <div class="absolute -top-5 font-bold">Loại người dùng</div>
          <div>
            <multiselect
              v-model="usertype"
              searchable="searchable"
              :options="types"
              valueProp="ID"
              track-by="Name"
              label="Name"
              name="SubjectID"
            ></multiselect>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-y-auto mb-4">
      <NguoiDungTable />
    </div>
    <TablePagination />
  </div>
  <addNewUserModal />
</template>
<script lang="ts">
import TablePagination from "@/components/common/TablePagination.vue";
import NguoiDungTable from "@/components/table/NguoiDungTable.vue";
import { useUserStore } from "../stores/userStore";
import downArrow from "../../src/assets/image/down-arrow.svg";
import searchIcon from "../assets/image/search.svg";
import { usePaginationStore } from "@/stores/commonStore";
import { onMounted, ref } from "vue";
import { useSearchStore } from "../stores/searchStore";
import { useModalStore } from "../stores/modalStore";
import { storeToRefs } from "pinia";
import Multiselect from "@vueform/multiselect";
import addNewUserModal from "@/components/modal/addNewUserModal.vue";
import SearchBookModal from "@/components/modal/searchBookModal.vue";
export default {
  name: "QuanLyNguoiDung",
  components: {
    NguoiDungTable,
    TablePagination,
    Multiselect,
    addNewUserModal,
    SearchBookModal,
  },
  setup() {
    const userStore = useUserStore();
    const pagination = usePaginationStore();
    const { getUser } = userStore;
    const { getPagination } = pagination;
    const searchStore = useSearchStore();
    const { searchText, openSearchArea } = storeToRefs(searchStore);
    const { updateSearchAreaStatus } = searchStore;
    const { updateAddNewUserModalStatus } = useModalStore();
    const usertype = ref("Quản trị viên");
    const types = ["Quản trị viên", "Người dùng"];

    const listUsers = [
      {
        id: 1,
        userEmail: "nguyenvana@gmail.com",
        userName: "Nguyễn Văn A",
        userType: "Quản trị viên",
        IsPublish: false,
      },
      {
        id: 2,
        userEmail: "nguyenvanb@gmail.com",
        userName: "Nguyễn Văn B",
        userType: "Người dùng",
        IsPublish: true,
      },
      {
        id: 3,
        userEmail: "nguyenvanc@gmail.com",
        userName: "Nguyễn Văn C",
        userType: "Người dùng",
        IsPublish: false,
      },
      {
        id: 4,
        userEmail: "nguyenvand@gmail.com",
        userName: "Nguyễn Văn D",
        userType: "Người dùng",
        IsPublish: false,
      },
    ];
    onMounted(() => {
      getUser(listUsers);
      getPagination(1);
    });
    return {
      downArrow,
      searchText,
      searchIcon,
      openSearchArea,
      updateSearchAreaStatus,
      usertype,
      types,
      updateAddNewUserModalStatus,
    };
  },
};
</script>
<style>
.add-new-user {
  color: white;
  background: #26a433;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 32px;
  white-space: nowrap;
}
</style>
