import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { useDict, useStaticDict } from '@/utils/dict'

const app = createApp(App)

app.config.globalProperties.$useDict = useDict
app.config.globalProperties.$useStaticDict = useStaticDict

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
