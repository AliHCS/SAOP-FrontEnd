import { createApp } from 'vue'
import { createPinia } from "pinia"
import router from "@/router";
import App from './App.vue'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'
import './style.scss'
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia)
app.use(router)
app.mount('#app')