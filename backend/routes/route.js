var express = require("express");
const router = express.Router();
var donHangController = require("../src/controllers/donHangController");
var hangController = require("../src/controllers/hangController");
var khachHangController = require("../src/controllers/khachHangController");
var loaiSPController = require("../src/controllers/loaiSPController");
var nhanVienController = require("../src/controllers/nhanVienController");
var sanPhamController = require("../src/controllers/sanPhamController");

var upload = require("../middleware/upload");
//HÃNG
router.route("/hang/createNewHang").post(hangController.createNewHang); //tạo hãng mới
router.route("/hang/getAllHang").get(hangController.getAllHang); // lấy danh sách các hãng
router
  .route("/hang/getAllHangFromCate")
  .post(hangController.getAllHangFromCate); //lấy danh sách các hãng từ loại sp
router.route("/hang/delete/:id").delete(hangController.deleteHang);
router.route("/hang/getHang/:idHang").get(hangController.getHang); //lấy thông tin hãng
router.route("/hang/update/:id").patch(hangController.updateHang); //Cập nhật thông tin của hãng

//LOẠI SẢN PHẨM
router.route("/loaisp/countLoaiSP").get(loaiSPController.countLoaiSP); //lấy số lượng loại sản phẩm
router
  .route("/loaisp/createNewLoaiSP")
  .post(loaiSPController.createnewLoaiSPtoHang); //thêm loại sp vào hãng
router.route("/loaisp/createLoaiSP").post(loaiSPController.createLoaiSP); //tạo loại sản phẩm mới
router.route("/loaisp/deleteLoaiSP/:id").delete(loaiSPController.deleteLoaiSP); //xóa loại sản phẩm
router.route("/loaisp/updateLoaiSP/:id").patch(loaiSPController.updateLoaiSP); // Update loại sản phẩm
// SẢN PHẨM
router
  .route("/sanpham/createNewProduct")
  .post(upload.upload.array("hinhAnh", 3), sanPhamController.createNewProduct); //tạo sản phẩm mới
router.route("/sanpham/getAllSanPham").post(sanPhamController.getAllProduct); //lấy danh sách sản phẩm theo loại sản phẩm - admin
router
  .route("/sanpham/getAllSanPham/:loaiSP")
  .get(sanPhamController.getAllSanPham); //lấy danh sách sản phẩm theo loại sp - customer
router.route("/sanpham/getSP/:idSP").get(sanPhamController.getSP); //lấy thông tin sản phẩm
router
  .route("/sanpham/editSanPham")
  .post(upload.upload.array("hinhAnh", 3), sanPhamController.editProduct); //tạo sản phẩm mới
router.route("/sanpham/countSP").get(sanPhamController.countSP); // lấy số lượng SP
router.route("/sanpham/deleteProduct/:loaiSP/:tenHang/:idSP").delete(sanPhamController.deleteProduct)

//KHÁCH HÀNG
router.route("/khachhang/dangKy").post(khachHangController.dangKy); //đăng ký tài khoản
router
  .route("/khachhang/verifyEmail/:token")
  .get(khachHangController.verifyEmail); //xác thực tài khoản đăng ký
router.route("/khachhang/dangNhap").post(khachHangController.dangNhap); //đăng nhập
router.route("/khachhang/countKH").get(khachHangController.countKH); // lấy số lượng khách hàng
router.route("/reset-password").post(khachHangController.resetPassword); //Reset mật khẩu


//ĐƠN HÀNG
router.route("/donhang/muaHang").post(donHangController.muaHang)
router.route('/donhang/thanhtoanvnpay').post(donHangController.createpayment);
router.route('/donhang/vnpay_ipn').get(donHangController.getvnPayIPN);
module.exports = router;
