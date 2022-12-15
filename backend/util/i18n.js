const translations = require("../i18n/translations.json");
module.exports = (key, lang) => {
  let langs = ["fr", "en"];

  if (langs.indexOf(lang) == -1) {
    lang = langs[0];
  }

  let values = translations[key];
  if (!values) return key;

  return values[lang];
};
