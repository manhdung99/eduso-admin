import { useCommonStore } from "./stores/commonStore";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.css";
import { i18n } from "./assets/i18n/i18n";
const pinia = createPinia();
const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(pinia);
app.use(i18n);
app.mount("#app");

const sidebar = useCommonStore(); // Initialize the store

router.beforeEach((to, from, next) => {
  // Check if the current route requires hiding the sidebar
  const isAuthenticated = !!localStorage.getItem("Access_Token");
  const hideSidebarRoutes = ["/login", "/route2"]; // Add the routes where you want to hide the sidebar
  const openSidebar = hideSidebarRoutes.includes(to.path);
  sidebar.hiddenSidebar = openSidebar;
  if (to.name === "login" && isAuthenticated) {
    // Redirect to a different route if already logged in
    next({ name: "" }); // Change 'dashboard' to your desired route
  } else if (to.name !== "login" && !isAuthenticated) {
    return next({ name: "login" });
  }
  // if the user is not authenticated, `next` is called twice
  next();
});
