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
    try{
        var product=await sanPhamService.createNewProduct(req)
        console.log(req.body.tenSP)
        res.send(product)
    }catch(err)
    {
        console.error(err)
    }
}

module.exports={getProductsOfCompany,createNewCateProduct, createNewProduct}