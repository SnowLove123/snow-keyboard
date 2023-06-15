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
  },
  plugins: [vanillaExtractPlugin(), dts({ include: './packages' })],
})
