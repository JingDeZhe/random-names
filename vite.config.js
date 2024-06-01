// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5191 },
  build: {
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      name: 'randomNames',
      fileName: 'random-names',
    },
  },
})
