<template>
  <div
    class="flex justify-between border-b border-grey py-6 pr-3 pl-12 xl:pl-3 flex-wrap md:flex-nowrap gap-y-4"
  >
    <div class="flex items-center w-full md:w-auto">
      <h2 class="text-2xl text-charcoal-darker font-bold">{{ title }}</h2>
    </div>
    <div class="flex gap-x-6">
      <button
        @click="exportToExcel((type = 'book'))"
        v-if="action == 'Export'"
        class="add-new-button hover:opacity-90"
      >
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
        <span class="mr-2"> <img :src="helpIcon" alt="" /> </span>
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
import helpIcon from "../../assets/image/help.svg";
import * as XLSX from "xlsx";
export default defineComponent({
  name: "TopContent",
  props: {
    title: String,
    action: String,
  },
  setup() {
    const modal = useModalStore();
    const { updateAddNewModalStatus } = modal;

    const exportToExcel = (type) => {
      if (type == "book") {
        console.log(1212);
      }
      const data = [
        ["Name", "Age", "Gender"],
        ["John", 25, "Male"],
        ["Mary", 30, "Female"],
        ["Bob", 40, "Male"],
        ["Alice", 35, "Female"],
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "data.xlsx");
    };

    return {
      updateAddNewModalStatus,
      helpIcon,
      exportToExcel,
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
