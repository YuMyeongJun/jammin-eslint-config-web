const js = require("@eslint/js");
const globals = require("globals");
const react = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const reactRefresh = require("eslint-plugin-react-refresh");
const reactHooks = require("eslint-plugin-react-hooks");
const tseslint = require("typescript-eslint");
const tsParser = require("@typescript-eslint/parser");
const tseslintPlugin = require("@typescript-eslint/eslint-plugin");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

module.exports = {
  ...js.configs.recommended,
  ...reactHooks.configs.recommended,
  ...tseslintPlugin.configs.recommendedTypeChecked,
  files: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.browser,
    },
  },
  ignores: [
    "**/.eslintrc.cjs",
    "**/.eslint.config.*",
    "**/node_modules/",
    "**.config.ts",
    "**.config.mts",
    "**.cjs",
    "**/dist/**",
    "**/dist/index.es.js",
    ".yarn/**",
    "dist/",
    ".yarnrc.yml",
    "node_modules/",
    "**/*.mjs",
    "**/*.mts",
    "**/*.cjs",
  ],
  plugins: {
    "react-refresh": reactRefresh,
    "simple-import-sort": simpleImportSort,
    prettier: prettier,
    "react-hooks": reactHooks,
    react: react,
    "@typescript-eslint": tseslint,
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // Internal packages.
          ["^(@|components)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.?(css)$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
};
