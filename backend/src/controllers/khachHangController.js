const khachHangModel = require("../models/khachHangModel");
var khacHangService = require("../services/khachHangService");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

var dangKy = async (req, res) => {
  var regInformUser = await khacHangService.dangKy(req);
  if (regInformUser === "Email existed!") {
    res.send({ emailExisted: regInformUser });
  } else res.send(regInformUser);
};

var dangNhap = async (req, res) => {
  var logInformUser = await khacHangService.dangNhap(req);
  if (logInformUser === "Invalid password!") {
    res.send({ invalid: logInformUser });
    console.log();
  } else {
    console.log({ token: logInformUser });
    res.send(logInformUser);
  }
};

var verifyEmail = async (req, res) => {
  var verify = await khacHangService.verifyEmail(req);
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
const resetPassword = async (req, res) => {
  try {
    const result = await khacHangService.resetPassword(req, res);
    return res.send({ message: "Reset password thành công" });
  } catch (e) {
    console.log("Lỗi trong controller của resetPassword");
  }
};

// //Gửi email reset password
// const sendEmail = async (req, res, next) => {
//   const email = req.body.email;
//   const user = await khachHangModel.findOne({ email: email, verified: true });
//   if (!user) {
//     console.log("Email not found");
//     return res.status(404).json({ message: "Email not found" });
//   }
//   const payload = {
//     email: user.email,
//   };
//   const expiryTime = 180;
//   const token = jwt.sign(payload, "mymy-secret-key", {
//     expiresIn: expiryTime,
//   });

//   const mailTransporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "inyourzone14@gmail.com",
//       pass: "tkwl aeze mrcx nbsy",
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });
//   let mailDetails = {
//     from: ' "Reset your password" <inyourzone14@gmail.com>',
//     to: email,
//     subject: "Zone14 - Reset Password",
//     html: `
//                 <h2>Hi ${user.hoTen}!</h2>
//                 <h4>To continue reset password, please click the link below...</h4>
//                 <a href="http://localhost:4200/reset/${token}"><button style="background:#3630a3;color:white;">Reset your password</button></a>
//             `,
//   };
//   mailTransporter.sendMail(mailDetails, async (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ message: "Error sending email" });
//     } else {
//       user.emailToken = token;
//       await user.save();
//       console.log("Hãy kiểm tra email để reset password");
//       return res
//         .status(200)
//         .json({ message: "Kiểm tra email để reset password" });
//     }
//   });
// };
// //Reset mật khẩu
// const resetPassword = (req, res, next) => {
//   const token = req.body.token;
//   const newPassword = req.body.password;
//   jwt.verify(token, "mymy-secret-key", async (err, data) => {
//     if (err) {
//       console.log("Token hết hạn hoặc không tồn tại !", err);
//       return res.status(400).json({
//         message: "Token hết hạn hoặc không tồn tại !",
//       });
//     } else {
//       const response = data;
//       const user = await khachHangModel.findOne({
//         email: response.email,
//         verified: true,
//         emailToken: token,
//       });
//       if (!user) {
//         console.log("Không tìm thấy token trùng với thông tin tài khoản !");
//         return res.status(404).json({
//           message: "Không tìm thấy token trùng với thông tin tài khoản !",
//         });
//       }
//       const salt = await bcrypt.genSalt(10);
//       const encryptedPassword = await bcrypt.hash(newPassword, salt);
//       user.matKhau = encryptedPassword;
//       user.emailToken = null;
//       try {
//         const updatedUser = await khachHangModel.findOneAndUpdate(
//           { _id: user._id },
//           { $set: user },
//           { new: true }
//         );
//         console.log("Reset password thành công !");
//         return res.status(200).json({ message: "Reset password thành công !" });
//       } catch (e) {
//         return res.status(500).json({
//           message: "Lỗi không thể update reset password !",
//           error: e.message,
//         });
//       }
//     }
//   });
// };
module.exports = { dangKy, verifyEmail, dangNhap, sendEmail, resetPassword };
