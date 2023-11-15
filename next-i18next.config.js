const languages = require("./src/i18n/languages.json");

module.exports = {
  i18n: {
    defaultLocale: languages.default,
    locales: languages.locales.map(i => i.value),
    localePath: "./src/i18n/locales",
  },
  ns: ["common", "home"], // the namespaces needs to be listed here, to make sure they got preloaded
  react: { useSuspense: false },
};
