<template>
  <table v-if="bookOrders && bookOrders.length > 0" class="w-full">
    <thead class="table-head-wrapper">
      <tr class="w-full">
        <th class="w-1/8">Mã sách</th>
        <th class="w-1/5">Thông tin sách</th>
        <th class="w-1/8">Ngày mở bán</th>
        <th class="w-1/8">Ngày hết hạn</th>
        <th class="w-1/8">Doanh thu</th>
        <th class="w-1/8">Tổng số lượt tải</th>
        <th class="w-1/8">Tác vụ</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-charcoal border-b border-grey-lighter"
        v-for="order in bookOrders"
        :key="order.ID"
      >
        <td class="text-center">{{ order.Code }}</td>
        <td>
          <div class="flex">
            <div>
              <img
                class="book-image"
                :src="
                  order.Image
                    ? `https://static.eduso.vn/${order.Image}`
                    : defaultBookCover
                "
              />
            </div>
            <div class="ml-4">
              <p class="book-title">
                {{ order.Name }}
              </p>
              <p class="text-charcoal-lighter text-2xs">
                <!-- {{ order.bookMetadata.bookSubject }} -->
              </p>
              <p class="text-charcoal-lighter text-2xs">
                {{ order.Publisher }}
              </p>
            </div>
          </div>
        </td>
        <td class="text-center">
          <span class="text-lg">{{
            convertTimestampToDate(order.DateStartBuy)
          }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{
            convertTimestampToDate(order.DateEndBuy)
          }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ convertPrice(order.Totals) }}</span>
        </td>
        <td class="text-center">
          <span class="text-lg">{{ order.Orders }}</span>
        </td>
        <td class="overflow-hidden">
          <button
            @click="
              setBookOrderDetail(order.ID);
              updateOrderManagementStatus(true);
            "
            class="show-detail-button"
          >
            Chi tiết
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <orderManagementModalVue />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "../../stores/modalStore";
import { useOrderStore } from "../../stores/bookOrdersStore";
import hideIcon from "../../assets/image/hide.svg";
import removeIcon from "../../assets/image/remove.svg";
import editIcon from "../../assets/image/edit.svg";
import defaultBookCover from "../../assets/image/default-book-image.jpg";
import orderManagementModalVue from "../modal/orderManagementModal.vue";
import convertData from "@/uses/convertData";
export default defineComponent({
  name: "RevenueTable",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const modal = useModalStore();
    const orderStore = useOrderStore();
    const {
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateOrderManagementStatus,
    } = modal;
    const { bookOrders } = storeToRefs(orderStore);
    const { setBookOrderDetail } = orderStore;

    const { convertTimestampToDate, convertPrice } = convertData();

    return {
      hideIcon,
      removeIcon,
      editIcon,
      bookOrders,
      defaultBookCover,
      updateBookModalStatus,
      updateRemoveModalStatus,
      updateOrderManagementStatus,
      convertTimestampToDate,
      convertPrice,
      setBookOrderDetail,
    };
  },
  components: {
    orderManagementModalVue,
  },
});
</script>
