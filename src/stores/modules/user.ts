import { defineStore } from 'pinia'
import { getInfo, loginOut, getRouters, LoginForm, login } from '@/api/user/login'
import watermark from '@/utils/watermark'
import { UserState } from './types'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import usePermissionStore from './permission'
const userStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: '',
      name: '',
      avatar: '',
      userInfo: {},
      roles: [],
      permissions: []
    }
  },
  actions: {
    async RESET_STATE() {
      this.$reset()
    },
    setSelfToken(token) {
      setToken(token)
      this.token = token
    },
    setName(name) {
      this.name = name
    },
    setAvatar(avatar) {
      this.avatar = avatar
    },
    setUserInfo(userInfo) {
      this.userInfo = JSON.parse(JSON.stringify(userInfo))
    },
    setRoles(roles) {
      this.roles = roles
    },
    setPermission(permissions) {
      this.permissions = permissions
    },
    /**
     * 登录
     */
    login(data: LoginForm) {
      return new Promise((resolve, reject) => {
        login({
          username: data.username,
          code: data.code,
          uuid: data.uuid,
          password: data.password
        })
          .then((res) => {
            this.setSelfToken(res.data.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getUserInfo() {
      getInfo()
        .then((res) => {
          res = res.data
          const user = res.user
          const avatar =
            user.avatar == ''
              ? import('@/assets/image/profile.jpg')
              : import.meta.env.VUE_APP_BASE_API + user.avatar
          if (res.roles && res.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            this.setRoles(res.roles)
            this.setPermission(res.permissions)
          } else {
            this.setRoles(['ROLE_DEFAULT'])
          }
          this.setUserInfo(user)
          this.setName(user.userName)
          this.setAvatar(avatar)
          watermark.set(user.userName + ' ' + user.phonenumber.substr(7, 11))
        })
        .catch(() => {})
    },
    getRouters() {
      return new Promise((resolve) => {
        getRouters({ sysRequestUrl: `https://tebgateway.yijiesudai.com/systemui/index` }).then(
          (res) => {
            resolve(res.data)
          }
        )
      })
    },

    // 退出系统
    logout() {
      console.log(usePermissionStore, 'usePermissionStore')
      return new Promise((resolve) => {
        loginOut().then(() => {
          this.RESET_STATE()
          resetRouter()
          usePermissionStore().RESET_STATE()
          removeToken()
          resolve(null)
        })
      })
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise((resolve) => {
        this.RESET_STATE()
        resolve(null)
      })
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})

export default userStore
