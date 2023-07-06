import type { AxiosRequestConfig } from 'axios'
import type { RequestOptions } from '#/axios'
import type { InterceptorsConfig } from './interceptorsConfig'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  interceptorsConfig?: InterceptorsConfig
  requestOptions?: RequestOptions
}
