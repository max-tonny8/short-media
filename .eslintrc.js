module.exports = {
  plugins: ["import"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2015
  },
  rules: {
    "import/no-unresolved": "error",
  },
  settings: {
    "import/parsers": {
      // 使用 TypeScript parser
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      // 默认使用根目录 tsconfig.json
      typescript: {
        // 从 <roo/>@types 读取类型定义
        alwaysTryTypes: true,
      },
      // 使用指定路径 tsconfig.json， <root>/path/to/folder/tsconfig.json
      typescript: {
        directory: "./tsconfig.json",
      }
    },
  },
};
