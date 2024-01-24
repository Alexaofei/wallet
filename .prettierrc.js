module.exports = {
  singleQuote: true,
  trailingComma: "all",
  proseWrap: "never",
  endOfLine: "lf",
  overrides: [
    {
      files: ".prettierrc",
      options: {
        parser: "json",
      },
    },
    {
      files: "document.ejs",
      options: {
        parser: "html",
      },
    },
    {
      files: "*.js",
      options: {
        parser: "flow",
      },
    },
  ],
  tabWidth: 2,
  printWidth: 150,
  arrowParens: "always",
};
