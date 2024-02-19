// vite.config.js
import { fileURLToPath, URL } from "url";
import { defineConfig } from "file:///Users/lukemorgan/Desktop/Codebases/personal-website/node_modules/vite/dist/node/index.js";
import ViteRestart from "file:///Users/lukemorgan/Desktop/Codebases/personal-website/node_modules/vite-plugin-restart/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/lukemorgan/Desktop/Codebases/personal-website/vite.config.js";
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    ]
  },
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "personal-projects.html",
        "design.html",
        "contact.html",
        "little-lebowski.html",
        "crappy-bird.html",
        "404.html"
      ]
    }
  },
  plugins: [
    ViteRestart({
      restart: ["./src/**"]
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbHVrZW1vcmdhbi9EZXNrdG9wL0NvZGViYXNlcy9wZXJzb25hbC13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbHVrZW1vcmdhbi9EZXNrdG9wL0NvZGViYXNlcy9wZXJzb25hbC13ZWJzaXRlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9sdWtlbW9yZ2FuL0Rlc2t0b3AvQ29kZWJhc2VzL3BlcnNvbmFsLXdlYnNpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgVml0ZVJlc3RhcnQgZnJvbSAndml0ZS1wbHVnaW4tcmVzdGFydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IFtcbiAgICAgICAgJ2luZGV4Lmh0bWwnLFxuICAgICAgICAncGVyc29uYWwtcHJvamVjdHMuaHRtbCcsXG4gICAgICAgICdkZXNpZ24uaHRtbCcsXG4gICAgICAgICdjb250YWN0Lmh0bWwnLFxuICAgICAgICAnbGl0dGxlLWxlYm93c2tpLmh0bWwnLFxuICAgICAgICAnY3JhcHB5LWJpcmQuaHRtbCcsXG4gICAgICAgICc0MDQuaHRtbCcsXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICBWaXRlUmVzdGFydCh7XG4gICAgICByZXN0YXJ0OiBbJy4vc3JjLyoqJ10sXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsU0FBUyxlQUFlLFdBQVc7QUFDalgsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFGd0wsSUFBTSwyQ0FBMkM7QUFJalEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWEsY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDOUQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxNQUNWLFNBQVMsQ0FBQyxVQUFVO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0g7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
