var nhanVienModel = require("../models/nhanVienModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginNV = async (req, res) => {
  const { email, password } = req.body;
  const findNV = await nhanVienModel.findOne({ email: email });
  if (!findNV) {
    return {
      status: 404,
      message: `Không tìm thấy nhân viên ${email}`,
    };
  }
  const verifyPasswordHashed = await bcrypt.compare(password, findNV.password);
  if (!verifyPasswordHashed) {
    return {
      status: 401,
      message: "Password không hợp lệ",
    };
  }
  return {
    status: 200,
    message: "Login thành công",
    data: findNV,
  };
};
module.exports = { loginNV };
