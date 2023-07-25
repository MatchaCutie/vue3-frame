// 引入svg注册脚本
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/index.scss' // global css

import App from './App.vue'
import router from '@/router/permission'
import '@/router/permission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import permission from '@/router/permission'
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
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
