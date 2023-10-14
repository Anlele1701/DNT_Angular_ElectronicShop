var sanPhamService=require('../services/sanPhamService')

var getProductsOfCompany=async(req,res)=>{
    var products=await sanPhamService.getProductOfCompany(req.params.tenLoai,req.params.idHang)
    res.send(products)
}
var createNewCateProduct=async(req,res)=>{
    var product= await sanPhamService.createNewCateProduct()
    res.send(products)
}

var createNewProduct=async(req,res)=>
{
    var product=await sanPhamService.createNewProduct(req.body)
    res.send(product)
}

module.exports={getProductsOfCompany,createNewCateProduct, createNewProduct}