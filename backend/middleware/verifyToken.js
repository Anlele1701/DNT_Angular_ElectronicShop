const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return {
      status: 401,
      message: "Token không có",
    };
  }
  jwt.verify(token, "SECRETKEY-MIMI", (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Token không hợp lệ",
      });
    }

    req.user = user;
    next();
  });
};
module.exports = { verifyToken };
