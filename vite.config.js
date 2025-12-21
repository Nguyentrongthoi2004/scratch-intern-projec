import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // SỬA LẠI DÒNG NÀY:
  // Phải điền chính xác tên repository trên GitHub của bạn, có dấu / ở đầu và cuối
  base: '/scratch-intern-projec/', 
  plugins: [react()],
})