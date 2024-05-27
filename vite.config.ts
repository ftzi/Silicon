import react from "@vitejs/plugin-react"
import { type PluginOption, defineConfig } from "vite"

const fullReloadAlways: PluginOption = {
  name: "full-reload-always",
  handleHotUpdate: ({ server }) => {
    server.ws.send({ type: "full-reload" })

    return []
  },
} satisfies PluginOption

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fullReloadAlways],
})
