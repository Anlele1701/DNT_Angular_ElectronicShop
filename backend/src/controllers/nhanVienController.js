const nvService = require("../services/nhanVienService");

const loginNV = async (req, res) => {
  try {
    const dataLogin = await nvService.loginNV(req);
    res.json({
      status: dataLogin.status,
      message: dataLogin.message,
      data: dataLogin?.data,
      token: dataLogin.token,
    });
  } catch (err) {
    console.error("Lỗi controller login nhân viên: ", err);
    res.json({
      status: 500,
      message: "Lỗi của server",
    });
  }
};
module.exports = { loginNV };
