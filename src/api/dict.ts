import http from '@/utils/requests'

export const getDict = (type: string) => {
  return http.get({
    url: '' + type
  })
}
