import {
  fixupConfigRules,
  fixupPluginRules,
  fixupConfigRules,
} from "@eslint/compat";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/dist", "**/.eslintrc.cjs", "**/node_modules/", "**/dist/"],
  },
  ...fixupConfigRules(
    compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:react-hooks/recommended"
    )
  ),
  {
    plugins: {
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      prettier,
      "react-hooks": fixupPluginRules(reactHooks),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
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
            ["^react", "^@?\\w"],
            ["^(@|components)(/.*|$)"],
            ["^\\u0000"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.?(css)$"],
          ],
        },
      ],

      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js"],

    languageOptions: {
      parser: tsParser,
    },
  },
  ...fixupConfigRules(
    compat.extends("plugin:@typescript-eslint/disable-type-checked")
  ).map((config) => ({
    ...config,
    files: ["**/*.js", "**/**.config.ts", "**/**.config.mts"],
  })),
];
