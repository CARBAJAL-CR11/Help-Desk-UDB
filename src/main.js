import './recursos/main.css'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'
import * as TablerIcons from '@tabler/icons-vue';



const app = createApp(App)

// Método para la importación de iconos TablerIcons
for (const [key, component] of Object.entries(TablerIcons)) {
  app.component(key, component);
};

app.use(router);

app.mount('#app');
