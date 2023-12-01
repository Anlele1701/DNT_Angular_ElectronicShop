//
var khachHangModel = require("../models/khachHangModel");

//
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "inyourzone14@gmail.com",
    pass: "tkwl aeze mrcx nbsy",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//
var verifyEmail = async (req) => {
  try {
    const token = req.params.token;
    const newToken = token.replace(/:/g, "");
    const user = await khachHangModel.findOne({ emailToken: newToken });
    if (user) {
      user.emailToken = null;
      user.verified = true;
      await user.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, "secretkey");
};

//đăng ký
var dangKy = async (req) => {
  try {
    const valid = checkAccountValid(req.body);
    if (valid !== 0) {
      return valid;
    } else {
      const email = req.body.email;
      var findUser = await khachHangModel.findOne({ email: email });
      if (findUser) {
        return "Email existed!";
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new khachHangModel({
          hoTen: req.body.name,
          email: req.body.email,
          sdt: req.body.sdt,
          matKhau: hashPassword,
          emailToken: crypto.randomBytes(64).toString("hex"),
          verified: false,
        });
        const newUser = await user.save();

        var mailOption = {
          from: ' "Verify your email" <inyourzone14@gmail.com>',
          to: user.email,
          subject: "Zone14 - Please verify your email",
          html: `
                <h2>Hi ${user.hoTen}! Thanks for your registering to our site</h2>
                <h4>To continue registering, please verify your email with the link below...</h4>
                <a href="http://localhost:4200/verify-email/${user.emailToken}">Verify Your Email</a>
            `,
        };

        transporter.sendMail(mailOption, (error, success) => {
          if (error) {
            console.log(error);
          } else {
            console.log("A verify mail is sending to your email");
          }
        });
        return newUser;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//đăng nhập
var dangNhap = async (req) => {
  try {
    const { email, password } = req.body;
    let valid = checkLoginValid(email, password);
    if (valid !== 0) {
      return valid;
    } else {
      const findUser = await khachHangModel.findOne({ email: email });
      if (findUser) {
        const match = await bcrypt.compare(password, findUser.matKhau);
        if (match) {
          const token = createToken(findUser.id);
          //store token in cookie
          return findUser;
        } else {
          return "Invalid password!";
        }
      }
      else {
        return "Email's not existed!"
      }
    }
  } catch (error) {
    console.log(error);
  }
};

var checkAccountValid = (account) => {
  if (
    /[a-zA-Z]/.test(account.name) == false ||
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(account.name)
  ) {
    return "Họ tên không hợp lệ!";
  } else if (account.name === " " || account.name === null) {
    return "Họ tên không để trống!";
  } else if (account.email && account.email.includes("@") == false) {
    return "Gmail không hợp lệ!";
  } else if (
    /[a-zA-Z]/.test(account.sdt) ||
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(account.sdt)
  ) {
    return "Số điện thoại không hợp lệ";
  } else if (account.sdt.length != 10) {
    return "Số điện thoại bắt buộc chỉ có 10 số";
  } else if (
    /[a-zA-Z]/.test(account.password) == false ||
    /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(account.password) == false ||
    /[0-9]/.test(account.password) == false
  ) {
    return "Mật khẩu phải chứa ít nhất một ký tự chữ cái, ký tự số và ký tự đặc biệt";
  } else if (account.password === null || account.password === " ") {
    return "Mật khẩu không được bỏ trống";
  } else return 0;
};

var checkLoginValid = (email, password) => {
  if (email === null || password === null) {
    return "Vui lòng nhập gmail và mật khẩu!";
  } else return 0;
};

module.exports = { dangKy, verifyEmail, dangNhap };
