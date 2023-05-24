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
