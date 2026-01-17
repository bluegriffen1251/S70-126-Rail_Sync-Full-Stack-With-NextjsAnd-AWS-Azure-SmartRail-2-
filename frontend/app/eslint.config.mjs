import nextPlugin from "@next/eslint-plugin-next";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-console": "warn",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "prettier/prettier": "error",

    },
  },
  prettierConfig, // This turns off rules that conflict with Prettier
];