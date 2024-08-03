const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  let { username, password, name, phone, position, personnelId } = req.body;

  if (username === "" || password === "" || name === "" || phone === "") {
    return res.status(422).json({ message: "data is not valid" });
  }
  const duplicate = await User.findOne({ username }).exec();

  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 15);

    await User.create({
      username,
      password: hashedPwd,
      name,
      phone,
      position,
      personnelId,
    });
    const accessToken = jwt.sign(
      {
        userInfo: { username, roles:[1000] },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "2h" }
    );

    const newRefreshToken = jwt.sign(
      {
        username: username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24,
    });
    const resData = {
      roles: [1000],
      accessToken,
      refresh : newRefreshToken,
      userData: { username, name, personnelId, phone },
      message: "با موفقیت ثبت نام شد"
    };
   return res.status(201).json(resData);
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
