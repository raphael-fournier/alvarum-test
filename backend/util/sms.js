const send_sms = function (to, msg) {
  console.log("/!\\ DEV - Not sending SMS for real");
  console.log(`${to}: ${msg}`);
  return true;
};

module.exports = { send: send_sms };
