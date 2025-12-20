import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/scratch-intern-projec/",
  plugins: [react()],
<<<<<<< HEAD
=======
  base: './', // Ensures relative paths for assets, compatible with GitHub Pages subdirectories
>>>>>>> feature/refactor-icons-navigation-5514661596337033210
})
