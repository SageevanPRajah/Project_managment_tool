import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function fontFallbackPlugin() {
  return {
    name: "font-fallback",
    configureServer(server: any) {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      server.middlewares.use((req: any, res: any, next: any) => {
        if (!req || !req.url) return next();
        if (req.url === "/DMSans-Regular.ttf" || req.url === "/DMSans-Regular.woff2") {
          const p = path.resolve(__dirname, "public", "fonts", "DMSans-Regular.ttf");
          fs.readFile(p, (err, data) => {
            if (err) return next();
            res.statusCode = 200;
            res.setHeader("content-type", "font/ttf");
            res.end(data);
          });
        } else next();
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), fontFallbackPlugin(), reactRouter(), tsconfigPaths()],
});
