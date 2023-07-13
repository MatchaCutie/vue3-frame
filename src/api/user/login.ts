import http from '@/utils/requests'

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
