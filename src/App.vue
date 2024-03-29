<template>
  <div class="flex">
    <div
      @click.self="openSidebar = false"
      :class="openSidebar ? 'show' : ''"
      class="side-bar-wrapper min-h-screen"
    >
      <SideBarVue />
    </div>
    <div class="main-content">
      <div
        @click="openSidebar = false"
        v-if="openSidebar"
        class="absolute top-0 left-0 w-full h-full bg-modal-darker z-10"
      ></div>
      <div
        v-if="!hiddenSidebar"
        @click="openSidebar = true"
        class="side-bar-icon cursor-pointer"
      >
        <img :src="sideBarIcon" alt="" />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import SideBarVue from "./components/sidebar/SideBarVue.vue";
import closeIcon from "../src/assets/image/close-solid.svg";
import sideBarIcon from "../src/assets/image/side-bar.svg";
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useCommonStore } from "./stores/commonStore";
import { storeToRefs } from "pinia";
import { useModalStore } from "./stores/modalStore";
import { useUserStore } from "./stores/userStore";

export default defineComponent({
  name: "App",
  components: { SideBarVue },
  setup() {
    const { getPrograms, getSubjects } = useCommonStore();
    const { hiddenSidebar } = storeToRefs(useCommonStore());
    const { openSidebar } = storeToRefs(useModalStore());
    const { setAccessToken, getUserPermission } = useUserStore();
    onMounted(getPrograms);
    onMounted(getSubjects);
    onMounted(() => {
      const isAuthenticated = localStorage.getItem("Access_Token");
      setAccessToken(isAuthenticated);
      getUserPermission();
    });
    onMounted(() => {
      nextTick(() => {
        const container = document.querySelector(".scroll-area") as HTMLElement;
        if (container) {
          container.addEventListener("scroll", function () {
            container.classList.add("scrollbar-invisible");
          });

          container.addEventListener("mouseleave", function () {
            container.classList.remove("scrollbar-invisible");
          });
        }
      });
    });
    return {
      closeIcon,
      openSidebar,
      sideBarIcon,
      hiddenSidebar,
    };
  },
});
</script>
<style scoped>
.side-bar-wrapper {
  background: #354859;
  transition: all 500ms ease;
}
.side-bar-wrapper {
  position: fixed;
  z-index: 1;
  display: block;
  left: -300px;
  top: 0;
  bottom: 0;
  padding-right: 8px;
  width: 300px;
}
.side-bar-wrapper.show {
  left: 0;
  position: relative;
}
.side-bar-icon {
  width: 24px;
  height: 24px;
  top: 36px;
  position: absolute;
  left: 20px;
}
.main-content {
  position: relative;
  flex: 1;
  width: 100%;
}
.main-content.has-side-bar {
  left: 0;
}
@media screen and (max-width: 767px) {
  .side-bar-icon {
    top: 28px;
  }
  .side-bar-wrapper.show {
    left: 0;
    position: fixed;
  }
}
</style>
