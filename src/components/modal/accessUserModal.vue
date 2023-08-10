<template>
  <div
    v-if="openAccessUserModal"
    class="fixed top-0 left-0 right-0 bottom-0 bg-modal z-10"
  >
    <!-- Popup -->
    <div
      v-if="userDetail"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-10 w-90"
    >
      <h2 class="mb-4">
        Bạn có chắc chắn muốn {{ userDetail.IsActive ? "khoá" : "mở" }} quyền
        tài khoản {{ userDetail.Email }} ?
      </h2>
      <div class="flex justify-end">
        <button
          @click="accessAction"
          class="bg-red-500 text-white py-2 px-4 rounded mr-4 hover:opacity-90"
        >
          {{ userDetail.IsActive ? "Khoá" : "Mở" }}
        </button>
        <button
          @click="updateAccessUserModalStatus(false)"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:opacity-90"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useModalStore } from "../../stores/modalStore";
import { useUserStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "accessUserModal",
  setup() {
    const modal = useModalStore();
    const { updateAccessUserModalStatus } = modal;
    const { openAccessUserModal } = storeToRefs(modal);
    const { userDetail } = storeToRefs(useUserStore());
    const { accessUser } = useUserStore();
    const accessAction = () => {
      accessUser(userDetail.value.ID);
      updateAccessUserModalStatus(false);
    };
    return {
      updateAccessUserModalStatus,
      openAccessUserModal,
      userDetail,
      accessAction,
    };
  },
});
</script>
