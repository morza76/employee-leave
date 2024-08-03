const express = require("express");

const Leave = require("../models/Leave");



exports.createLeave = async (req, res) => {
  let { userId,name,position, typeLeave, typeRequest, startedAt, expiredAt, createdAt,description,status,file } = req.body;

  if (userId === "" || typeLeave === "" || typeRequest === ""
   || startedAt === ""|| expiredAt === "" || createdAt === "" 
   || description === ""|| status === ""||name===""||position===""
  ) {
    return res.status(422).json({ message: "data is not valid" });
  }

  try {
    await Leave.create({
        userId,name,position, typeLeave, typeRequest, startedAt, expiredAt, createdAt,description,status,file
    });
    res.status(201).json("با موفقیت ثبت شد");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateLeave = async (req, res) => {
  let { leaveId, leaveStatus } = req.params;
  if (leaveId === "" || leaveStatus ==="") {
    return res.status(422).json({ message: "data is not valid" });
  }
  const leave =await Leave.findById(leaveId).exec();;
  if (!leave) {
    return res.status(404).json({ message: 'leave not found' });
  }

  leave.status = leaveStatus;
  await leave.save();
  res.json(leave);

}
exports.deleteLeave = async (req, res) => {
  
  const { leaveId } = req.params;

  if (leaveId === "") {
    return res.status(422).json({ message: "data is not valid" });
  }

  
  const result =await Leave.findByIdAndDelete(leaveId);

  // if (result.deletedCount === 0) {
  //   return res.status(401).send('leave not found'); // اگر کاربر وجود نداشت
  // }
  res.status(200).json({ message:'leave deleted successfully'}); // ارسال تاییدیه
} 

