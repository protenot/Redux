module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    tsconfigRootDir: __dirname,
    root: true,
  },
  plugins: ["@typescript-eslint", "jest", "import"],
  rules: {
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "no-undef": "off",
    "import/extensions": ["warn", "never"],
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
  },
};
