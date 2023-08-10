<template>
  <div
    v-if="openRemoveUserModal"
    class="fixed top-0 left-0 right-0 bottom-0 bg-modal z-10"
  >
    <!-- Popup -->
    <div
      v-if="userDetail"
      class="w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-10"
    >
      <h2 class="mb-4">
        Bạn có chắc chắn muốn xoá tài khoản {{ userDetail.Email }}?
      </h2>
      <div class="flex justify-end">
        <button
          @click="deleteAction"
          class="bg-red-500 text-white py-2 px-4 rounded mr-4 hover:opacity-90"
        >
          Xoá
        </button>
        <button
          @click="updateRemoveUserModalStatus(false)"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-90"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useUserStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";
import router from "@/router";
export default defineComponent({
  name: "deleteUserModal",
  setup() {
    const modal = useModalStore();
    const { updateRemoveUserModalStatus } = modal;
    const { openRemoveUserModal } = storeToRefs(modal);
    const { userDetail } = storeToRefs(useUserStore());
    const { deleteUser } = useUserStore();
    const deleteAction = () => {
      console.log(userDetail.value.ID);
      deleteUser(userDetail.value.ID);
      updateRemoveUserModalStatus(false);
    };
    return {
      updateRemoveUserModalStatus,
      openRemoveUserModal,
      userDetail,
      deleteAction,
    };
  },
});
</script>
