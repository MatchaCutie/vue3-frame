import { RouteRecordRaw } from 'vue-router'
import { PermissionState } from './types'
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router/route'
const modules = import.meta.glob('../../views/**/*.vue')
export const Layout = () => import('@/layout/index.vue')

export const filterAsyncRoutes = (routes: any[]): any[] => {
  return routes.filter((route) => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = modules[`../../views/${route.component}.vue`]
        // route.component = route.component.endsWith('.vue')
        //   ? modules[`../../views/${route.component}`]
        //   : modules[`../../views/${route.component}.vue`]
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRoutes(route.children)
    }
    return true
  })
}

const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routes: [],
    addRoutes: []
  }),
  actions: {
    async RESET_STATE() {
      this.$reset()
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    generateRoutes(menuList: any[]) {
      return new Promise((resolve) => {
        const routes = filterAsyncRoutes(menuList)
        console.log(routes, '-------routes')

        this.setRoutes(routes)
        resolve(routes)
      })
    }
  }
})

export default usePermissionStore
