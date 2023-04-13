<template>
  <div
    class="flex justify-between border-b border-grey py-6 pr-3 pl-12 xl:pl-3 flex-wrap md:flex-nowrap gap-y-4"
  >
    <div class="flex items-center w-full md:w-auto">
      <h2 class="text-2xl text-charcoal-darker font-bold">{{ title }}</h2>
    </div>
    <div class="flex gap-x-6">
      <button v-if="action == 'Export'" class="add-new-button hover:opacity-90">
        Xuất Excel
      </button>
      <button
        v-else
        @click="updateAddNewModalStatus(true)"
        class="add-new-button hover:opacity-90"
      >
        Thêm sách
      </button>
      <button class="help-button">
        <span class="mr-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 9.4375C11.5178 9.4375 11.9375 9.85723 11.9375 10.375V16.625C11.9375 17.1428 11.5178 17.5625 11 17.5625C10.4822 17.5625 10.0625 17.1428 10.0625 16.625V10.375C10.0625 9.85723 10.4822 9.4375 11 9.4375Z"
              fill="#355D73"
            />
            <path
              d="M11 7.25C11.6904 7.25 12.25 6.69036 12.25 6C12.25 5.30964 11.6904 4.75 11 4.75C10.3096 4.75 9.75 5.30964 9.75 6C9.75 6.69036 10.3096 7.25 11 7.25Z"
              fill="#355D73"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.0625 11C0.0625 4.95938 4.95938 0.0625 11 0.0625C17.0406 0.0625 21.9375 4.95938 21.9375 11C21.9375 17.0406 17.0406 21.9375 11 21.9375C4.95938 21.9375 0.0625 17.0406 0.0625 11ZM11 1.9375C5.99492 1.9375 1.9375 5.99492 1.9375 11C1.9375 16.0051 5.99492 20.0625 11 20.0625C16.0051 20.0625 20.0625 16.0051 20.0625 11C20.0625 5.99492 16.0051 1.9375 11 1.9375Z"
              fill="#355D73"
            />
          </svg>
        </span>
        <span> Trợ giúp </span>
      </button>
    </div>
  </div>
  <AddNewModal />
</template>
<script lang="ts">
import AddNewModal from "../modal/addNewModal.vue";
import { useModalStore } from "../../stores/modalStore";
import { defineComponent } from "vue";
export default defineComponent({
  name: "TopContent",
  props: {
    title: String,
    action: String,
  },
  setup() {
    const modal = useModalStore();
    const { updateAddNewModalStatus } = modal;
    return {
      updateAddNewModalStatus,
    };
  },
  components: {
    AddNewModal,
  },
});
</script>
<style scoped>
.help-button {
  color: #355d73;
  border: 2px solid #355d73;
  display: flex;
  padding: 0 28px;
  border-radius: 5px;
  align-items: center;
  font-size: 18px;
  white-space: nowrap;
}
.add-new-button {
  color: white;
  background: #26a433;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 32px;
  white-space: nowrap;
}
@media screen and (max-width: 785px) {
  .help-button {
    padding: 0 16px;
  }
  .add-new-button {
    padding: 10px 18px;
  }
}
</style>
