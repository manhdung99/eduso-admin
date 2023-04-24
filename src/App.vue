<template>
  <div class="flex">
    <div
      @click.self="openSidebar = false"
      :class="openSidebar ? 'show' : ''"
      class="side-bar-wrapper min-h-screen"
    >
      <div @click="openSidebar = false" class="w-8 h-8 absolute right-0">
        <img :src="closeIcon" alt="" />
      </div>
      <SideBarVue />
    </div>
    <div class="flex-1 w-full md:w-auto">
      <div @click="openSidebar = true" class="side-bar-icon">
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
import { defineComponent, ref } from "vue";

const openSidebar = ref(false);

export default defineComponent({
  name: "App",
  components: { SideBarVue },
  setup() {
    return {
      closeIcon,
      openSidebar,
      sideBarIcon,
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
}
.side-bar-wrapper.show {
  left: 0;
}
.side-bar-icon {
  width: 24px;
  height: 24px;
  top: 36px;
  position: absolute;
  left: 20px;
}
@media screen and (max-width: 767px) {
  .side-bar-icon {
    top: 28px;
  }
}
</style>
