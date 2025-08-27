import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-useless-escape": "off",
    }
  },
  eslintPluginPrettierRecommended,
]);
