// https://github.com/SrBrahma/eslint-config-gev
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint-config-gev/js"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["eslint-config-gev/react"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  ignorePatterns: ["/lib/**/*", "/dist/**/*"],
  rules: {
    // Gotta increase the fps!
    // "@typescript-eslint/no-unnecessary-type-assertion": "off",
  },
}
