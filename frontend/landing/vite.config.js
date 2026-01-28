import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      providers: path.resolve(__dirname, 'src/providers'),
      services: path.resolve(__dirname, 'src/services'),
      views: path.resolve(__dirname, 'src/views'),
      utils: path.resolve(__dirname, 'src/utils'),
    }
  },
  /* server: {
    host: true,
    port: 5173,
  }, */
})
