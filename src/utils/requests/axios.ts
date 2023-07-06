import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions } from '#/axios'
import deepClone from '@/utils/deepClone'
import type { CreateAxiosOptions } from './requestConfig'

export class PAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  setupInterceptors() {
    if (!this.options.interceptorsConfig) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = this.options.interceptorsConfig
    // 拦截请求
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig): any => {
        if (requestInterceptors && typeof requestInterceptors === 'function') {
          config = requestInterceptors(config, this.options)
        }
        return config
      },
      (error) => {
        console.log(error)
        requestInterceptorsCatch &&
          typeof requestInterceptorsCatch === 'function' &&
          requestInterceptorsCatch(error)
        Promise.reject(error)
      }
    )
    // 拦截响应
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        if (responseInterceptors && typeof responseInterceptors === 'function') {
          res = responseInterceptors(res)
        }
        return res
      },
      (error) => {
        console.log(error)
        if (responseInterceptorsCatch && typeof responseInterceptorsCatch === 'function') {
          responseInterceptorsCatch(this.axiosInstance, error)
        }
        Promise.reject(error)
      }
    )
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = deepClone(config)

    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, handleResponseHook } =
      this.options.interceptorsConfig || {}

    // 执行自定义请求前钩子
    if (beforeRequestHook && typeof beforeRequestHook === 'function') {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<any>>(conf)
        .then((res: AxiosResponse<any>) => {
          if (handleResponseHook && typeof handleResponseHook === 'function') {
            try {
              const ret = handleResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && typeof requestCatchHook === 'function') {
            reject(requestCatchHook(e, opt))
            return
          }
          reject(e)
        })
    })
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }
}
