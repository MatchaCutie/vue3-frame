import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 全局自动导入
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 配置别名
      '#': path.resolve(__dirname, 'types')
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
  },
  
})
