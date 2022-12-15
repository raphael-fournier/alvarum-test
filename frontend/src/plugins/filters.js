import Vue from "vue";
import moment from "moment";
import i18n from "./i18n";

import "moment/locale/fr";
moment.locale(i18n.locale);

Vue.filter("dateshort", function (value) {
  if (!value) return "";
  return moment(value).format("DD MMM");
});

Vue.filter("date", function (value) {
  if (!value) return "";
  return moment(value).format("DD/MM/YYYY");
});

Vue.filter("datelong", function (value) {
  if (!value) return "";
  return moment(value).format("DD MMMM");
});

Vue.filter("time", function (value) {
  if (!value) return "";
  let mDate = moment(value);
  return mDate.format("HH:mm:ss");
});

Vue.filter("datetime", function (value) {
  if (!value) return "";
  let mDate = moment(value);
  return mDate.format("DD MMMM, HH:mm").replace(", 00:00", "");
});

Vue.filter("duration", function (value) {
  if (!value) return "";
  return `${
    parseInt(value / 60) == 0 ? "" : parseInt(value / 60) + "h"
  }${value % 60 == 0 ? "" : (value % 60) + "m"}`;
});

Vue.filter("amount", function (value, currency) {
  return (
    (Number(value) || 0)
      .toFixed(2)
      .replace(/-/g, "-\u00a0")
      .replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1\u00a0")
      .replace(".", ",") +
    (currency
      ? "\u00a0" +
        ({
          EUR: "€",
          USD: "$",
          GBP: "£",
        }[currency] || currency)
      : "")
  );
});

Vue.filter("suffixNumber", function (number) {
  if (!number) return 0;
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;
  const suffix = ["", "k", "M", "G"][tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return scaled.toFixed(1).replace(".0", "").replace(".", ",") + suffix;
});

Vue.filter("count", function (x) {
  if (!x) return 0;
  return x
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(/\./g, ",");
});
Vue.filter("weekRange", function (date) {
  let startOfYear = moment(date).startOf("year");
  let startOfWeek = moment(date).startOf("week");
  return (
    (startOfWeek.isBefore(startOfYear)
      ? startOfYear.format("DD/MM/YYYY")
      : startOfWeek.format("DD/MM/YYYY")) +
    " - " +
    moment(date).endOf("week").format("DD/MM/YYYY")
  );
});
