import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored, unmodified third-party mechanism. It is ES5 by design and is
    // never edited per project, so linting it to this project's rules would
    // only produce noise we are not allowed to fix.
    "src/vendor/**",
    "public/sc/scrollcraft.js",
    // scroll-craft workspace: planning artifacts and verification output.
    "scrollcraft/**",
  ]),
]);

export default eslintConfig;
