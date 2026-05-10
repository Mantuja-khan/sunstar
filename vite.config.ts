import fs from "fs";
import path from "path";

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

// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig();
