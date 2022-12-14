import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./assets/main.css";

const app = createApp(App);
app.config.errorHandler = (err) => {
    /* 处理错误 */
  }
  
app.use(Antd);
app.use(createPinia());
app.use(router);

app.mount("#app");
