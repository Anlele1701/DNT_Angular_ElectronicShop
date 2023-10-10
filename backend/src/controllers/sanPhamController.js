var sanPhamService=require('../services/sanPhamService')

var getProductsOfCompany=async(req,res)=>{
    var products=await sanPhamService.getProductOfCompany(req.params.tenLoai,req.params.idHang)
    res.send(products)
}

module.exports={getProductsOfCompany}