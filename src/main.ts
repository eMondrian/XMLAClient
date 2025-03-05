import './assets/main.css';
import { initEventBus } from './config/eventBus';
import { initVariables } from './config/variables';
import { initVendors } from "./vendor";
import { initData } from "./data";
import { initWidgets } from './widgets';
import { createApp } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import './scss/main.scss';
import { createPinia } from 'pinia';
import './persistence/persistence';
import App from './App.vue'

const app = createApp(App)

app.component('VueJsonPretty', VueJsonPretty);

initEventBus(app);
initVendors(app);

const variableStorage = initVariables(app);
const { datasourceRepository } = initData(app, variableStorage);
initWidgets(app, { datasourceRepository });

app.use(createPinia())

app.mount('#app')
