const crypto = require("crypto");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

// ############################## User Signup #################################
exports.Signup = (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    User.find(email).exec((err, user) => {
      if (user) {
        return res.status(403).json({
          success: false,
          msg: "User already exists",
        });
      }
      const encryptedPassword = crypto
        .createHmac("sha256", process.env.SECRET)
        .update(password)
        .digest("hex");
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
      });
      newUser.save((err, data) => {
        if (err || !data) {
          return res.status(400).json({
            success: false,
            msg: "Can't add user",
          });
        }
        return res.status(201).json({
          success: true,
          user: data,
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

// ############################## User Signin #################################
exports.Signin = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(404).json({
          success: false,
          msg: "No user found",
        });
      }
      const encryptedPassword = crypto
        .createHmac("sha256", process.env.SECRET)
        .update(password)
        .digest("hex");
      if (user.password === encryptedPassword) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        return res.status(200).json({
          success: true,
          token,
        });
      } else {
        return res.status(401).json({
          success: false,
          msg: "Password not match",
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
