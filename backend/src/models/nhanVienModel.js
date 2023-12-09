var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var nhanVienSchema = new Schema(
  {
    hoTen: { type: String },
    tenAvatar: { type: String },
    dataAvatar: { type: Buffer },
    contentTypeAvatar: { type: String },
    gioiTinh: { type: String },
    ngaySinh: { type: Date },
    diaChi: { type: String },
    email: { type: String },
    password: { type: String },
    sdt: { type: String },
    vaiTro: { type: String },
  },
  { collection: "NHANVIEN" }
);
module.exports = mongoose.model("NHANVIEN", nhanVienSchema);
