const eslintRecommended = {
  "constructor-super": "error",
  "getter-return": "error",
  "no-const-assign": "error",
  "no-dupe-args": "error",
  "no-dupe-class-members": "error",
  "no-dupe-keys": "error",
  "no-func-assign": "error",
  "no-import-assign": "error",
  "no-new-symbol": "error",
  "no-obj-calls": "error",
  "no-redeclare": "error",
  "no-setter-return": "error",
  "no-this-before-super": "error",
  "no-unreachable": "error",
  "no-unsafe-negation": "error",
  "no-var": "error",
  "prefer-const": "error",
  "prefer-rest-params": "error",
  "prefer-spread": "error",
};

const config = [
  {
    files: ["src/**/*.js"],
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      ...eslintRecommended,
    },
  },
];

export default config;
