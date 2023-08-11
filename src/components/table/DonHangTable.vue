<template>
  <table
    v-if="orders && orders.length > 0"
    class="w-full unit-management-table"
  >
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th class="text-lg text-charcoal font-medium text-center">
          Mã giao dịch
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Chi tiết đơn hàng
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Thời gian mua hàng
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Loại giao dịch
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Giá trị đơn hàng
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Giá trị giảm
        </th>
        <th class="text-lg text-charcoal font-medium text-center">
          Email người mua
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter"
        v-for="order in orders"
        :key="order.id"
      >
        <td class="text-lg text-center">{{ order.id }}</td>
        <td class="text-lg text-center">
          {{ order.detail }}
        </td>
        <td class="text-center">
          <span class="text-lg">
            {{ convertTimestampToDate(order.buyDate) }}</span
          >
        </td>
        <td class="text-center">
          <span class="text-lg">{{ order.typeTransaction }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ order.orderValue }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ order.discount }} %</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ order.userEmail }} </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useOrderStore } from "../../stores/orderStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import convertData from "@/uses/convertData";

export default defineComponent({
  name: "OrderTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const orderStore = useOrderStore();
    const { orders } = storeToRefs(orderStore);
    const { convertTimestampToDate, convertPrice } = convertData();
    return {
      hideIcon,
      removeIcon,
      editIcon,
      orders,
      convertTimestampToDate,
      convertPrice,
    };
  },
});
</script>
<style>
.book-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
}
.book-image {
  max-width: 68px;
  min-width: 68px;
}
.show-detail-button {
  background: #3c9dd2;
  color: white;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 18px;
  margin-left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.show-detail-button:hover {
  opacity: 0.9;
}
</style>
