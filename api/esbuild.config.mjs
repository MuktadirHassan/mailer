import { build } from "esbuild";

export default build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  platform: "node",
  minify: true,
  bundle: true,
  sourcemap: true,
  treeShaking: true,
  packages: "external",
}).catch(() => process.exit(1));
