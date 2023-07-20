import { AppState } from './types'
import { defineStore } from 'pinia'
const sidebarStatus =
  localStorage.getItem('sidebarStatus') && localStorage.getItem('sidebarStatus') === '1'
    ? true
    : false

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    device: 'desktop',
    sidebar: {
      opened: sidebarStatus ? sidebarStatus : true,
      withoutAnimation: false
    },
    size: localStorage.getItem('size') || 'medium'
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened) {
        localStorage.setItem('sidebarStatus', '1')
      } else {
        localStorage.setItem('sidebarStatus', '0')
      }
    },
    closeSideBar(withoutAnimation: any) {
      localStorage.setItem('sidebarStatus', '0')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.device = device
    },
    setSize(size: string) {
      this.size = size
      localStorage.setItem('size', size)
    }
  }
})

export default useAppStore
