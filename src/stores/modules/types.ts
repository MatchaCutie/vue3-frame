import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

export interface AppState {
  device: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  size: string
}

export interface PermissionState {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
}

export interface SettingState {
  theme: string
  tagsView: any
  fixedHeader: boolean
  showSettings: boolean
  sidebarLogo: boolean
}

export interface UserState {
  token: string
  name: string
  nickName: string
  avatar: string
  userInfo: object
  roles: string[]
  permissions: string[]
}

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: string[]
}
interface DefaultSettings {
  title: string
  showSettings: boolean
  tagsView: boolean
  fixedHeader: boolean
  sidebarLogo: boolean
  errorLog: string
}
export const defaultSettings: DefaultSettings = {
  title: 'lz-system-admin',
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  // 是否显示Logo
  sidebarLogo: true,
  errorLog: 'production'
}
