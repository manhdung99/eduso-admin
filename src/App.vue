<script setup lang="ts">
import SideBarVue from "./components/sidebar/SideBarVue.vue";
</script>

<template>
  <div class="flex">
    <div class="bg-charcoal h-screen">
      <SideBarVue />
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
