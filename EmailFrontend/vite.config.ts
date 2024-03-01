import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: "0.0.0.0",
      port: 80,
    },
  },
})
