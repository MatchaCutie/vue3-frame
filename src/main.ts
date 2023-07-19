import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/styles/index.scss' // global css

import App from './App.vue'
import router from '@/router/permission'
import '@/router/permission'
// import permission from '@/router/permission'
// 引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import { useDict, useStaticDict } from '@/utils/dict'

const app = createApp(App)

app.config.globalProperties.$useDict = useDict
app.config.globalProperties.$useStaticDict = useStaticDict

console.log('router', router)
console.log(router.getRoutes())

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
