var express=require('express')
const router=express.Router()
var donHangController=require('../src/controllers/donHangController')
var hangController=require('../src/controllers/hangController')
var khachHangController=require('../src/controllers/khachHangController')
var loaiSPController=require('../src/controllers/loaiSPController')
var nhanVienController=require('../src/controllers/nhanVienController')
var sanPhamController=require('../src/controllers/sanPhamController')

var upload=require('../middleware/upload')
router.route('/hang/createNewHang').post(hangController.createNewHang) //tạo hãng mới
router.route('/hang/getAllHang').get(hangController.getAllHang)// lấy danh sách các hãng
router.route('/loaisp/countLoaiSP').get(loaiSPController.countLoaiSP)
router.route('/loaisp/createNewLoaiSP').post(loaiSPController.createnewLoaiSPtoHang) //thêm loại sp vào hãng
router.route('/sanpham/createNewProduct').post(upload.upload.array('images',3),sanPhamController.createNewProduct) //tạo sản phẩm mới
module.exports=router