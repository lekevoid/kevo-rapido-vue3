import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import VDragged from "v-dragged";

createApp(App).use(VDragged).mount("#app");
