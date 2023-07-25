import useUserStore from './modules/user'
import usePermissionStore from './modules/permission'
import useAppStore from './modules/app'
import useSettingStore from './modules/setting'
import tagsViewStore from './modules/tagsView'

const useStore = () => ({
  user: useUserStore(),
  permission: usePermissionStore(),
  app: useAppStore(),
  setting: useSettingStore(),
  tagsView: tagsViewStore()
})

export default useStore
