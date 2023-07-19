import router from '@/router'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
// import { RouteRecordRaw } from 'vue-router'
// 引入对应css样式
import 'nprogress/nprogress.css'
import useStore from '@/stores'
const whiteList = ['/login', '/404', '/401']
// 修改进度条插件的配置
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { user, permission } = useStore()

  const token = getToken()
  //  已登陆且url导向了登录页 则重定向至首页
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (user.roles.length === 0) {
        try {
          await user.getUserInfo()
          const menuList: any = await user.getRouters()
          const accessRoutes: any = await permission.generateRoutes(menuList)
          // TODO
          const temp = accessRoutes.filter(
            (item: any) => item.name !== 'Https://gitee.com/JavaLionLi/RuoYi-Vue-Plus'
          )
          temp.forEach((route: any) => {
            router.addRoute(route)
          })
          console.log(router.getRoutes(), 'temp')
          next({ ...to, replace: true })
        } catch (error) {
          console.warn(error)
          // 移除 token 并跳转登录页
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    console.log('oooo')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
