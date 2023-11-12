import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => {
  return {
    server: {
      port: 8989,
      open: true,
      proxy: {
          '^(/collect|/sysDialog|/user)': {
              target: 'http://10.38.170.192:8081/',
              changeOrigin: true,
          }
      }
  },
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
