import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import unusedImports from "eslint-plugin-unused-imports";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      tseslint,
      "unused-imports": unusedImports,
      eslintConfigPrettier,
      // "unused-imports": pluginObject,
    },
    rules: {
      "unused-imports/no-unused-imports-ts": "error",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    ignores: ["node_modules", ".expo", "babel.config.js"],
  },
];
