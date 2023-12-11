const khachHangModel = require("../models/khachHangModel");
var khacHangService = require("../services/khachHangService");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

var dangKy = async (req, res) => {
  var regInformUser = await khacHangService.dangKy(req);
  if (regInformUser === "Email existed!") {
    res.send({ emailExisted: regInformUser });
  } else if (typeof regInformUser === "string") {
    res.send({ inValid: regInformUser });
  } else res.send(regInformUser);
};

var dangNhap = async (req, res) => {
  var logInformUser = await khacHangService.dangNhap(req);
  if (typeof logInformUser === "string") {
    res.send({ invalid: logInformUser });
  } else {
    if (logInformUser === "Invalid password!") {
      res.send({ invalid: logInformUser });
      console.log();
    } else {
      console.log({ token: logInformUser });
      res.send(logInformUser);
    }
  }
};
const resetPassword = async (req, res) => {
  try {
    const result = await khacHangService.resetPassword(req, res);
    return res.send({ message: "Reset password thành công" });
  } catch (e) {
    console.log("Lỗi trong controller của resetPassword");
  }
};

var verifyEmail = async (req, res) => {
  var verify = await khacHangService.verifyEmail(req);
};

var countKH = async (req, res) => {
  try {
    var result = await khacHangService.countKH();
    if (result) {
      res.send({ result });
    }
  } catch (error) {
    console.log(error);
  }
};

const sendEmail = async (req, res) => {
  try {
    const result = await khacHangService.sendEmail(req, res);
    if (result === "Email not found") {
      return res.send({ message: result });
    } else if (result === "Lỗi gửi email") {
      return res.send({ message: result });
    }
    return res.send({ message: "Hãy kiểm tra email" });
  } catch (e) {
    console.log("Lỗi trong controller của sendEmail");
  }
};
const searchKH = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const items = await khacHangService.searchKH(searchTerm);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// QUẢN LÝ CỦA ADMIN
// thêm khách hàng mới
var createNewKH = async (req, res) => {
  var result = await khacHangService.createKH(req.body);
  if (result) {
    res.send({"status": true, "message": "Đã tạo tài khoản khách hàng thành công!"});
  }
  else {
    res.send({"status": false, "message": "Tạo tài khoản khách hàng thất bại!"});
  }
};
// sửa thông tin khách hàng
var editKHDetail = async (req, res) => {
  var result = await khacHangService.updateKH(req.params.id, req.body);
  if (result) {
    res.send({"status": true, "message": "Cập nhật thông tin tài khoản khách hàng thành công!"});
  }
  else {
    res.send({"status": false, "message": "Cập nhật thông tin tài khoản khách hàng thất bại!"});
  }
};
// get thông tin của 1 khách hàng
var getKH = async(req, res) => {
  var result = await khacHangService.getKHDetail(req.params.id);
  if (result) {
    res.send({"status": true, "message": "Dữ liệu khách hàng tồn tại!", result});
  }
  else {
    res.send({"status": false, "message": "Dữ liệu khách hàng không tồn tại!"});
  }
};
// get thông tin của tất cả khách hàng (hiển thị lên table)
var getAllKH = async(req,res) => {
  var result = await khacHangService.getAllKH();
  if (result) {
    res.send(result);
  }
  else {
    res.send({"status": false, "message": "Không có dữ liệu nào!"}); 
  }
};

module.exports = {
  dangKy,
  verifyEmail,
  dangNhap,
  sendEmail,
  resetPassword,
  countKH,
  searchKH,
  createNewKH,
  editKHDetail,
  getKH,
  getAllKH,
  
};
