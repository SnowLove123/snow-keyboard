/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-05-19 17:50:25
 * @LastEditTime: 2023-06-20 13:29:53
 * @FilePath: /snow-keyboard/vite.config.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// export default defineConfig({
//   plugins: [vanillaExtractPlugin({}), dts({ include: './packages' })],
//   build: {
//     lib: {
//       entry: [resolve(__dirname, './packages/snow_keyboard/index.ts')],
//       name: 'snow_keyboard',
//       fileName: (format) => `index.${format}.js`,
//     },
//     rollupOptions: {
//       // input: rollupInput(command, port),
//       input: {
//         // constants: resolve(__dirname, './packages/constants/index.ts'),
//         // dictionaries: resolve(__dirname, './packages/dictionaries/index.ts'),
//         //   // layouts: resolve(__dirname, './packages/layouts/index.ts'),
//         //   // snow_keyboard: resolve(__dirname, './packages/snow_keyboard/index.ts'),
//         theme: resolve(__dirname, './packages/theme/index.ts'),
//         //   // utils: resolve(__dirname, './packages/utils/index.ts'),
//       },
//       output: [
//         // {
//         //   dir: 'packages/[name]/lib/',
//         //   format: 'umd',
//         // },
//         {
//           dir: `packages/${getDynamicDirectoryName}/lib/`,
//           format: 'umd',
//         },
//       ],
//     },
//     minify: 'terser',
//     terserOptions: {
//       compress: {
//         drop_console: true,
//         drop_debugger: true,
//       },
//     },
//   },
// })

export default defineConfig({
  plugins: [vanillaExtractPlugin({}), dts({ include: './packages' })],
  build: {
    lib: {
      entry: [
        resolve(__dirname, './packages/snow_keyboard/index.ts'),
        resolve(__dirname, './packages/theme/index.ts'),
      ],
      name: 'snow_keyboard',
      fileName: (format, entryName) => {
        console.log('format format', format, entryName)
        if (entryName.indexOf('theme') > -1) {
          return 'style.css'
        }
        return `keyboard.${format}.js`
      },
    },
    rollupOptions: {},
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
