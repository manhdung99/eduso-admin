<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(column, index) in columns"
          :key="index"
          :style="{ width: column.width + 'px' }"
          @mousedown="startResize(index, $event)"
        >
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          {{ row[column.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "QuanLyTaiKhoan",
  setup() {
    const resizeColumnIndex = ref(-1);
    const resizeStartX = ref(0);
    const resizeStartWidth = ref(0);
    const columns = [
      { label: "ID", field: "id", width: 100 },
      { label: "Name", field: "name", width: 200 },
      { label: "Age", field: "age", width: 100 },
      { label: "Email", field: "email", width: 300 },
    ];
    const data = [
      { id: 1, name: "John Doe", age: 35, email: "john.doe@example.com" },
      { id: 2, name: "Jane Smith", age: 28, email: "jane.smith@example.com" },
      { id: 3, name: "Bob Johnson", age: 42, email: "bob.johnson@example.com" },
      { id: 4, name: "Alice Lee", age: 23, email: "alice.lee@example.com" },
    ];

    function startResize(index, event) {
      resizeColumnIndex.value = index;
      resizeStartX.value = event.clientX;
      resizeStartWidth.value = event.target.parentElement.offsetWidth;
      document.addEventListener("mousemove", handleResize);
      document.addEventListener("mouseup", stopResize);
    }

    function handleResize(event) {
      if (resizeColumnIndex.value > -1) {
        const newWidth =
          resizeStartWidth.value + (event.clientX - resizeStartX.value);
        columns.value[resizeColumnIndex.value].width = newWidth;
      }
    }

    function stopResize() {
      resizeColumnIndex.value = -1;
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", stopResize);
    }

    return {
      startResize,
      handleResize,
      stopResize,
      data,
      columns,
    };
  },
});
</script>
