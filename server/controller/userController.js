const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user)
      return res.status(401).send({
        success: false,
        msg: "User Already exist",
      });
    const hashedpwd = await bcrypt.hash(password, 6);

    user = await UserModel.create({ name, email, password: hashedpwd });
    res.status(201).send({
      success: true,
      msg: "Register Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: error,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).send({
        success: false,
        msg: "Invalid email and password",
      });
    const isMAtched = await bcrypt.compare(password, user.password);

    if (!isMAtched)
      return res.status(401).send({
        success: false,
        msg: "Invalid email and password",
      });
    const token = jwt.sign({ id: user._id }, process.env.sec);
    console.log("token", token);

    res.status(200).send({
      success: true,
      msg: `Welcome back ${user.name}`,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      msg: error,
    });
  }
};

//user detail auth route
exports.getProfile = async (req, res) => {
    try {
      const user = await UserModel.findById(req.user);
      res.status(200).send({
        success: true,
        user
      });
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        msg: error,
      });
    }
  };