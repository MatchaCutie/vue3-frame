import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions } from '#/axios'
import type { CreateAxiosOptions } from './requestConfig'

export abstract class InterceptorsConfig {
  // 请求前置钩子
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

  // 响应数据处理
  handleResponseHook?: (res: AxiosResponse, options: RequestOptions) => any

  // 处理请求失败钩子
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  // 请求拦截器
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  // 请求错误处理
  requestInterceptorsCatch?: (error: Error) => void

  // 响应拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  // 响应错误处理
  responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: Error) => void
}
