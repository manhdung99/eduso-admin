import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import { createPinia } from "pinia";
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.css";
import VueColumnsResizable from "vue-columns-resizable";
const pinia = createPinia();
const app = createApp(App);

app.use(Antd);
app.use(router);
app.use(pinia);
app.use(VueColumnsResizable);
app.mount("#app");
