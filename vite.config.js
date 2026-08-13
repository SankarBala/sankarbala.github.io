import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

function copyImgFolder() {
  return {
    name: "copy-img-folder",

    closeBundle() {
      const source = path.resolve("img");
      const srouce2 = path.resolve("cv");
      const destination = path.resolve("docs/img");
      const destination2 = path.resolve("docs/cv");

      fs.cpSync(source, destination, {
        recursive: true,
      });
      fs.cpSync(srouce2, destination2, {
        recursive: true,
      });
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), copyImgFolder()],
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
