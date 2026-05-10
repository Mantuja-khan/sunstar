import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Preserving the custom media copy logic from current config
try {
  const brainDir = "C:\\Users\\NUR MIYAN\\.gemini\\antigravity\\brain\\3a4c67e1-c018-485a-9caf-1b90f8e31ffb";
  const assetsDir = path.resolve(__dirname, "src/assets");

  if (fs.existsSync(brainDir) && fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(brainDir);
    files.forEach((file) => {
      if (file.startsWith("media__") && (file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg"))) {
        const srcPath = path.join(brainDir, file);
        const destPath = path.join(assetsDir, file);
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Vite Config] Copied ${file} to src/assets!`);
      }
    });
  }
} catch (e) {
  console.error("[Vite Config] Error copying media files:", e);
}

// Standard React Vite config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
  },
})
