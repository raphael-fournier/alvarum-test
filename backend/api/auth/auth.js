const router = require("express").Router();
const settings = require("../../util/settings");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Code = require("../../models/Code");
const Event = require("../../models/Event");
const { v4: uuid } = require("uuid");
const sms = require("../../util/sms");
const $t = require("../../util/i18n");

router.post("/sendCode", async (req, res) => {
  if (!req) return res.json(false);

  let phone_number = req.body.phone.replace(/ /g, "");

  let user = await User.findOne({
    where: { phone_number: phone_number },
  });

  if (user) {
    let new_code = randomCode(6);
    await Code.create({
      id: uuid(),
      code: new_code,
      userId: user.id,
      user_id: user.id,
      users_id: user.id,
      usersId: user.id,
      users: user,
      user: user,
    });

    let message = new_code + $t("sms.code", req.lang);
    sms.send(phone_number, message);

    return res.json(true);
  }

  return res.json(false);
});

router.post("/loginWithCode", async (req, res) => {
  let code = await Code.findOne({
    where: {
      code: req.body.code,
    },
    include: [
      {
        model: User,
        where: { phone_number: req.body.phone.replace(/ /g, "") },
        include: [{ model: Event }],
      },
    ],
  });

  if (code && code.user) {
    return res.json(getToken(code.user));
  }
  return res.json(false);
});

router.post("/loginWithRegistrationNumber", async (req, res) => {
  let user = await User.findOne({
    where: {
      last_name: req.body.last_name,
      registration_number: req.body.registration_number,
    },
  });

  if (user) {
    return res.json(getToken(user));
  }

  // I could maybe return a 401 code here ? ( return res.status(401).json(false) ) 
  // Anyway I kept consistency with the other endpoints
  return res.json(false);
});

router.get("/me", async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.json(null);
  }
  const user = await User.findByPk(req.user.id, {
    include: [{ model: Event }],
  });
  res.json(user);
  user.last_connected = new Date();
  await user.save();
});

function randomCode(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getToken(user) {
  let accessToken = jwt.sign(
    {
      id: user.id,
      username: user.email,
      email: user.email,
      phone_number: user.phone_number,
      event: user.event,
    },
    settings.jwt.secret,
    {
      expiresIn: settings.jwt.expiresIn,
    }
  );

  return {
    access_token: accessToken,
    token_type: "bearer",
    expires_in: settings.jwt.expiresIn,
  };
}

module.exports = router;
