import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import iconfont from "@/public/font/iconfont.css"
import i18n from "@/language"
import cookie from 'cookie_js'
import "./router/premin"
import TEditor from '@/components/TEditor.vue'
import locale from "element-plus/lib/locale/lang/zh-cn"
const app =createApp(App)
app.config.globalProperties.$axios = axios
app.component('TEditor',TEditor)
app
  
  .use(store)
  .use(router)
  .use(iconfont)
  .use(ElementPlus,{locale})
  .use(cookie)
  .use(i18n)
  .mount("#app");
