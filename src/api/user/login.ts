import http from '@/utils/requests'

export interface LoginForm {
  code: string
  username: string
  uuid: string
  password: string
}
export const getCodeImg = () => {
  return http.get({
    url: '/captchaImage'
  })
}

export const login = (data) => {
  return http.post({
    url: '/login',
    data
  })
}

export const getInfo = () => {
  return http.get({
    url: '/getInfo'
  })
}

export const getRouters = (params) => {
  return http.get({
    url: '/getRouters',
    params
  })
}

export const loginOut = () => {
  return http.post({
    url: '/logout'
  })
}
