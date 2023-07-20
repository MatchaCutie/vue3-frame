<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <div>{{ 1234 }}</div>
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import variables from '@/assets/styles/variable.module.scss'
import useStore from '@/stores'

const { permission, setting, app } = useStore()

const route = useRoute()
const routes = computed(() => permission.routes)
console.log('routes11', routes)
const showLogo = computed(() => setting.sidebarLogo)
const isCollapse = computed(() => !app.sidebar.opened)

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})
</script>
