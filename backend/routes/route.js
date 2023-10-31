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
router.route('/hang/getAllHangFromCate').post(hangController.getAllHangFromCate)
router.route('/hang/delete/:id').delete(hangController.deleteHang);
router.route('/loaisp/countLoaiSP').get(loaiSPController.countLoaiSP) //lấy số lượng loại sản phẩm
router.route('/loaisp/createNewLoaiSP').post(loaiSPController.createnewLoaiSPtoHang) //thêm loại sp vào hãng
router.route('/loaisp/createLoaiSP').post(loaiSPController.createLoaiSP) //tạo loại sản phẩm mới
router.route('/sanpham/createNewProduct').post(upload.upload.array('hinhAnh',3),sanPhamController.createNewProduct) //tạo sản phẩm mới
router.route('/sanpham/getAllSanPham').post(sanPhamController.getAllProduct)//lấy danh sách sản phẩm theo loại sản phẩm
module.exports=router