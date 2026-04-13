import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ── Import organisation ────────────────────────────────────────────────
  {
    plugins: { import: importPlugin },
    rules: {
      // Enforce barrel-file imports: import from '@/hooks', not '@/hooks/use-boolean'
      "import/no-duplicates": "error",

      // No unused imports (catches tree-shaking misses early)
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // ── Project-wide best practices ────────────────────────────────────────
  {
    rules: {
      // Prefer const over let where reassignment never happens
      "prefer-const": "error",

      // No console.log leaking into production — use console.warn/error intentionally
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Enforce === over ==
      eqeqeq: ["error", "always"],

      // Disallow any (use unknown instead)
      "@typescript-eslint/no-explicit-any": "warn",

      // Consistent type imports — keeps bundles smaller
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
]);

export default eslintConfig;
