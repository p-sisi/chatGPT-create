import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    plugins: [
      vue(),
    ],
  }
})
