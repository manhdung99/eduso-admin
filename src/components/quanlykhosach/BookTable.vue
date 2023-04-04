<template>
  <table class="w-full">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th
          class="text-lg text-charcoal font-medium w-1/8"
          v-for="column in columns"
          :key="column.id"
          :class="{
            '!w-1/5': column.largeColumn,
            '!w-1/10': column.smallColumn,
          }"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="text-charcoal" v-for="book in books" :key="book.bookId">
        <td>{{ book.bookId }}</td>
        <td>
          <div class="flex">
            <div>
              <img class="book-image" :src="book.bookInformation.image" />
            </div>
            <div class="ml-4">
              <p class="book-title">
                {{ book.bookInformation.title }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book.bookInformation.description }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ book.bookInformation.subDescription }}
              </p>
            </div>
          </div>
        </td>
        <td>
          <span class="text-lg">{{ book.publisher }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.listedPrice }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.discountEduso }}</span>
        </td>
        <td>
          <span class="text-lg">{{ book.discount }}</span>
        </td>
        <td class="">
          <div class="flex gap-x-4">
            <img :src="hideIcon" alt="icon" />
            <img :src="editIcon" alt="icon" />
            <img :src="removeIcon" alt="icon" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
const columns = [
  {
    id: "1",
    name: "Mã sách",
    smallColumn: true,
  },
  {
    id: "2",
    name: "Thông tin sách",
    largeColumn: true,
  },
  {
    id: "3",
    name: "Nhà xuất bản",
  },
  {
    id: "4",
    name: "Giá niêm yết",
  },
  {
    id: "5",
    name: "Mức chiết khấu cho Eduso",
  },
  {
    id: "5",
    name: "Mức giảm giá",
  },
  {
    id: "6",
    name: "",
  },
];

const books = [
  {
    bookId: "1234567",
    bookInformation: {
      image: "https://live.staticflickr.com/65535/52792665938_e3a6cfef6f_o.jpg",
      title: "SGK Ngữ Văn 12(Nâng cao)",
      description: "Ngữ Văn",
      subDescription: "Bộ giáo dục và đào tạo",
    },
    publisher: "NXB Giáo dục",
    listedPrice: "100.000 đ",
    discountEduso: "10%",
    discount: "5% - 15%",
  },
  {
    bookId: "1234567",
    bookInformation: {
      image: "https://live.staticflickr.com/65535/52792665938_e3a6cfef6f_o.jpg",
      title: "SGK Ngữ Văn 12(Nâng cao)",
      description: "Ngữ Văn",
      subDescription: "Bộ giáo dục và đào tạo",
    },
    publisher: "NXB Giáo dục",
    listedPrice: "100.000 đ",
    discountEduso: "10%",
    discount: "5% - 15%",
  },
  {
    bookId: "1234567",
    bookInformation: {
      image: "https://live.staticflickr.com/65535/52792665938_e3a6cfef6f_o.jpg",
      title: "SGK Ngữ Văn 12(Nâng cao)",
      description: "Ngữ Văn",
      subDescription: "Bộ giáo dục và đào tạo",
    },
    publisher: "NXB Giáo dục",
    listedPrice: "100.000 đ",
    discountEduso: "10%",
    discount: "5% - 15%",
  },
];

export default defineComponent({
  name: "BookTable",
  setup() {
    return {
      books,
      columns,
      hideIcon,
      removeIcon,
      editIcon,
    };
  },
});
</script>
<style scoped>
.table-head-wrapper {
  background: #f9f9f9;
  padding: 22px 30px;
}
th {
  height: 100px;
  text-align: left;
}
thead th:first-child {
  padding-left: 16px;
}
tbody tr td:first-child {
  padding-left: 16px;
}
td {
  height: 120px;
}
.book-title {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
}
.book-image {
  max-width: 68px;
  min-width: 68px;
}
</style>
