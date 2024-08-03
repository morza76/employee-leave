const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleGetMe = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send(err);
    req.user = decoded.userInfo.username;
    req.roles = decoded.userInfo.roles;
  });

  const foundUser = await User.findOne({ username: req.user }).exec();

  if (!foundUser) {
    return res.status(401).json();
  }

  const roles = Object.values(foundUser.roles).filter(Boolean);

  const resData = {
    roles,
    userData: {
      name: foundUser.name,
      username: foundUser.username,
      phone: foundUser.phone,
      position: foundUser.position,
      personnelId: foundUser.personnelId,
    },
  };
  res.status(200).json(resData);
};

module.exports = { handleGetMe };
