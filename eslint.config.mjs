import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    parserOptions: {
      ecmaVersion: 2020, // ECMAScript sürümünü belirle
      sourceType: "module", // ES6 modüllerini kullan
    },
  },
  // Eğer başka özelleştirilmiş ayarları eklemek istersen:
  // "rules" veya "env" gibi
];

export default eslintConfig;
