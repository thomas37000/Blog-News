import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "@/assets/main.css";
import "@/assets/tailwind.css";

const query = "tesla";

const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .substr(0, 10);

const token = import.meta.env.VITE_API_TOKEN;

// en ajoutant axios à l'objet "window", on le rend disponible dans tous nos composants
window.axios = axios.create({
  baseURL: `https://newsapi.org/v2/everything?q=${query}&from=${date}&sortBy=publishedAt&apiKey=${token}`,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
