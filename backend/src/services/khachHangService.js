//
var khachHangModel = require("../models/khachHangModel");

//
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { reject } = require("bluebird");

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
                <a href="http://localhost:4200/client/verify-email/${user.emailToken}">Verify Your Email</a>
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
      } else {
        return "Email's not existed!";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

var countKH = async () => {
  return new Promise(function myFn(resolve, reject) {
    khachHangModel
      .countDocuments({})
      .then((count) => {
        resolve(count);
        console.log(count);
      })
      .catch((error) => {
        reject(error);
      });
  });
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
const sendEmail = async (req) => {
  try {
    const email = req.body.email;
    const user = await khachHangModel.findOne({ email: email, verified: true });
    if (!user) {
      console.log("Email not found");
      return "Email not found";
    }
    const payload = {
      email: user.email,
    };
    const expiryTime = 180;
    const token = jwt.sign(payload, "mymy-secret-key", {
      expiresIn: expiryTime,
    });
    let mailDetails = {
      from: ' "Reset your password" <inyourzone14@gmail.com>',
      to: email,
      subject: "Zone14 - Reset Password",
      html: `
                  <h2>Hi ${user.hoTen}!</h2>
                  <h4>To continue reset password, please click the link below...</h4>
                  <a href="http://localhost:4200/reset/${token}"><button style="background:#3630a3;color:white;">Reset your password</button></a>
              `,
    };
    transporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.log(err);
        return "Error sending email";
      } else {
        user.emailToken = token;
        await user.save();
        console.log("Hãy kiểm tra email để reset password");
        return "Kiểm tra email để đặt lại mật khẩu";
      }
    });
  } catch (e) {
    console.log("Lỗi gửi email reset password:", e);
    return "Lỗi gửi email";
  }
};
//Reset mật khẩu
const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.password;
    const tokenData = verifyToken(token);
    if (!tokenData) {
      console.log("Token hết hạn hoặc không tồn tại !");
      return res.status(401).send("Token hết hạn hoặc không tồn tại !");
    }
    const user = await khachHangModel.findOne({
      email: tokenData.email,
      verified: true,
      emailToken: token,
    });
    if (!user) {
      console.log("Không tìm thấy token trùng với thông tin tài khoản !");
      return res
        .status(404)
        .send("Không tìm thấy token trùng với thông tin tài khoản !");
    }
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(newPassword, salt);
    user.matKhau = encryptedPassword;
    user.emailToken = null;
    try {
      const updatedUser = await khachHangModel.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      console.log("Reset password thành công !");
      return "Reset password thành công !";
    } catch (e) {
      console.log("Lỗi không thể cập nhật reset password !", e);
      return res.status(500).send("Lỗi không thể cập nhật reset password !");
    }
  } catch (e) {
    console.log("Lỗi reset password:", e);
    return res.status(500).send("Lỗi trong service reset password");
  }
};
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, "mymy-secret-key");
    return decoded;
  } catch (error) {
    console.log("Lỗi xác thực token:", error);
    return null;
  }
}
const searchKH = async (searchTerm) => {
  try {
    const result = await khachHangModel.find({
      $or: [
        { hoTen: { $regex: `^${searchTerm}`, $options: "i" } },
        { email: { $regex: `^${searchTerm}`, $options: "i" } },
        { sdt: { $regex: `^${searchTerm}`, $options: "i" } },
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};
// QUẢN LÝ CỦA ADMIN
// thêm khách hàng mới
var createKH = async (khachhangDetail) => {
  return new Promise((resolve, reject) => {
    var khachhangData = new khachHangModel();
    khachhangData.hoTen = khachhangDetail.hoTen;
    khachhangData.email = khachhangDetail.email;
    khachhangData.sdt = khachhangDetail.sdt;
    khachhangData.matKhau = khachhangDetail.matKhau;

    khachhangData
      .save()
      .then((result) => {
        resolve(result);
        return result;
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// sửa thông tin khách hàng
var updateKH = async (id, khachhangDetail) => {
  return new Promise((resolve, reject) => {
    khachHangModel
      .findByIdAndUpdate(id, khachhangDetail, { new: true })
      .exec()
      .then((result) => {
        resolve(result);
        return result;
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// get dữ liệu của 1 khách hàng
var getKHDetail = async (idKH) => {
  try {
    var result = await khachHangModel.findById(idKH);
    return result;
  } catch (error) {
    console.log(error);
  }
};
// get dữ liệu của tất cả khách hàng
var getAllKH = async () => {
  try {
    var result = await khachHangModel.find({});
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dangKy,
  verifyEmail,
  dangNhap,
  sendEmail,
  resetPassword,
  countKH,
  createKH,
  updateKH,
  getKHDetail,
  getAllKH,
  searchKH,
};
