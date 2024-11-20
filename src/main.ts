import './assets/main.css'
import { initVendors } from "./vendor";
import { initData } from "./data";
import { initWidgets } from './widgets';
import { initVariables } from './variables';
import { createApp } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import './scss/main.scss'
import { TinyEmitter } from 'tiny-emitter';
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)
const eventBus = new TinyEmitter();

app.config.globalProperties.$eventBus = eventBus;

app.component('VueJsonPretty', VueJsonPretty);
initVendors(app);
const { datasourceRepository } = initData(app);
initWidgets(app, { datasourceRepository });
initVariables(app, eventBus);

window.eventBus = eventBus;
app.use(createPinia())

app.mount('#app')
