import "./assets/styling/global.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { metaTagPlugin } from "@m-media/vue3-meta-tags";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(metaTagPlugin, {}, router);

app.mount("#app");
