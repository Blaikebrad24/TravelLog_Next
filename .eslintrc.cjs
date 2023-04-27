module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  extends: [
    "next/core-web-vitals",
    "airbnb-base",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-underscore-dangle": 0,
  },
};
