import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vueJsx(),
    // 全局自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    //vue在前面自动导入会报错
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 配置别名
      '#': resolve(__dirname, 'types')
    }
  },
  base: '/pipat/',
  build: {
    outDir: 'dist/pipat',
    assetsDir: 'static',
    sourcemap: false
  },
  server: {
    proxy: {
      '/admin/': {
        target: 'https://tkjh5.yijiesudai.com',
        changeOrigin: true
      }
    },
    host: 'localhost',
    port: 9000,
    open: true
  }
})
