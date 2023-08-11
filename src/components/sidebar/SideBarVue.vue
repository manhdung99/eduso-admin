<template>
  <div class="flex my-7">
    <div class="avatar-wrapper">
      <img src="../../assets/image/avatar.jpg" alt="avatar" />
    </div>
    <div class="border-l border-white pl-5">
      <p class="text-white text-xl">{{ accountName }}</p>
      <p class="text-grey text-lg">Vị trí: {{ accountRole }}</p>
    </div>
  </div>
  <div class="text-lg">
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 290px"
      :mode="mode"
      :theme="theme"
    >
      <router-link v-if="accountAccess.includes('bookscontroller')" to="/">
        <a-menu-item key="quanlykhosach">
          <template #icon>
            <div class="icon-book !text-xl w-9 text-xml"></div>
          </template>
          <span class="pl-5"> Quản lý kho sách </span>
        </a-menu-item>
      </router-link>
      <router-link
        v-if="accountAccess.includes('managecontroller')"
        to="/quanlydoanhthu"
      >
        <a-menu-item key="quanlydoanhthu">
          <template #icon>
            <div class="icon-chart !text-2xl w-9"></div>
          </template>
          <span class="pl-5"> Quản lý doanh thu </span>
        </a-menu-item>
      </router-link>
      <router-link
        v-if="accountAccess.includes('managecontroller')"
        to="/quanlytheodonvi"
      >
        <a-menu-item key="quanlytheodonvi">
          <template #icon>
            <div class="icon-location !text-2xl w-9"></div>
          </template>
          <span class="pl-5"> Quản lý theo đơn vị </span>
        </a-menu-item>
      </router-link>
      <router-link
        v-if="accountAccess.includes('managecontroller')"
        to="/quanlydonhang"
      >
        <a-menu-item key="quanlydonhang">
          <template #icon>
            <div class="icon-setting !text-2xl w-9"></div>
          </template>
          <span class="pl-5"> Quản lý đơn hàng </span>
        </a-menu-item>
      </router-link>
      <router-link
        v-if="accountAccess.includes('epcontroller')"
        to="/quanlynapEP"
      >
        <a-menu-item key="quanlynapEP">
          <template #icon>
            <div class="icon-setting !text-2xl w-9"></div>
          </template>
          <span class="pl-5"> Quản lý nạp EP </span>
        </a-menu-item>
      </router-link>
      <router-link
        v-if="accountAccess.includes('epcontroller')"
        to="/quanlyEPnguoidung"
      >
        <a-menu-item key="quanlyEPnguoidung">
          <template #icon>
            <div class="icon-setting !text-2xl w-9"></div>
          </template>
          <span class="pl-5"> Quản lý EP người dùng </span>
        </a-menu-item>
      </router-link>
      <router-link
        v-if="accountAccess.includes('accountcontroller')"
        to="/quanlynguoidung"
      >
        <a-menu-item key="quanlynguoidung">
          <template #icon>
            <div class="icon-setting !text-2xl w-9"></div>
          </template>
          <span class="pl-5"> Quản lý người dùng </span>
        </a-menu-item>
      </router-link>
    </a-menu>
    <div class="log-out-btn">
      <div class="icon-log-out !text-2xl w-9"></div>
      <div>
        <span
          @click="updateLogoutModalStatus(true)"
          class="pl-5 relative log-out-text"
        >
          Đăng xuất
        </span>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <logoutModalVue />
  </Teleport>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import type { MenuMode, MenuTheme } from "ant-design-vue";
import logoutModalVue from "../modal/logoutModal.vue";
import { useModalStore } from "../../stores/modalStore";
import { useUserStore } from "../../stores/userStore";
import { useCommonStore } from "../../stores/commonStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "SideBar",
  setup() {
    const state = reactive({
      mode: "inline" as MenuMode,
      theme: "light" as MenuTheme,
      openKeys: ["sub1"],
    });
    const modal = useModalStore();
    const { updateLogoutModalStatus } = modal;
    const handlePageReload = () => {
      let urlArray = window.location.href.split("/");
      let newArray = [urlArray[urlArray.length - 1]];
      selectedKeys.value = newArray;
    };
    const { selectedKeys } = storeToRefs(useCommonStore());
    const { accountAccess, accountName, accountRole } = storeToRefs(
      useUserStore()
    );
    // Handle even load page
    window.addEventListener("load", handlePageReload);

    return {
      ...toRefs(state),
      accountAccess,
      updateLogoutModalStatus,
      accountName,
      accountRole,
      selectedKeys,
    };
  },
  components: {
    logoutModalVue,
  },
});
</script>
<style scoped>
.log-out-btn {
  display: flex;
  padding-left: 27px;
  color: #a4a4a4;
  cursor: pointer;
}
.log-out-btn:hover {
  color: white;
}
.log-out-text::before {
  position: absolute;
  background: #a4a4a4;
  content: "";
  width: 2px;
  height: 80%;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
}
.log-out-btn:hover .log-out-text::before {
  background: white;
}
</style>
