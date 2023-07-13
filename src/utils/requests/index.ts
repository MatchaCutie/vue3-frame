import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { CreateAxiosOptions } from './requestConfig'
import type { InterceptorsConfig } from './interceptorsConfig'
import type { RequestOptions } from '#/axios'
import { PAxios } from './axios'
import errorCode from '@/utils/requests/errorCode'
import { getToken } from '@/utils/auth'

import deepMerge from 'deepmerge'

import { ElMessage } from 'element-plus'

const interceptorsConfig: InterceptorsConfig = {
  // 处理参数
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions) => {
    const { joinPrefix, urlPrefix } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }
    return config
  },
  // 默认请求拦截
  requestInterceptors: (config: AxiosRequestConfig, options: CreateAxiosOptions) => {
    if (options.requestOptions?.withToken && getToken()) {
      config.headers['Authorization'] = getToken()
    }

    // 禁止重复请求
    if (options.requestOptions?.banRepeatRequest) {
      if (config.method === 'post' || config.method === 'put') {
        // TODO 禁止重复请求处理
      }
    }
    return config
  },
  // 默认响应拦截
  responseInterceptors: (res: AxiosResponse<any>) => {
    if (!res.data) {
      throw new Error('response error')
    }

    // 若接口未返回code，默认成功
    const code: number = Number(res.data.code) || 200
    // 获取错误信息
    const msg: string = errorCode[code] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    // TODO 不同状态处理弹窗或者dialog
    if (code === 401) {
      console.log('response 401')
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }
    if (code === 500) {
      ElMessage({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    }
    if (code !== 200) {
      console.log('response code' + code)
      return Promise.reject('error')
    }
    return res.data
  },
  // 默认响应catch
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  },
  // response处理
  handleResponseHook: (res: AxiosResponse<any>, options: RequestOptions) => {
    return res
  }
}

export function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new PAxios(
    // 深度合并
    deepMerge(
      {
        timeout: 60000,
        baseURL: import.meta.env.VITE_APP_BASE_API,
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        interceptorsConfig: interceptorsConfig,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 可否重复请求
          banRepeatRequest: true,
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 接口拼接地址
          urlPrefix: '',
          // 是否携带token
          withToken: true
        }
      },
      opt || {}
    )
  )
}

const http = createAxios()

export default http
