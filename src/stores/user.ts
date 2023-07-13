import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
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
    setToken(token) {
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
    }
  }
})
