const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
  const body = req.body;
  const user = new User(body);
  bcryptjs.genSalt().then((salt) => {
    bcryptjs.hash(user.password, salt).then((encrypted) => {
      user.password = encrypted;
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    });
  });
};

module.exports.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email }).then((user) => {
    if (!user) {
      res.json({
        errors: "invalid email or password",
      });
    }
    bcryptjs.compare(body.password, user.password).then((match) => {
      if (match) {
        const tokenData = {
          _id: user._id,
          email: user.email,
        };
        const token = jwt.sign(tokenData, "djjf", { expiresIn: "2d" });
        res.json({
          token: `Bearer ${token}`,
        });
      } else {
        res.json({
          errors: "invalid email or password",
        });
      }
    });
  });
};





