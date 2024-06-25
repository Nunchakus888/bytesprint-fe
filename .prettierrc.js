module.exports = {
  printWidth: 100,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  endOfLine: 'auto',
  eslintIntegration: false,
  htmlWhitespaceSensitivity: 'ignore',
  ignorePath: '.prettierignore',
  jsxBracketSameLine: false,
  requireConfig: false,
  stylelintIntegration: false,
  trailingComma: 'es5',
  'prettier.tslintIntegration': false,
};
