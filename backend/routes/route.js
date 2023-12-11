var express = require("express");
const router = express.Router();
var donHangController = require("../src/controllers/donHangController");
var hangController = require("../src/controllers/hangController");
var khachHangController = require("../src/controllers/khachHangController");
var loaiSPController = require("../src/controllers/loaiSPController");
var nhanVienController = require("../src/controllers/nhanVienController");
var sanPhamController = require("../src/controllers/sanPhamController");
var Momo = require("../src/PaymentGateway/Momo");

const verifyToken = require("../middleware/verifyToken");
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
router.route("/hang/find/:searchTerm").get(hangController.searchHang); //Tìm kiếm tên NSX

//LOẠI SẢN PHẨM
router.route("/loaisp/countLoaiSP").get(loaiSPController.countLoaiSP); //lấy số lượng loại sản phẩm
router
  .route("/loaisp/createNewLoaiSP")
  .post(loaiSPController.createnewLoaiSPtoHang); //thêm loại sp vào hãng
router.route("/loaisp/createLoaiSP").post(loaiSPController.createLoaiSP); //tạo loại sản phẩm mới
router.route("/loaisp/deleteLoaiSP/:id").delete(loaiSPController.deleteLoaiSP); //xóa loại sản phẩm
router.route("/loaisp/updateLoaiSP/:id").patch(loaiSPController.updateLoaiSP); // Update loại sản phẩm
router.route("/loaisp/getAll").get(loaiSPController.getLoaiSP);
router.route("/loaisp/find/:searchTerm").get(loaiSPController.searchLoai); //Tìm kiếm tên loại sp

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
router
  .route("/sanpham/deleteProduct/:loaiSP/:tenHang/:idSP")
  .delete(sanPhamController.deleteProduct);
router.route("/sanpham/getAll").get(sanPhamController.getAll);

router.route("/loaisp/getAll").get(loaiSPController.getLoaiSP);
router
  .route("/sanpham/find/:nameProduct/:searchTerm")
  .get(sanPhamController.searchSP); // Tìm kiếm sp
router
  .route("/sanpham/:category")
  .get(sanPhamController.getProductFromCategory); // Lấy sp theo category
router.route("/sanpham/compare/:category").post(sanPhamController.getSPCompare); // Lay SP So Sanh
router.route("/sanpham/findSP/:tenSP").get(sanPhamController.findSP); // Tìm kiếm sp

//NHÂN VIÊN
router.route("/nhanvien/login").post(nhanVienController.loginNV); // Đăng nhập nhân viên
router.route("/nhanvien/verifyToken").post(verifyToken.verifyToken); // xác thực token nhân viên

//KHÁCH HÀNG
router.route("/khachhang/dangKy").post(khachHangController.dangKy); //đăng ký tài khoản
router
  .route("/khachhang/verifyEmail/:token")
  .get(khachHangController.verifyEmail); //xác thực tài khoản đăng ký
router.route("/khachhang/dangNhap").post(khachHangController.dangNhap); //đăng nhập
router.route("/khachhang/countKH").get(khachHangController.countKH); // lấy số lượng khách hàng
router.route("/send-email").post(khachHangController.sendEmail); //Gửi email reset mật khẩu
router.route("/reset-password").post(khachHangController.resetPassword); //Reset mật khẩu
router.route("/khachhang/find/:searchTerm").get(khachHangController.searchKH); // tìm kiếm khách hàng
router.route("/khachhang/createNewCus").post(khachHangController.createNewKH); // admin tạo khách hàng mới
router
  .route("/khachhang/editCusDetail/:id")
  .patch(khachHangController.editKHDetail); // admin chỉnh sửa thông tin của khách hàng
router.route("/khachhang/getKHDetail/:id").get(khachHangController.getKH); // get dữ liệu của 1 khách hàng
router.route("/khachhang/allCusInfo").get(khachHangController.getAllKH); // get dữ liệu của tất cả khách hàng

//ĐƠN HÀNG
router.route("/donhang/muaHang").post(donHangController.muaHang);
router.route("/donhang/muaHangTA").post(donHangController.muaHangTA);
router.route("/donhang/thanhtoanvnpay").post(donHangController.createpayment);
router.route("/donhang/vnpay_ipn").get(donHangController.getvnPayIPN);
router.route("/donhang/quanLyDSDonHang").get(donHangController.QLDSDonHang); //show ds đơn hàng --admin
router
  .route("/donhang/getAllDonHangById/:idkh")
  .get(donHangController.getAllDonHangById); // lấy danh sách các DH theo id khách hàng
router.route("/donhang/getCTDH/:idKH/:idDH").get(donHangController.getCTDH); //lấy chi tiết đơn hàng
router
  .route("/donhang/updateTTDonHang")
  .patch(donHangController.updateTTDonHang); //cập nhật thông tin đơn hàng
router.route("/donhang/huyDonHang").patch(donHangController.huyDonHang); //hủy đơn hàng
router
  .route("/donhang/khoiPhucDonHang")
  .patch(donHangController.khoiPhucDonHang); //khôi phục đơn hàng
router.route("/donhang/showdonhang/:idKH").get(donHangController.showdonhang);
router.route("/donhang/getAllDonHang").get(donHangController.getAllDonHang); // lấy danh sách các DH theo id khách hàng
//MOMO PAYMENT
router.route("/payment/momo").post(donHangController.MomoPayment);
router
  .route("/payment/momo/confirm")
  .post(donHangController.confirmMomoSuccess); //Update khi thanh toán thành công momo
module.exports = router;
