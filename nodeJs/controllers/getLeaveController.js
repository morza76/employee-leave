const express = require("express");
const Leave = require("../models/Leave");

exports.getLeaves = async (req, res) => {
  // let { type, userId } = req.query;

  // if (type === "") {
  //   return res.status(422).json({ message: "data is not valid" });
  // }
 
  const allLeave = await Leave.find();

  // const userLeaves = await Leave.find({ userId }).exec();
 
  // const pendingLeaves = await Leave.find({status : 'pending'}).exec();

  // const confirmLeaves = await Leave.find({status : 'confirm'}).exec();


  // if(type === "user"){
  //   res.json(userLeaves)
  // }else if(type === "pending"){
  //   res.json(pendingLeaves)
  // }else if(type === "confirm"){
  //   res.json(confirmLeaves)
  // }
  res.json(allLeave)

};

exports.getUserLeaves = async (req, res)=>{


  let { type, userId } = req.params;
  if (type === "" || userId ==="") {
    return res.status(422).json({ message: "data is not valid" });
  }

  const userLeaves = await Leave.find({ userId }).exec();
  if (!userLeaves) return res.status(204).json({ message: "کاربری پیدا نشد" });
  res.status(201).json(userLeaves);
}

