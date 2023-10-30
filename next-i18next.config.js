const languages = require("./src/i18n/languages.json");

module.exports = {
  i18n: {
    defaultLocale: languages.default,
    locales: languages.locales.map(i => i.value),
    localePath: "./public/locales",
  },
  react: { useSuspense: false },
};
