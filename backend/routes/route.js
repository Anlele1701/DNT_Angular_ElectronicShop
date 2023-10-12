var express=require('express')
const router=express.Router()
var donHangController=require('../src/controllers/donHangController')
var hangController=require('../src/controllers/hangController')
var khachHangController=require('../src/controllers/khachHangController')
var loaiSPController=require('../src/controllers/loaiSPController')
var nhanVienController=require('../src/controllers/nhanVienController')
var sanPhamController=require('../src/controllers/sanPhamController')



router.route('/hang/createNewHang/:tenHang').post(hangController.createNewHang)
router.route('/loaisp/createNewLoaiSP').post(loaiSPController.createnewLoaiSPtoHang)
module.exports=router