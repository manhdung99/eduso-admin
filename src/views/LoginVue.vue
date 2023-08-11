<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full">
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Login</h2>
        <form ref="loginForm" @submit.prevent="onSubmit">
          <div class="mb-4">
            <label
              for="username"
              class="block text-gray-700 text-sm font-medium mb-2"
              >Username</label
            >
            <input
              v-model="username"
              type="text"
              id="username"
              class="input w-full"
              name="Username"
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-gray-700 text-sm font-medium mb-2"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              class="input w-full"
              name="Password"
            />
          </div>
          <div class="text-right">
            <button
              type="submit"
              class="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import { useCommonStore } from "@/stores/commonStore";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "LoginVue",
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup() {
    const username = ref("");
    const password = ref("");
    const loginForm = ref(null);
    const { setAccessToken, getUserPermission } = useUserStore();
    const { updateSelectKey } = useCommonStore();
    const onSubmit = async () => {
      const formData = new FormData(loginForm.value);
      const url = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LOGIN;
      axios.post(url, formData).then((response) => {
        if (response.data.Code == 200) {
          const token = response.data.Data.Access_Token;
          setAccessToken(token);
          localStorage.setItem("Access_Token", token);
          router.push(`/`);
          updateSelectKey(["quanlykhosach"]);
          getUserPermission();
        } else {
          alert(response.data.Message);
        }
      });
    };
    return { username, password, onSubmit, loginForm };
  },
});
</script>
