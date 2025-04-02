import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    languageOptions: {
      ecmaVersion: "latest", // En güncel ECMAScript versiyonunu kullan
      sourceType: "module",
    },
  },
];

export default eslintConfig;
