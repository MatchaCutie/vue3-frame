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
