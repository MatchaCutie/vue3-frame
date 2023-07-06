export interface RequestOptions {
  // 可否重复请求
  banRepeatRequest: boolean
  // 是否将前缀加入接口地址
  joinPrefix?: boolean
  // 接口前缀
  urlPrefix?: string
  // 是否带token
  withToken?: boolean
}
