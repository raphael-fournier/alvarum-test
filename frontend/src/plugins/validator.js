import Vue from "vue";
import validator from "validator";
import i18n from "./i18n";

/**
 * Add custom rules here
 */
const customRules = {
  required: (v) => !!v,
  maxLength: (v, max) => v.length <= max,
  minLength: (v, min) => v.length >= min,
  min: (v, min) => v >= min || !v,
  isUrl: (v) =>
    !v ||
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(
      v
    ),
  nonNegative: (v) => v >= 0,
  nonNegativeOrEmpty: (v) => !v || v >= 0,
  passwordMatch: (v, confirm) => v === confirm,
  isNotificationsFormCorrect: (v, conditions) => conditions.includes(true),
};

const rules = {};

Object.keys(validator).forEach(function (key) {
  rules[key] = (...args) => {
    return (value) => {
      let valid = false;
      try {
        valid = validator[key](value, ...args);
      } catch (err) {
        // if value is empty and rule not handling this case, return true
        if (!value) return true;
      }
      return (
        valid ||
        i18n.t(
          `errors.validator.${key}`,
          args.length === 1 && typeof args[0] === "object" ? args[0] : args
        )
      );
    };
  };
});

Object.keys(customRules).forEach(function (key) {
  rules[key] = (...args) => {
    return (value) => {
      let valid = false;
      try {
        valid = customRules[key](value, ...args);
      } catch (err) {
        // if value is empty and rule not handling this case, return true
        if (!value) return true;
      }
      return (
        valid ||
        i18n.t(
          `errors.validator.${key}`,
          args.length === 1 && typeof args[0] === "object" ? args[0] : args
        )
      );
    };
  };
});

Vue.prototype.$v = rules;
export default rules;
