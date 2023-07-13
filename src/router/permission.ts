import { getToken } from '@/utils/auth'

const whiteList = ['/login', '/404', '/401']

export const routerControl = (router) => {
  router.beforeEach((to, from, next) => {
    if (getToken()) {
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    }
  })
}
