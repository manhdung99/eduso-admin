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
import { defineComponent, ref, onMounted } from "vue";
import { useCommonStore } from "./stores/commonStore";
const openSidebar = ref(false);

export default defineComponent({
  name: "App",
  components: { SideBarVue },
  setup() {
    const { getPrograms, getSubjects } = useCommonStore();
    onMounted(getPrograms);
    onMounted(getSubjects);
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
  padding-right: 8px;
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
