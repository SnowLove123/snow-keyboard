/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 17:50:25
 * @LastEditTime: 2023-06-14 16:36:49
 * @FilePath: /snow-keyboard/vite.config.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description: 
 * 关注作者请访问 https://snowlove.synology.me:5
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  build: {
    lib: {
      entry: [resolve(__dirname, './packages/snow-keyboard/index.ts')],
      name: 'snow-keyboard',
      fileName: (format) => `index.${format}.js`,
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [vanillaExtractPlugin(), dts({ include: './packages' })],
})
