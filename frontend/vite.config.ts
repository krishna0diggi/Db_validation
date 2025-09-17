// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env vars for this mode
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    base: '/validation-app/', // Adjust if deployed under subpath
    server: {
      host: '127.0.0.1',
      port: 5175,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      // Optional: expose as global constant at build-time if needed
      __VITE_API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
    },
  }
})
