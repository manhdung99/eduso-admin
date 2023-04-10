<template>
  <div
    v-if="openLogoutModal"
    class="fixed top-0 left-0 right-0 bottom-0 bg-modal z-10"
  >
    <!-- Popup -->
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-lg z-10"
    >
      <h2 class="mb-4">Bạn có chắc chắn muốn đăng xuất?</h2>
      <div class="flex justify-end">
        <button
          class="bg-red-500 text-white py-2 px-4 rounded mr-4 hover:opacity-90"
        >
          Đăng xuất
        </button>
        <button
          @click="updateLogoutModalStatus(false)"
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
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "LogoutModal",
  setup() {
    const modal = useModalStore();
    const { updateLogoutModalStatus } = modal;
    const { openLogoutModal } = storeToRefs(modal);
    return { updateLogoutModalStatus, openLogoutModal };
  },
});
</script>
