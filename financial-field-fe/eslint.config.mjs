import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const LAYER_BOUNDARIES = [
  {
    name: "types is a leaf",
    files: ["src/types/**"],
    forbidden: ["@/*"],
    message:
      "src/types is the leaf contract layer. It must not import from any other layer.",
  },
  {
    name: "components stay presentational",
    files: ["src/components/**"],
    forbidden: ["@/lib/cms/*", "@/lib/content/*", "@/features/*", "@/app/*"],
    message:
      "Components receive data as props. Fetching belongs to src/lib/content, called from a feature or route.",
  },
  {
    name: "cms layer does not reach upward",
    files: ["src/lib/cms/**"],
    forbidden: ["@/lib/content/*", "@/components/*", "@/features/*", "@/app/*"],
    message:
      "The Strapi boundary may only depend on src/types and src/lib/env.",
  },
  {
    name: "content layer does not know about rendering",
    files: ["src/lib/content/**"],
    forbidden: ["@/components/*", "@/features/*", "@/app/*"],
    message:
      "The content layer returns domain data. It must not import React components or routes.",
  },
];

const eslintConfig = defineConfig([
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  ...nextVitals,
  ...nextTs,

  {
    plugins: { import: importPlugin },
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "@/types/**", group: "internal", position: "before" },
            { pattern: "@/lib/**", group: "internal" },
            { pattern: "@/components/**", group: "internal" },
            { pattern: "@/features/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "Read environment variables from src/lib/env.ts, never inline.",
        },
      ],
    },
  },

  {
    files: ["src/lib/env.ts", "next.config.ts"],
    rules: { "no-restricted-properties": "off" },
  },

  ...LAYER_BOUNDARIES.map(({ files, forbidden, message }) => ({
    files,
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [{ group: forbidden, message }] },
      ],
    },
  })),
]);

export default eslintConfig;
